const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");
const { estimateTokens } = require("./tokens");

/**
 * Show knowledge base statistics and insights
 */
async function showStats() {
  const cwd = process.cwd();
  const aiDir = path.join(cwd, ".ai");

  // Check if .ai directory exists
  if (!(await fs.pathExists(aiDir))) {
    console.log(chalk.red("\n❌ No .ai/ directory found.\n"));
    console.log(chalk.gray("   Run: npx create-ai-chat-context init\n"));
    return;
  }

  console.log(chalk.bold.cyan("\n📊 Knowledge Base Statistics\n"));

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

  let totalWords = 0;
  let totalLines = 0;
  let totalFiles = 0;
  let conversationEntries = 0;
  let lastModified = null;
  let mostActiveFile = { name: "", words: 0 };
  const fileStats = [];

  // Gather statistics
  for (const file of files) {
    const filePath = path.join(aiDir, file);

    if (!(await fs.pathExists(filePath))) {
      continue;
    }

    totalFiles++;
    const content = await fs.readFile(filePath, "utf-8");
    const lines = content.split("\n");
    const words = content.split(/\s+/).filter((w) => w.length > 0).length;

    totalWords += words;
    totalLines += lines.length;

    // Track most active file
    if (words > mostActiveFile.words) {
      mostActiveFile = { name: file, words };
    }

    // Get last modified time
    const stats = await fs.stat(filePath);
    if (!lastModified || stats.mtime > lastModified) {
      lastModified = stats.mtime;
    }

    // Count conversation entries
    if (file === "conversation-log.md") {
      const chatMatches = content.match(/^## Chat #\d+/gm);
      conversationEntries = chatMatches ? chatMatches.length : 0;
    }

    fileStats.push({
      name: file,
      words,
      lines: lines.length,
      tokens: estimateTokens(words),
    });
  }

  const totalTokens = estimateTokens(totalWords);

  // Display content statistics
  console.log(chalk.bold("📝 Content:\n"));
  console.log(`   Total files:              ${chalk.cyan(totalFiles)}`);
  console.log(`   Total lines:              ${chalk.cyan(totalLines.toLocaleString())}`);
  console.log(`   Total words:              ${chalk.cyan(totalWords.toLocaleString())}`);
  console.log(`   Estimated tokens:         ${chalk.cyan(`~${totalTokens.toLocaleString()}`)}`);
  console.log(`   Conversation entries:     ${chalk.cyan(conversationEntries)}`);
  console.log();

  // Display activity statistics
  console.log(chalk.bold("📈 Activity:\n"));
  if (lastModified) {
    const timeSince = getTimeSince(lastModified);
    console.log(`   Last updated:             ${chalk.cyan(timeSince)}`);
  }
  console.log(`   Most active file:         ${chalk.cyan(mostActiveFile.name)}`);
  console.log(`   Most active file size:    ${chalk.cyan(`${mostActiveFile.words.toLocaleString()} words`)}`);
  console.log();

  // Display file breakdown
  console.log(chalk.bold("📄 File Breakdown:\n"));
  fileStats
    .sort((a, b) => b.words - a.words)
    .forEach((file) => {
      const percentage = ((file.words / totalWords) * 100).toFixed(1);
      const bar = generateBar(file.words, mostActiveFile.words);
      console.log(`   ${file.name.padEnd(25)} ${bar} ${chalk.cyan(`${percentage}%`)} (${file.words.toLocaleString()} words)`);
    });
  console.log();

  // Display quality score (based on validate logic)
  const qualityScore = await calculateQualityScore(aiDir, files);
  const scoreColor = qualityScore >= 80 ? "green" : qualityScore >= 60 ? "yellow" : "red";
  console.log(chalk.bold("🎯 Quality Score:\n"));
  console.log(`   ${chalk[scoreColor].bold(`${qualityScore}%`)} - ${getQualityLabel(qualityScore)}`);
  console.log();

  // Display token usage insights
  console.log(chalk.bold("💡 Insights:\n"));
  
  if (totalTokens < 5000) {
    console.log(chalk.green("   ✅ Token usage is low - plenty of room to grow"));
  } else if (totalTokens < 15000) {
    console.log(chalk.yellow("   ⚠️  Token usage is moderate - consider archiving old entries"));
  } else {
    console.log(chalk.red("   🚨 Token usage is high - run 'archive' or 'summary' command"));
  }

  if (conversationEntries > 50) {
    console.log(chalk.yellow(`   ⚠️  ${conversationEntries} conversation entries - consider archiving`));
  } else if (conversationEntries > 30) {
    console.log(chalk.gray(`   💬 ${conversationEntries} conversation entries - healthy amount`));
  }

  if (qualityScore < 80) {
    console.log(chalk.yellow("   📝 Run 'validate' command for improvement suggestions"));
  }

  console.log();

  // Display helpful commands
  console.log(chalk.bold("🛠️  Helpful Commands:\n"));
  console.log(chalk.gray("   npx create-ai-chat-context search <query>  - Search knowledge base"));
  console.log(chalk.gray("   npx create-ai-chat-context validate        - Check quality"));
  console.log(chalk.gray("   npx create-ai-chat-context archive         - Archive old entries"));
  console.log(chalk.gray("   npx create-ai-chat-context log             - Add new entry"));
  console.log();
}

/**
 * Get time since last modification
 */
function getTimeSince(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  
  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
  if (seconds < 2592000) return `${Math.floor(seconds / 604800)} weeks ago`;
  return `${Math.floor(seconds / 2592000)} months ago`;
}

/**
 * Generate a visual bar for file size
 */
function generateBar(value, max, width = 20) {
  const filled = Math.round((value / max) * width);
  const empty = width - filled;
  return chalk.cyan("█".repeat(filled)) + chalk.gray("░".repeat(empty));
}

/**
 * Calculate quality score
 */
async function calculateQualityScore(aiDir, files) {
  let score = 0;
  let maxScore = 0;

  // Check if files exist (40 points)
  for (const file of files) {
    maxScore += 5;
    if (await fs.pathExists(path.join(aiDir, file))) {
      score += 5;
    }
  }

  // Check if files are customized (60 points)
  const filesToCheck = ["architecture.md", "technical-decisions.md"];
  for (const file of filesToCheck) {
    const filePath = path.join(aiDir, file);
    if (await fs.pathExists(filePath)) {
      const content = await fs.readFile(filePath, "utf-8");
      maxScore += 30;
      
      // Check if file has been customized (not just template)
      if (!content.includes("[Your") && !content.includes("[Add your")) {
        score += 30;
      } else if (content.length > 1000) {
        score += 15; // Partial credit
      }
    }
  }

  return Math.round((score / maxScore) * 100);
}

/**
 * Get quality label
 */
function getQualityLabel(score) {
  if (score >= 90) return "Excellent";
  if (score >= 80) return "Good";
  if (score >= 70) return "Fair";
  if (score >= 60) return "Needs Improvement";
  return "Poor";
}

module.exports = {
  showStats,
};

