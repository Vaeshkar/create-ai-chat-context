#!/usr/bin/env node

const { Command } = require("commander");
const chalk = require("chalk");
const { init } = require("../src/init");
const { displayTokenUsage } = require("../src/tokens");
// Essential commands
const { healthCheck } = require("../src/check");
const { validateKnowledgeBase } = require("../src/validate");
const { searchKnowledgeBase } = require("../src/search");
const { showStats } = require("../src/stats");
const { handleConfigCommand } = require("../src/config");
const { migrateProject } = require("../src/migrate");

// Simple AI tool integrations
const { generateCursorRules } = require("../src/cursor");
const { generateCopilotInstructions } = require("../src/copilot");
const { generateClaudeProject } = require("../src/claude-project");
const { generateWarpInstructions } = require("../src/warp");
const { generateChatGPTInstructions } = require("../src/chatgpt");
const { generateGeminiInstructions } = require("../src/gemini");
const packageJson = require("../package.json");

const program = new Command();

program
  .name("create-ai-chat-context")
  .description("Preserve AI chat context and history across sessions")
  .version(packageJson.version);

program
  .command("init")
  .description("Initialize AI knowledge base in current directory")
  .option("-f, --force", "Overwrite existing files")
  .option("--no-git", "Skip Git integration")
  .option(
    "-t, --template <name>",
    "Project template (default, nextjs, python, rust, api)"
  )
  .action(async (options) => {
    try {
      await init(options);
    } catch (error) {
      console.error(chalk.red("Error:"), error.message);
      process.exit(1);
    }
  });

program
  .command("cursor")
  .description("Generate .cursorrules file for Cursor AI integration")
  .option("-f, --force", "Overwrite existing .cursorrules file")
  .action(async (options) => {
    try {
      await generateCursorRules(options);
    } catch (error) {
      console.error(chalk.red("Error:"), error.message);
      process.exit(1);
    }
  });

program
  .command("copilot")
  .description("Generate GitHub Copilot instructions for integration")
  .option("-f, --force", "Overwrite existing copilot-instructions.md file")
  .action(async (options) => {
    try {
      await generateCopilotInstructions(options);
    } catch (error) {
      console.error(chalk.red("Error:"), error.message);
      process.exit(1);
    }
  });

program
  .command("claude-project")
  .description("Generate Claude Projects export")
  .option("-f, --force", "Overwrite existing CLAUDE_PROJECT.md file")
  .action(async (options) => {
    try {
      await generateClaudeProject(options);
    } catch (error) {
      console.error(chalk.red("Error:"), error.message);
      process.exit(1);
    }
  });

program
  .command("warp")
  .description("Generate Warp AI integration instructions")
  .option("-f, --force", "Overwrite existing WARP_AI_INSTRUCTIONS.md file")
  .action(async (options) => {
    try {
      await generateWarpInstructions(options);
    } catch (error) {
      console.error(chalk.red("Error:"), error.message);
      process.exit(1);
    }
  });

program
  .command("chatgpt")
  .description("Generate ChatGPT integration instructions")
  .option("-f, --force", "Overwrite existing CHATGPT_INSTRUCTIONS.md file")
  .action(async (options) => {
    try {
      await generateChatGPTInstructions(options);
    } catch (error) {
      console.error(chalk.red("Error:"), error.message);
      process.exit(1);
    }
  });

program
  .command("gemini")
  .description("Generate Google Gemini integration instructions")
  .option("-f, --force", "Overwrite existing GEMINI_INSTRUCTIONS.md file")
  .action(async (options) => {
    try {
      await generateGeminiInstructions(options);
    } catch (error) {
      console.error(chalk.red("Error:"), error.message);
      process.exit(1);
    }
  });

program
  .command("validate")
  .description("Validate knowledge base quality and completeness")
  .action(async () => {
    try {
      await validateKnowledgeBase();
    } catch (error) {
      console.error(chalk.red("Error:"), error.message);
      process.exit(1);
    }
  });

program
  .command("check")
  .description("Quick health check of knowledge base")
  .action(async () => {
    try {
      await healthCheck();
    } catch (error) {
      console.error(chalk.red("Error:"), error.message);
      process.exit(1);
    }
  });

program
  .command("config [action] [key] [value]")
  .description("Manage configuration (list, get, set)")
  .action(async (action, key, value) => {
    try {
      await handleConfigCommand(action, key, value);
    } catch (error) {
      console.error(chalk.red("Error:"), error.message);
      process.exit(1);
    }
  });

program
  .command("tokens")
  .description("Show token usage breakdown of knowledge base")
  .option("-a, --all", "Show all AI models (default: show top 4)")
  .action(async (options) => {
    try {
      await displayTokenUsage(options);
    } catch (error) {
      console.error(chalk.red("Error:"), error.message);
      process.exit(1);
    }
  });


program
  .command("search <query>")
  .description("Search across all knowledge base files")
  .option("-c, --case-sensitive", "Case-sensitive search")
  .action(async (query, options) => {
    try {
      await searchKnowledgeBase(query, options);
    } catch (error) {
      console.error(chalk.red("Error:"), error.message);
      process.exit(1);
    }
  });

program
  .command("stats")
  .description("Show knowledge base statistics and insights")
  .action(async () => {
    try {
      await showStats();
    } catch (error) {
      console.error(chalk.red("Error:"), error.message);
      process.exit(1);
    }
  });


program
  .command("migrate")
  .description("Add missing files to existing AI knowledge base")
  .option("--force", "Skip confirmation prompt")
  .action(async (options) => {
    try {
      await migrateProject(options);
    } catch (error) {
      console.error(chalk.red("Error:"), error.message);
      process.exit(1);
    }
  });


program.parse(process.argv);

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
