const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");

/**
 * Search across all knowledge base files
 */
async function searchKnowledgeBase(query, options = {}) {
  const cwd = process.cwd();
  const aiDir = path.join(cwd, ".ai");

  // Check if .ai directory exists
  if (!(await fs.pathExists(aiDir))) {
    console.log(chalk.red("\n❌ No .ai/ directory found.\n"));
    console.log(chalk.gray("   Run: npx create-ai-chat-context init\n"));
    return;
  }

  if (!query) {
    console.log(chalk.red("\n❌ Please provide a search query.\n"));
    console.log(chalk.gray("   Usage: npx create-ai-chat-context search \"your query\"\n"));
    return;
  }

  console.log(chalk.bold.cyan(`\n🔍 Searching for: "${query}"\n`));

  const files = [
    "README.md",
    "architecture.md",
    "technical-decisions.md",
    "conversation-log.md",
    "known-issues.md",
    "next-steps.md",
    "SETUP_GUIDE.md",
    "TOKEN_MANAGEMENT.md",
  ];

  let totalMatches = 0;
  const caseSensitive = options.caseSensitive || false;
  const searchRegex = new RegExp(
    query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
    caseSensitive ? "g" : "gi"
  );

  for (const file of files) {
    const filePath = path.join(aiDir, file);

    if (!(await fs.pathExists(filePath))) {
      continue;
    }

    const content = await fs.readFile(filePath, "utf-8");
    const lines = content.split("\n");
    const matches = [];

    // Find all matching lines
    lines.forEach((line, index) => {
      if (searchRegex.test(line)) {
        matches.push({
          lineNumber: index + 1,
          line: line.trim(),
        });
      }
    });

    if (matches.length > 0) {
      totalMatches += matches.length;

      // Display file header
      console.log(chalk.bold.green(`📄 ${file}`));
      console.log(chalk.gray(`   ${matches.length} match${matches.length > 1 ? "es" : ""} found\n`));

      // Display matches with context
      matches.forEach((match) => {
        // Highlight the search term in the line
        const highlightedLine = match.line.replace(
          searchRegex,
          (matched) => chalk.yellow.bold(matched)
        );

        console.log(chalk.gray(`   Line ${match.lineNumber}:`));
        console.log(`   ${highlightedLine}`);
        console.log();
      });
    }
  }

  // Summary
  if (totalMatches === 0) {
    console.log(chalk.yellow("❌ No matches found.\n"));
    console.log(chalk.gray("💡 Tips:\n"));
    console.log(chalk.gray("   • Try different keywords"));
    console.log(chalk.gray("   • Check spelling"));
    console.log(chalk.gray("   • Use broader search terms\n"));
  } else {
    console.log(chalk.bold.green(`✅ Found ${totalMatches} match${totalMatches > 1 ? "es" : ""} across ${files.length} files\n`));
    
    console.log(chalk.gray("💡 Tips:\n"));
    console.log(chalk.gray("   • Use --case-sensitive for exact case matching"));
    console.log(chalk.gray("   • Search is across all .ai/ files\n"));
  }
}

module.exports = {
  searchKnowledgeBase,
};

