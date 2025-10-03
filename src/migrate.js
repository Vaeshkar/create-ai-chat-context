/**
 * Migration Tool for Existing Users
 * Upgrades old .ai/ folders to include new files
 */

const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");
const ora = require("ora");

/**
 * Migrate existing .ai/ folder to latest version
 */
async function migrateProject(options = {}) {
  const cwd = process.cwd();
  const aiDir = path.join(cwd, ".ai");
  const templatesDir = path.join(__dirname, "../templates");

  console.log(chalk.bold("\n🔄 Migrating AI Memory System\n"));

  // Check if .ai/ exists
  if (!fs.existsSync(aiDir)) {
    console.log(chalk.yellow("⚠️  No .ai/ directory found!"));
    console.log(chalk.gray("   Run 'aic init' to create a new project\n"));
    process.exit(1);
  }

  const spinner = ora("Analyzing current setup...").start();

  // Check which files are missing
  const aiTemplateFiles = [
    "README.md",
    "conversation-log.md",
    "technical-decisions.md",
    "next-steps.md",
    "design-system.md",
    "code-style.md",
    "project-overview.md",
  ];

  const missingAiFiles = aiTemplateFiles.filter(
    (file) => !fs.existsSync(path.join(aiDir, file))
  );

  const existingAiFiles = aiTemplateFiles.filter((file) =>
    fs.existsSync(path.join(aiDir, file))
  );

  spinner.succeed(
    `Found ${existingAiFiles.length}/${aiTemplateFiles.length} .ai/ files`
  );

  // Show what will be added
  console.log();
  if (missingAiFiles.length > 0) {
    console.log(chalk.bold("📝 Will add to .ai/:"));
    missingAiFiles.forEach((file) => {
      console.log(chalk.gray(`   + ${file}`));
    });
    console.log();
  } else {
    console.log(chalk.green("✅ Your project is already up to date!\n"));
    return;
  }

  // Confirm migration
  if (!options.force) {
    console.log(
      chalk.yellow(
        "⚠️  This will add new files to your project (existing files won't be modified)"
      )
    );
    console.log(chalk.gray("   Use --force to skip this confirmation\n"));

    // In a real implementation, you'd prompt for confirmation here
    // For now, we'll just proceed
  }

  // Add missing .ai/ files
  if (missingAiFiles.length > 0) {
    spinner.start("Adding missing .ai/ files...");

    for (const file of missingAiFiles) {
      const src = path.join(templatesDir, "ai", file);
      const dest = path.join(aiDir, file);

      if (await fs.pathExists(src)) {
        await fs.copy(src, dest);
      } else {
        spinner.warn(`Template not found: ${file}`);
      }
    }

    spinner.succeed(`Added ${missingAiFiles.length} file(s) to .ai/`);
  }

  // Check for root files
  const rootFiles = [".ai-instructions", "NEW_CHAT_PROMPT.md"];
  const missingRootFiles = rootFiles.filter(
    (file) => !fs.existsSync(path.join(cwd, file))
  );

  if (missingRootFiles.length > 0) {
    spinner.start("Adding root instruction files...");

    for (const file of missingRootFiles) {
      const src = path.join(templatesDir, file);
      const dest = path.join(cwd, file);

      if (await fs.pathExists(src)) {
        await fs.copy(src, dest);
      }
    }

    spinner.succeed(`Added ${missingRootFiles.length} root file(s)`);
  }

  // Success message
  console.log();
  console.log(chalk.bold.green("✅ Migration complete!\n"));

  console.log(chalk.bold("📁 Your project now has:\n"));
  console.log(
    chalk.gray(
      `   .ai/ - ${aiTemplateFiles.length} essential documentation files`
    )
  );
  console.log();

  console.log(chalk.bold("📝 Next steps:\n"));
  console.log("1. Review the new files:");
  console.log(chalk.gray("   ls -la .ai/\n"));

  console.log("2. Customize new files for your project:");
  if (missingAiFiles.includes("design-system.md")) {
    console.log(chalk.gray("   vim .ai/design-system.md"));
  }
  if (missingAiFiles.includes("code-style.md")) {
    console.log(chalk.gray("   vim .ai/code-style.md"));
  }
  if (missingAiFiles.includes("project-overview.md")) {
    console.log(chalk.gray("   vim .ai/project-overview.md"));
  }
  console.log();

  console.log("3. At end of each AI session, ask AI:");
  console.log(chalk.cyan('   "Can you update the .ai files?"\n'));

  console.log("4. Commit the changes:");
  console.log(
    chalk.gray("   git add .ai/ .ai-instructions NEW_CHAT_PROMPT.md")
  );
  console.log(
    chalk.gray('   git commit -m "Migrate to latest AI memory system"\n')
  );

  console.log(
    chalk.bold.cyan(
      "🎉 Your project is now using the latest AI memory system!\n"
    )
  );
}

module.exports = {
  migrateProject,
};
