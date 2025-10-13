const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");
const readline = require("readline");

/**
 * Get the next chat number from conversation log
 */
async function getNextChatNumber(cwd = process.cwd()) {
  const conversationLogPath = path.join(cwd, ".ai", "conversation-log.md");

  if (!(await fs.pathExists(conversationLogPath))) {
    return 1;
  }

  const content = await fs.readFile(conversationLogPath, "utf-8");
  const matches = content.match(/^## Chat #(\d+)/gm);

  if (!matches || matches.length === 0) {
    return 1;
  }

  // Extract numbers and find the highest
  const numbers = matches.map((match) => {
    const num = match.match(/\d+/);
    return num ? parseInt(num[0], 10) : 0;
  });

  return Math.max(...numbers) + 1;
}

/**
 * Prompt user for input with multi-line support
 */
async function promptMultiLine(question, allowEmpty = false) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log(chalk.cyan(question));
  console.log(chalk.gray("(Enter bullet points, empty line to finish)\n"));

  const lines = [];

  return new Promise((resolve) => {
    const promptLine = () => {
      rl.question(chalk.gray("> "), (answer) => {
        if (answer.trim() === "") {
          rl.close();
          if (lines.length === 0 && !allowEmpty) {
            console.log(chalk.yellow("⚠️  At least one entry required.\n"));
            return promptMultiLine(question, allowEmpty).then(resolve);
          }
          resolve(lines);
        } else {
          // Ensure line starts with "- "
          const line = answer.trim().startsWith("-")
            ? answer.trim()
            : `- ${answer.trim()}`;
          lines.push(line);
          promptLine();
        }
      });
    };

    promptLine();
  });
}

/**
 * Prompt user for single line input
 */
async function promptSingleLine(question, defaultValue = "") {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    const prompt = defaultValue
      ? `${chalk.cyan(question)} ${chalk.gray(`[${defaultValue}]`)}: `
      : `${chalk.cyan(question)}: `;

    rl.question(prompt, (answer) => {
      rl.close();
      resolve(answer.trim() || defaultValue);
    });
  });
}

/**
 * Format date as YYYY-MM-DD
 */
function formatDate(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Interactive command to add conversation log entry
 */
async function addLogEntry(options = {}) {
  const cwd = process.cwd();
  const aiDir = path.join(cwd, ".ai");
  const conversationLogPath = path.join(aiDir, "conversation-log.md");

  // Check if .ai directory exists
  if (!(await fs.pathExists(aiDir))) {
    console.log(chalk.red("\n❌ No .ai/ directory found.\n"));
    console.log(chalk.gray("   Run: npx create-ai-chat-context init\n"));
    return;
  }

  console.log(chalk.bold.cyan("\n📝 Add Conversation Log Entry\n"));

  // Get next chat number
  const chatNumber = await getNextChatNumber(cwd);
  const date = formatDate();

  console.log(chalk.gray(`Chat #${chatNumber}`));
  console.log(chalk.gray(`Date: ${date}\n`));

  // Prompt for accomplishments
  const accomplishments = await promptMultiLine(
    "What did you accomplish? (bullet points)"
  );

  // Prompt for decisions (optional)
  console.log(); // Empty line
  const decisions = await promptMultiLine(
    "Key decisions made? (optional, bullet points)",
    true
  );

  // Prompt for next steps (optional)
  console.log(); // Empty line
  const nextSteps = await promptMultiLine(
    "Next steps? (optional, bullet points)",
    true
  );

  // Build the entry
  const entry = buildLogEntry(chatNumber, date, accomplishments, decisions, nextSteps);

  // Append to conversation log
  await appendToConversationLog(conversationLogPath, entry);

  console.log(chalk.green("\n✅ Entry added to conversation log!"));
  console.log(chalk.gray(`   Location: .ai/conversation-log.md\n`));

  // Show preview
  console.log(chalk.bold("Preview:"));
  console.log(chalk.gray("─".repeat(50)));
  console.log(entry);
  console.log(chalk.gray("─".repeat(50) + "\n"));
}

/**
 * Build log entry markdown
 */
function buildLogEntry(chatNumber, date, accomplishments, decisions, nextSteps) {
  let entry = `## Chat #${chatNumber}\n\n`;
  entry += `**Date:** ${date}\n\n`;

  entry += `### What We Did\n\n`;
  accomplishments.forEach((line) => {
    entry += `${line}\n`;
  });
  entry += `\n`;

  if (decisions && decisions.length > 0) {
    entry += `### Key Decisions\n\n`;
    decisions.forEach((line) => {
      entry += `${line}\n`;
    });
    entry += `\n`;
  }

  if (nextSteps && nextSteps.length > 0) {
    entry += `### Next Steps\n\n`;
    nextSteps.forEach((line) => {
      entry += `${line}\n`;
    });
    entry += `\n`;
  }

  entry += `---\n\n`;

  return entry;
}

/**
 * Append entry to conversation log
 */
async function appendToConversationLog(logPath, entry) {
  let content = "";

  if (await fs.pathExists(logPath)) {
    content = await fs.readFile(logPath, "utf-8");
  }

  // Find the position to insert (before the reminder section if it exists)
  const reminderIndex = content.indexOf("## 📝 Reminder for AI Assistants");

  if (reminderIndex !== -1) {
    // Insert before reminder
    const before = content.substring(0, reminderIndex);
    const after = content.substring(reminderIndex);
    content = before + entry + after;
  } else {
    // Append to end
    content += entry;
  }

  await fs.writeFile(logPath, content, "utf-8");
}

module.exports = {
  addLogEntry,
  getNextChatNumber,
};

