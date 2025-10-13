const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");

/**
 * Estimate tokens from word count
 * Rule of thumb: 1 token ≈ 0.75 words (or 1.33 tokens per word)
 */
function estimateTokens(wordCount) {
  return Math.ceil(wordCount * 1.33);
}

/**
 * Count words in a file
 */
async function countWordsInFile(filePath) {
  try {
    const content = await fs.readFile(filePath, "utf-8");
    // Split by whitespace and filter empty strings
    const words = content.split(/\s+/).filter((word) => word.length > 0);
    return words.length;
  } catch (error) {
    return 0;
  }
}

/**
 * Get token usage for all .ai/ files
 */
async function getTokenUsage(cwd = process.cwd()) {
  const aiDir = path.join(cwd, ".ai");
  const aiInstructions = path.join(cwd, ".ai-instructions");
  const newChatPrompt = path.join(cwd, "NEW_CHAT_PROMPT.md");

  const files = [
    { path: aiInstructions, name: ".ai-instructions", category: "entry" },
    {
      path: path.join(aiDir, "README.md"),
      name: ".ai/README.md",
      category: "core",
    },
    {
      path: path.join(aiDir, "architecture.md"),
      name: ".ai/architecture.md",
      category: "core",
    },
    {
      path: path.join(aiDir, "conversation-log.md"),
      name: ".ai/conversation-log.md",
      category: "history",
    },
    {
      path: path.join(aiDir, "technical-decisions.md"),
      name: ".ai/technical-decisions.md",
      category: "core",
    },
    {
      path: path.join(aiDir, "known-issues.md"),
      name: ".ai/known-issues.md",
      category: "core",
    },
    {
      path: path.join(aiDir, "next-steps.md"),
      name: ".ai/next-steps.md",
      category: "core",
    },
    {
      path: path.join(aiDir, "SETUP_GUIDE.md"),
      name: ".ai/SETUP_GUIDE.md",
      category: "reference",
    },
    { path: newChatPrompt, name: "NEW_CHAT_PROMPT.md", category: "reference" },
  ];

  const results = [];
  let totalWords = 0;
  let totalTokens = 0;

  for (const file of files) {
    if (await fs.pathExists(file.path)) {
      const words = await countWordsInFile(file.path);
      const tokens = estimateTokens(words);

      results.push({
        name: file.name,
        category: file.category,
        words,
        tokens,
        exists: true,
      });

      totalWords += words;
      totalTokens += tokens;
    } else {
      results.push({
        name: file.name,
        category: file.category,
        words: 0,
        tokens: 0,
        exists: false,
      });
    }
  }

  return {
    files: results,
    totalWords,
    totalTokens,
  };
}

/**
 * Display token usage report
 */
