const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");
const ora = require("ora");

/**
 * Generate Warp AI integration instructions
 */
async function generateWarpInstructions(options = {}) {
  const cwd = process.cwd();
  const aiDir = path.join(cwd, ".ai");
  const warpInstructionsPath = path.join(cwd, "WARP_AI_INSTRUCTIONS.md");

  // Check if .ai directory exists
  if (!(await fs.pathExists(aiDir))) {
    console.log(chalk.red("\n❌ No .ai/ directory found.\n"));
    console.log(chalk.gray("   Run: npx create-ai-chat-context init\n"));
    return;
  }

  const spinner = ora("Generating Warp AI instructions...").start();

  try {
    // Check if instructions already exist
    if ((await fs.pathExists(warpInstructionsPath)) && !options.force) {
      spinner.fail("WARP_AI_INSTRUCTIONS.md already exists");
      console.log(
        chalk.yellow(
          "\n⚠️  WARP_AI_INSTRUCTIONS.md file already exists. Use --force to overwrite.\n"
        )
      );
      return;
    }

    // Generate the instructions content
    const instructionsContent = generateInstructionsContent();

    // Write the file
    await fs.writeFile(warpInstructionsPath, instructionsContent, "utf-8");

    spinner.succeed("WARP_AI_INSTRUCTIONS.md file created");

    console.log(chalk.green("\n✅ Warp AI integration configured!\n"));
    console.log(chalk.bold("📝 What this does:\n"));
    console.log("  • Creates a quick-reference file for starting Warp AI chats");
    console.log("  • Provides the perfect prompt to get full context");
    console.log("  • Lists all your knowledge base files for easy reference");
    console.log();

    console.log(chalk.bold("🚀 Next steps:\n"));
    console.log("1. Open Warp AI in your terminal");
    console.log("2. Copy-paste the prompt from WARP_AI_INSTRUCTIONS.md");
    console.log("3. Warp AI will read your entire knowledge base!");
    console.log();

    console.log(chalk.bold("💡 Tips:\n"));
    console.log("  • Keep WARP_AI_INSTRUCTIONS.md open as reference");
    console.log("  • Update .ai/ files regularly for best results");
    console.log("  • Use 'npx aic check' to monitor token usage");
    console.log();

    // Add to .gitignore if it exists
    await addToGitignore(cwd, "WARP_AI_INSTRUCTIONS.md");
  } catch (error) {
    spinner.fail("Failed to generate Warp AI instructions");
    throw error;
  }
}

/**
 * Generate the content for Warp AI instructions file
 */
function generateInstructionsContent() {
  return `# 🚀 Warp AI Integration Instructions

**Quick setup for AI context in Warp terminal**

## 🎯 Perfect Warp AI Prompt

Copy and paste this prompt at the start of every Warp AI session:

\`\`\`
I'm working on this project and need you to understand the full context before we start. Please read these files in order:

1. .ai-instructions (start here - contains workflow instructions)
2. .ai/README.md (overview of knowledge base system)  
3. .ai/architecture.md (system architecture and design)
4. .ai/technical-decisions.md (important technical decisions and rationale)
5. .ai/conversation-log.md (chat history and recent progress)
6. .ai/known-issues.md (current problems and workarounds)
7. .ai/next-steps.md (planned work and roadmap)

After reading these files, confirm you understand the project context and let me know if you have any questions about the current state before we proceed.
\`\`\`

## 📁 Knowledge Base Files Reference

Your \`.ai/\` directory contains:

- **README.md** - Overview and instructions for AIs
- **architecture.md** - System design and tech stack
- **conversation-log.md** - Chat history and key decisions  
- **technical-decisions.md** - Why we chose X over Y
- **known-issues.md** - Current problems and solutions
- **next-steps.md** - Roadmap and priorities
- **design-system.md** - UI/UX patterns and guidelines
- **code-style.md** - Coding conventions and standards

Plus the root file:
- **.ai-instructions** - Main entry point for AIs

## 🔄 Workflow Tips

### Starting a Session:
1. Use the prompt above
2. Wait for AI to confirm it read all files
3. Begin your work with full context!

### During Sessions:
- Reference the knowledge base when making decisions
- Follow established patterns from code-style.md
- Check known-issues.md before suggesting fixes
- Respect decisions in technical-decisions.md

### Ending Sessions:
- Manually update conversation-log.md with key decisions
- Add any new issues to known-issues.md
- Update technical-decisions.md if you made important choices
- Consider running: \`npx aic validate\` to check quality

## 📊 Managing Token Usage

Keep an eye on context size:

\`\`\`bash
# Check current token usage
npx aic check

# View detailed breakdown  
npx aic tokens

# See full statistics
npx aic stats
\`\`\`

If your conversation-log.md gets large (>50 entries):
- Consider manually archiving old entries
- Or use the experimental version for automated management

## 🎯 Benefits

✅ **Full Context**: AI understands your project immediately  
✅ **Consistency**: Same understanding across all sessions  
✅ **Efficiency**: No need to re-explain architecture  
✅ **Quality**: Better suggestions that fit your project  
✅ **Speed**: Jump right into productive work  

## 🔧 Maintenance Commands

Keep your knowledge base healthy:

\`\`\`bash
# Initialize new project
npx aic init

# Add missing files to existing project
npx aic migrate

# Check knowledge base quality
npx aic validate

# Quick health check
npx aic check

# Search for information
npx aic search "your query"

# Configure settings
npx aic config
\`\`\`

---

**Generated by create-ai-chat-context**

To regenerate this file:
\`\`\`bash
npx aic warp --force
\`\`\`

To update your knowledge base:
\`\`\`bash
npx aic validate    # Check quality
npx aic check       # Check health  
npx aic tokens      # Check token usage
\`\`\`
`;
}

/**
 * Add entry to .gitignore if it doesn't exist
 */
async function addToGitignore(cwd, entry) {
  const gitignorePath = path.join(cwd, ".gitignore");

  if (!(await fs.pathExists(gitignorePath))) {
    return;
  }

  const content = await fs.readFile(gitignorePath, "utf-8");

  // Check if entry already exists
  if (content.includes(entry)) {
    return;
  }

  // Add entry
  const newContent = content.trim() + `\n\n# Warp AI instructions\n${entry}\n`;
  await fs.writeFile(gitignorePath, newContent, "utf-8");
}

module.exports = {
  generateWarpInstructions,
};