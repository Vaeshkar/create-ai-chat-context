const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");
const ora = require("ora");
const { getTokenUsage } = require("./tokens");
const { getTemplate, getTemplateDir, listTemplates } = require("./templates");
const { detectProjectType, getProjectInfo } = require("./detect");

async function init(options = {}) {
  const cwd = process.cwd();
  const aiDir = path.join(cwd, ".ai");
  const aicfDir = path.join(cwd, ".aicf");
  const aiInstructions = path.join(cwd, ".ai-instructions");
  const newChatPrompt = path.join(cwd, "NEW_CHAT_PROMPT.md");

  // Get template (auto-detect if not specified)
  let templateName = options.template;
  let template;
  let autoDetected = false;

  if (!templateName) {
    // Auto-detect project type
    const spinner = ora("Detecting project type...").start();
    templateName = await detectProjectType(cwd);
    autoDetected = true;

    if (templateName !== "default") {
      const projectInfo = await getProjectInfo(cwd);
      spinner.succeed(`Detected ${chalk.cyan(templateName)} project`);
    } else {
      spinner.info("Using generic template");
    }
  }

  try {
    template = getTemplate(templateName);
  } catch (error) {
    console.log(chalk.red(`\n❌ ${error.message}\n`));
    console.log(chalk.bold("Available templates:\n"));
    listTemplates().forEach((t) => {
      console.log(`  ${chalk.cyan(t.key.padEnd(10))} - ${t.description}`);
    });
    console.log();
    return;
  }

  console.log(
    chalk.bold.cyan("\n🚀 Initializing AI Knowledge Base System...\n")
  );

  if (templateName !== "default") {
    const detectionMsg = autoDetected ? " (auto-detected)" : "";
    console.log(
      chalk.gray(
        `   Using template: ${chalk.cyan(template.name)}${detectionMsg}\n`
      )
    );
  }

  // Check if .ai directory and files already exist
  if (fs.existsSync(aiDir) && !options.force) {
    // Check if any template files exist
    const aiTemplateFiles = [
      "README.md",
      "conversation-log.md",
      "technical-decisions.md",
      "next-steps.md",
      "design-system.md",
      "code-style.md",
      "project-overview.md",
    ];

    const existingFiles = aiTemplateFiles.filter((file) =>
      fs.existsSync(path.join(aiDir, file))
    );

    if (existingFiles.length > 0) {
      console.log(chalk.yellow("⚠️  .ai/ directory already exists!"));
      console.log(
        chalk.gray(`   Found ${existingFiles.length} existing file(s)`)
      );
      console.log(chalk.gray("   Use --force to overwrite\n"));
      process.exit(1);
    }
  }

  // Check if root files already exist
  if (!options.force) {
    const rootFiles = [".ai-instructions", "NEW_CHAT_PROMPT.md"];
    const existingRootFiles = rootFiles.filter((file) =>
      fs.existsSync(path.join(cwd, file))
    );

    if (existingRootFiles.length > 0) {
      console.log(chalk.yellow("⚠️  AI instruction files already exist!"));
      console.log(chalk.gray(`   Found: ${existingRootFiles.join(", ")}`));
      console.log(chalk.gray("   Use --force to overwrite\n"));
      process.exit(1);
    }
  }

  const spinner = ora("Creating directory structure...").start();

  try {
    // Create .ai directory
    await fs.ensureDir(aiDir);
    spinner.succeed("Created .ai/ directory");

    // Create .aicf directory
    await fs.ensureDir(aicfDir);
    spinner.succeed("Created .aicf/ directory");

    // Copy template files
    const templatesDir = path.join(__dirname, "../templates");
    const templateDir = getTemplateDir(templateName);

    spinner.start("Copying template files...");

    // Copy all template files to .ai directory
    const templateFiles = [
      "README.md",
      "conversation-log.md",
      "technical-decisions.md",
      "next-steps.md",
      "design-system.md",
      "code-style.md",
      "project-overview.md",
    ];

    for (const file of templateFiles) {
      // Try template-specific file first, fall back to default
      const templateSpecificSrc = path.join(templateDir, file);
      const defaultSrc = path.join(templatesDir, "ai", file);

      const src = (await fs.pathExists(templateSpecificSrc))
        ? templateSpecificSrc
        : defaultSrc;

      const dest = path.join(aiDir, file);
      await fs.copy(src, dest);
    }

    // Copy .ai-instructions to root
    await fs.copy(
      path.join(templatesDir, "ai-instructions.md"),
      aiInstructions
    );

    // Copy NEW_CHAT_PROMPT.md to root
    await fs.copy(path.join(templatesDir, "NEW_CHAT_PROMPT.md"), newChatPrompt);

    // Copy .aicf template files
    const aicfTemplateFiles = [
      "README.md",
      "conversations.aicf",
      "decisions.aicf",
      "tasks.aicf",
      "issues.aicf",
      "technical-context.aicf",
    ];

    for (const file of aicfTemplateFiles) {
      const src = path.join(templatesDir, "aicf", file);
      const dest = path.join(aicfDir, file);
      await fs.copy(src, dest);
    }

    spinner.succeed("Copied all template files");

    // Update README.md if it exists
    const readmePath = path.join(cwd, "README.md");
    if (fs.existsSync(readmePath)) {
      spinner.start("Updating README.md...");

      const readme = await fs.readFile(readmePath, "utf-8");

      // Check if AI section already exists
      if (!readme.includes("FOR AI ASSISTANTS")) {
        const aiSection = `
---

## 🚨 FOR AI ASSISTANTS: READ THIS FIRST 🚨

**CRITICAL: Before working on this project, read the \`.ai/\` knowledge base:**

1. **\`.ai/architecture.md\`** - Complete system architecture
2. **\`.ai/conversation-log.md\`** - Key decisions from previous chats
3. **\`.ai/technical-decisions.md\`** - Why we chose X over Y

**Why?** This preserves institutional knowledge so you have full context immediately.

**See \`.ai-instructions\` file for detailed instructions.**

---

`;

        // Insert after first heading
        const lines = readme.split("\n");
        const firstHeadingIndex = lines.findIndex((line) =>
          line.startsWith("#")
        );

        if (firstHeadingIndex !== -1) {
          // Find the end of the first section (next heading or empty line)
          let insertIndex = firstHeadingIndex + 1;
          while (
            insertIndex < lines.length &&
            lines[insertIndex].trim() !== "" &&
            !lines[insertIndex].startsWith("#")
          ) {
            insertIndex++;
          }

          lines.splice(insertIndex, 0, aiSection);
          await fs.writeFile(readmePath, lines.join("\n"));
          spinner.succeed("Updated README.md with AI section");
        } else {
          spinner.warn("Could not find heading in README.md, skipping update");
        }
      } else {
        spinner.info("README.md already has AI section");
      }
    } else {
      spinner.info("No README.md found, skipping");
    }

    // Git integration
    if (options.git !== false) {
      spinner.start("Checking Git status...");

      const gitDir = path.join(cwd, ".git");
      if (fs.existsSync(gitDir)) {
        spinner.info("Git repository detected (remember to commit changes)");
      } else {
        spinner.info("No Git repository found");
      }
    }

    // Success message
    console.log(
      chalk.bold.green("\n✅ AI Memory System initialized successfully!\n")
    );

    console.log(chalk.bold("📁 Created:\n"));
    console.log(
      chalk.gray("   .ai/                  - 7 essential documentation files")
    );
    console.log(
      chalk.gray("   .aicf/                - AI-optimized structured files")
    );
    console.log(
      chalk.gray("   .ai-instructions      - Instructions for AI assistants")
    );
    console.log(
      chalk.gray("   NEW_CHAT_PROMPT.md    - Template for new chat sessions")
    );
    console.log();

    console.log(chalk.bold("📝 Next steps:\n"));
    console.log("1. Customize the files for your project:");
    console.log(
      chalk.gray("   vim .ai/project-overview.md    # Add YOUR project context")
    );
    console.log(
      chalk.gray("   vim .ai/technical-decisions.md # Document YOUR decisions")
    );
    console.log(
      chalk.gray("   vim .ai/conversation-log.md    # Start YOUR log\n")
    );

    console.log("2. At end of each AI session, ask AI to update:");
    console.log(chalk.cyan('   "Can you update the .ai files?"\n'));

    console.log("3. Commit to Git:");
    console.log(
      chalk.gray("   git add .ai/ .aicf/ .ai-instructions NEW_CHAT_PROMPT.md")
    );
    console.log(chalk.gray('   git commit -m "feat: Add AI memory system"\n'));

    console.log("4. Test it in a new AI chat:");
    console.log(
      chalk.cyan(
        '   "Read .ai-instructions first, then help me with [your project]."\n'
      )
    );

    console.log(chalk.bold("📚 For more info, see:"));
    console.log(chalk.gray("   .ai/README.md\n"));

    console.log(
      chalk.bold.cyan("🎉 Happy coding with persistent AI context!\n")
    );

    // Check if existing conversation log is large
    if (!options.force) {
      const conversationLogPath = path.join(aiDir, "conversation-log.md");
      if (fs.existsSync(conversationLogPath)) {
        try {
          const usage = await getTokenUsage(cwd);
          if (usage.totalTokens > 15000) {
            console.log(
              chalk.yellow("⚠️  Tip: Your existing conversation log is large.")
            );
            console.log(
              chalk.gray(
                '   Run "npx create-ai-chat-context check" to see token usage.\n'
              )
            );
          }
        } catch (err) {
          // Silently ignore errors in token check
        }
      }
    }
  } catch (error) {
    spinner.fail("Failed to initialize");
    throw error;
  }
}

module.exports = { init };
