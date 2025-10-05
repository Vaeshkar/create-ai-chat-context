const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");

/**
 * Required files in .ai directory
 */
const REQUIRED_FILES = [
  "README.md",
  "architecture.md",
  "conversation-log.md",
  "technical-decisions.md",
  "known-issues.md",
  "next-steps.md",
  "SETUP_GUIDE.md",
  "TOKEN_MANAGEMENT.md",
];

/**
 * Check if file exists
 */
async function checkFileExists(filePath) {
  return await fs.pathExists(filePath);
}

/**
 * Check if file has been customized (not default template)
 */
async function checkFileCustomized(filePath, fileName) {
  if (!(await fs.pathExists(filePath))) {
    return { customized: false, reason: "File does not exist" };
  }

  const content = await fs.readFile(filePath, "utf-8");
  const lines = content.split("\n").filter((line) => line.trim() !== "");

  // Check if file is too short (likely empty or just template)
  if (lines.length < 10) {
    return { customized: false, reason: "File appears empty or minimal" };
  }

  // Check for common template indicators
  const templateIndicators = [
    "[Your project name]",
    "[Your architecture]",
    "[Your decision]",
    "[Add your",
    "[Describe",
    "[List",
    "TODO:",
    "FIXME:",
  ];

  const hasTemplateText = templateIndicators.some((indicator) =>
    content.includes(indicator)
  );

  if (hasTemplateText) {
    return {
      customized: false,
      reason: "Contains template placeholder text",
    };
  }

  // File-specific checks
  if (fileName === "architecture.md") {
    // Should have some technical content
    const hasTechnicalContent =
      content.includes("database") ||
      content.includes("API") ||
      content.includes("frontend") ||
      content.includes("backend") ||
      content.includes("service") ||
      content.includes("component");

    if (!hasTechnicalContent) {
      return {
        customized: false,
        reason: "Missing technical architecture details",
      };
    }
  }

  if (fileName === "conversation-log.md") {
    // Should have at least one chat entry
    const hasChatEntry = /## Chat #\d+/.test(content);
    if (!hasChatEntry) {
      return { customized: false, reason: "No conversation entries yet" };
    }
  }

  return { customized: true, reason: null };
}

/**
 * Validate conversation log format
 */