async function displayTokenUsage(options = {}) {
  const cwd = process.cwd();
  const { loadConfig } = require("./config");

  console.log(chalk.bold.cyan("\n📊 Token Usage Report\n"));

  const usage = await getTokenUsage(cwd);
  const config = await loadConfig(cwd);

  if (usage.totalWords === 0) {
    console.log(
      chalk.yellow('⚠️  No .ai/ directory found. Run "init" first.\n')
    );
    return;
  }

  // Group by category
  const categories = {
    entry: { name: "Entry Point", files: [] },
    core: { name: "Core Knowledge Base", files: [] },
    history: { name: "Conversation History", files: [] },
    reference: { name: "Reference (Optional)", files: [] },
  };

  usage.files.forEach((file) => {
    if (file.exists) {
      categories[file.category].files.push(file);
    }
  });

  // Display by category
  Object.values(categories).forEach((category) => {
    if (category.files.length > 0) {
      console.log(chalk.bold(`${category.name}:`));
      category.files.forEach((file) => {
        const percentage = ((file.tokens / usage.totalTokens) * 100).toFixed(1);
        console.log(
          `  ${chalk.gray(file.name.padEnd(35))} ` +
            `${chalk.cyan(file.words.toString().padStart(6))} words  ` +
            `${chalk.green(file.tokens.toString().padStart(6))} tokens  ` +
            `${chalk.gray(`(${percentage}%)`)}`
        );
      });
      console.log();
    }
  });

  // Total
  console.log(chalk.bold("Total:"));
  console.log(
    `  ${chalk.gray("All files".padEnd(35))} ` +
      `${chalk.cyan(usage.totalWords.toString().padStart(6))} words  ` +
      `${chalk.green(usage.totalTokens.toString().padStart(6))} tokens`
  );
  console.log();

  // Context window comparison
  console.log(chalk.bold("Context Window Usage:\n"));

  const allModels = [
    // OpenAI Models (October 2025)
    { name: "GPT-5", size: 400000, popular: true },
    { name: "GPT-5 mini", size: 400000, popular: false },
    { name: "GPT-5 nano", size: 400000, popular: false },
    { name: "GPT-4o", size: 128000, popular: true },
    { name: "GPT-4 Turbo", size: 128000, popular: false },
    { name: "o1-preview", size: 128000, popular: false },
    { name: "o1-mini", size: 128000, popular: false },

    // Anthropic Claude Models (October 2025)
    { name: "Claude Sonnet 4.5", size: 200000, popular: true },
    { name: "Claude Opus 4.1", size: 200000, popular: false },
    { name: "Claude Sonnet 4", size: 200000, popular: false },
    { name: "Claude Opus 4", size: 200000, popular: false },
    { name: "Claude 3.5 Sonnet", size: 200000, popular: false },
    { name: "Claude 3.5 Haiku", size: 200000, popular: false },
    { name: "Claude 3 Opus", size: 200000, popular: false },

    // Google Gemini Models (October 2025)
    { name: "Gemini 1.5 Pro", size: 2000000, popular: true },
    { name: "Gemini 1.5 Flash", size: 1000000, popular: false },
  ];

  // Determine which models to show
  const showAll = options.all || config.showAllModels;
  let modelsToShow = allModels;

  if (!showAll) {
    // Show preferred model + top 3 popular models
    const preferredModel = config.preferredModel;
    const popularModels = allModels.filter((m) => m.popular);

    if (preferredModel) {
      // Find preferred model
      const preferred = allModels.find((m) => m.name === preferredModel);
      if (preferred) {
        // Show preferred + top 3 popular (excluding preferred if it's already popular)
        modelsToShow = [preferred];
        popularModels.forEach((m) => {
          if (m.name !== preferredModel && modelsToShow.length < 4) {
            modelsToShow.push(m);
          }
        });
      } else {
        // Preferred model not found, just show popular
        modelsToShow = popularModels.slice(0, 4);
      }
    } else {
      // No preferred model, show top 4 popular
      modelsToShow = popularModels.slice(0, 4);
    }
  }

  // Display models
  modelsToShow.forEach((model) => {
    const percentage = ((usage.totalTokens / model.size) * 100).toFixed(2);
    const bar = "█".repeat(Math.min(Math.floor(percentage / 2), 50));
    const color =
      percentage < 5 ? chalk.green : percentage < 15 ? chalk.yellow : chalk.red;

    const isPreferred = model.name === config.preferredModel;
    const prefix = isPreferred ? "⭐ " : "   ";

    console.log(
      `${prefix}${model.name.padEnd(20)} ${color(
        percentage.toString().padStart(6)
      )}%  ${color(bar)}`
    );
  });

  console.log();

  // Show hint if not showing all models
  if (!showAll) {
    console.log(
      chalk.gray(
        `💡 Showing ${modelsToShow.length} models. Run 'npx aic tokens --all' to see all ${allModels.length} models\n`
      )
    );
  }

  // Recommendations
  if (usage.totalTokens < 10000) {
    console.log(chalk.green("✅ Token usage is low. No action needed.\n"));
  } else if (usage.totalTokens < 25000) {
    console.log(
      chalk.yellow(
        "⚠️  Token usage is moderate. Consider archiving old conversations soon.\n"
      )
    );
  } else {
    console.log(chalk.red("🚨 Token usage is high! Recommended actions:\n"));
    console.log(chalk.gray("   1. Run: npx create-ai-chat-context archive"));
    console.log(
      chalk.gray("   2. Run: npx create-ai-chat-context summary --keep 10")
    );
    console.log(chalk.gray("   3. Review and clean up old entries\n"));
  }

  // Show conversation log details if it's large
  const conversationLog = usage.files.find(
    (f) => f.name === ".ai/conversation-log.md"
  );
  if (conversationLog && conversationLog.tokens > 5000) {
    console.log(chalk.bold("💡 Tip:"));
    console.log(chalk.gray("   Your conversation log is large. Consider:"));
    console.log(
      chalk.gray(
        "   - Archiving old entries: npx create-ai-chat-context archive"
      )
    );
    console.log(
      chalk.gray(
        "   - Summarizing history: npx create-ai-chat-context summary\n"
      )
    );
  }
}

module.exports = {
  estimateTokens,
  countWordsInFile,
  getTokenUsage,
  displayTokenUsage,
};