async function validateConversationLog(filePath) {
  if (!(await fs.pathExists(filePath))) {
    return { valid: false, issues: ["File does not exist"] };
  }

  const content = await fs.readFile(filePath, "utf-8");
  const issues = [];

  // Check for chat entries
  const chatMatches = content.match(/^## Chat #\d+/gm);
  if (!chatMatches || chatMatches.length === 0) {
    issues.push("No chat entries found");
    return { valid: false, issues };
  }

  // Check for proper sections in entries
  const hasWhatWeDid = content.includes("### What We Did");
  if (!hasWhatWeDid) {
    issues.push("Missing 'What We Did' sections");
  }

  // Check for dates
  const hasDate = content.includes("**Date:**");
  if (!hasDate) {
    issues.push("Missing date information");
  }

  return { valid: issues.length === 0, issues };
}

/**
 * Calculate quality score
 */
function calculateScore(results) {
  let score = 0;
  let maxScore = 0;

  // File existence (1 point each)
  results.files.forEach((file) => {
    maxScore += 1;
    if (file.exists) score += 1;
  });

  // File customization (2 points each for important files)
  const importantFiles = [
    "architecture.md",
    "technical-decisions.md",
    "conversation-log.md",
  ];

  results.files.forEach((file) => {
    if (importantFiles.includes(file.name)) {
      maxScore += 2;
      if (file.customized) score += 2;
    }
  });

  // Conversation log format (2 points)
  maxScore += 2;
  if (results.conversationLog.valid) score += 2;

  const percentage = Math.round((score / maxScore) * 100);
  return { score, maxScore, percentage };
}

/**
 * Get quality rating
 */
function getQualityRating(percentage) {
  if (percentage >= 90)
    return { rating: "Excellent", icon: "🌟", color: chalk.green };
  if (percentage >= 75)
    return { rating: "Good", icon: "✅", color: chalk.green };
  if (percentage >= 60)
    return { rating: "Fair", icon: "⚠️", color: chalk.yellow };
  if (percentage >= 40)
    return { rating: "Needs Work", icon: "⚠️", color: chalk.yellow };
  return { rating: "Poor", icon: "❌", color: chalk.red };
}

/**
 * Validate knowledge base
 */
async function validateKnowledgeBase(options = {}) {
  const cwd = process.cwd();
  const aiDir = path.join(cwd, ".ai");
  const aiInstructionsPath = path.join(cwd, ".ai-instructions");

  // Check if .ai directory exists
  if (!(await fs.pathExists(aiDir))) {
    console.log(chalk.red("\n❌ No .ai/ directory found.\n"));
    console.log(chalk.gray("   Run: npx create-ai-chat-context init\n"));
    return;
  }

  console.log(chalk.bold.cyan("\n🔍 Validating Knowledge Base...\n"));

  const results = {
    files: [],
    conversationLog: { valid: true, issues: [] },
    aiInstructions: { exists: false },
  };

  // Check .ai-instructions
  results.aiInstructions.exists = await checkFileExists(aiInstructionsPath);

  // Check all required files
  for (const fileName of REQUIRED_FILES) {
    const filePath = path.join(aiDir, fileName);
    const exists = await checkFileExists(filePath);
    const customization = exists
      ? await checkFileCustomized(filePath, fileName)
      : { customized: false, reason: "File does not exist" };

    results.files.push({
      name: fileName,
      exists,
      customized: customization.customized,
      reason: customization.reason,
    });
  }

  // Validate conversation log format
  const conversationLogPath = path.join(aiDir, "conversation-log.md");
  results.conversationLog = await validateConversationLog(conversationLogPath);

  // Display results
  displayValidationResults(results);

  return results;
}

/**
 * Display validation results
 */
function displayValidationResults(results) {
  // File existence
  console.log(chalk.bold("📁 File Check:\n"));
  results.files.forEach((file) => {
    const icon = file.exists ? chalk.green("✅") : chalk.red("❌");
    console.log(`  ${icon} ${file.name}`);
  });

  // .ai-instructions
  const aiIcon = results.aiInstructions.exists
    ? chalk.green("✅")
    : chalk.red("❌");
  console.log(`  ${aiIcon} .ai-instructions`);
  console.log();

  // Customization check
  console.log(chalk.bold("✏️  Customization Check:\n"));
  const importantFiles = [
    "architecture.md",
    "technical-decisions.md",
    "conversation-log.md",
  ];

  results.files
    .filter((f) => importantFiles.includes(f.name))
    .forEach((file) => {
      if (!file.exists) return;

      const icon = file.customized ? chalk.green("✅") : chalk.yellow("⚠️");
      console.log(`  ${icon} ${file.name}`);
      if (!file.customized && file.reason) {
        console.log(chalk.gray(`     ${file.reason}`));
      }
    });
  console.log();

  // Conversation log format
  console.log(chalk.bold("📝 Conversation Log Format:\n"));
  if (results.conversationLog.valid) {
    console.log(chalk.green("  ✅ Format is valid"));
  } else {
    console.log(chalk.yellow("  ⚠️  Issues found:"));
    results.conversationLog.issues.forEach((issue) => {
      console.log(chalk.gray(`     - ${issue}`));
    });
  }
  console.log();

  // Calculate score
  const scoreData = calculateScore(results);
  const quality = getQualityRating(scoreData.percentage);

  console.log(chalk.bold("📊 Quality Score:\n"));
  console.log(
    `  ${quality.icon} ${quality.color(
      `${scoreData.score}/${scoreData.maxScore} (${scoreData.percentage}%)`
    )} - ${quality.color(quality.rating)}`
  );
  console.log();

  // Recommendations
  if (scoreData.percentage < 90) {
    console.log(chalk.bold("💡 Recommendations:\n"));

    if (!results.aiInstructions.exists) {
      console.log(
        chalk.gray("  • Create .ai-instructions file (run init again)")
      );
    }

    results.files.forEach((file) => {
      if (!file.exists) {
        console.log(chalk.gray(`  • Create ${file.name}`));
      } else if (!file.customized && importantFiles.includes(file.name)) {
        console.log(chalk.gray(`  • Customize ${file.name} for your project`));
      }
    });

    if (!results.conversationLog.valid) {
      console.log(
        chalk.gray(
          "  • Add conversation entries manually to conversation-log.md"
        )
      );
    }

    console.log();
  }

  // Success message
  if (scoreData.percentage >= 90) {
    console.log(
      chalk.green.bold("🎉 Your knowledge base is in excellent shape!\n")
    );
  } else if (scoreData.percentage >= 75) {
    console.log(
      chalk.green("✅ Your knowledge base is in good shape. Keep it up!\n")
    );
  } else {
    console.log(
      chalk.yellow(
        "⚠️  Your knowledge base needs some work. Follow the recommendations above.\n"
      )
    );
  }
}

module.exports = {
  validateKnowledgeBase,
};
