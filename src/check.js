const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const { getTokenUsage } = require('./tokens');

/**
 * Count conversation log entries
 */
async function countConversationEntries(cwd = process.cwd()) {
  const conversationLogPath = path.join(cwd, '.ai', 'conversation-log.md');
  
  if (!await fs.pathExists(conversationLogPath)) {
    return 0;
  }

  const content = await fs.readFile(conversationLogPath, 'utf-8');
  const matches = content.match(/^## Chat #\d+/gm);
  return matches ? matches.length : 0;
}

/**
 * Get last updated date of conversation log
 */
async function getLastUpdated(cwd = process.cwd()) {
  const conversationLogPath = path.join(cwd, '.ai', 'conversation-log.md');
  
  if (!await fs.pathExists(conversationLogPath)) {
    return null;
  }

  const stats = await fs.stat(conversationLogPath);
  return stats.mtime;
}

/**
 * Quick health check of knowledge base
 */
async function healthCheck(options = {}) {
  const cwd = process.cwd();
  const aiDir = path.join(cwd, '.ai');

  // Check if .ai directory exists
  if (!await fs.pathExists(aiDir)) {
    console.log(chalk.red('\n❌ No .ai/ directory found.\n'));
    console.log(chalk.gray('   Run: npx create-ai-chat-context init\n'));
    return;
  }

  console.log(chalk.bold.cyan('\n📊 Knowledge Base Health Check\n'));

  // Get token usage
  const usage = await getTokenUsage(cwd);
  const entryCount = await countConversationEntries(cwd);
  const lastUpdated = await getLastUpdated(cwd);

  // Display token usage
  const claudePercentage = ((usage.totalTokens / 200000) * 100).toFixed(1);
  const gpt4Percentage = ((usage.totalTokens / 128000) * 100).toFixed(1);

  console.log(chalk.bold('Token Usage:'));
  console.log(`  ${chalk.cyan(usage.totalTokens.toLocaleString())} tokens`);
  console.log(`  ${chalk.gray(`${claudePercentage}% of Claude 200K`)} | ${chalk.gray(`${gpt4Percentage}% of GPT-4 Turbo 128K`)}`);
  console.log();

  // Display conversation log info
  console.log(chalk.bold('Conversation Log:'));
  console.log(`  ${chalk.cyan(entryCount)} entries`);
  if (lastUpdated) {
    const daysAgo = Math.floor((Date.now() - lastUpdated) / (1000 * 60 * 60 * 24));
    if (daysAgo === 0) {
      console.log(`  ${chalk.gray('Last updated: Today')}`);
    } else if (daysAgo === 1) {
      console.log(`  ${chalk.gray('Last updated: Yesterday')}`);
    } else {
      console.log(`  ${chalk.gray(`Last updated: ${daysAgo} days ago`)}`);
    }
  }
  console.log();

  // Determine status and recommendations
  let status = 'healthy';
  let statusIcon = '✅';
  let statusColor = chalk.green;
  const recommendations = [];

  if (usage.totalTokens > 25000) {
    status = 'high';
    statusIcon = '🚨';
    statusColor = chalk.red;
    recommendations.push('High token usage - Consider manually cleaning up conversation-log.md');
    recommendations.push('Or migrate to experimental version for automated management');
  } else if (usage.totalTokens > 15000) {
    status = 'moderate';
    statusIcon = '⚠️';
    statusColor = chalk.yellow;
    recommendations.push('Consider reviewing and cleaning up conversation-log.md manually');
  } else if (entryCount > 30) {
    status = 'moderate';
    statusIcon = '⚠️';
    statusColor = chalk.yellow;
    recommendations.push('Many conversation entries - Consider manual cleanup of old entries');
  }

  // Display status
  console.log(chalk.bold('Status:'));
  if (status === 'healthy') {
    console.log(`  ${statusColor(statusIcon + ' Healthy - No action needed')}`);
  } else if (status === 'moderate') {
    console.log(`  ${statusColor(statusIcon + ' Moderate - Consider maintenance soon')}`);
  } else {
    console.log(`  ${statusColor(statusIcon + ' High Usage - Action recommended')}`);
  }
  console.log();

  // Display recommendations
  if (recommendations.length > 0) {
    console.log(chalk.bold('💡 Recommended Actions:\n'));
    recommendations.forEach((rec, index) => {
      console.log(`  ${index + 1}. ${chalk.gray(rec)}`);
    });
    console.log();
  }

  // Additional tips
  if (status === 'healthy' && entryCount > 10) {
    console.log(chalk.bold('💡 Tip:'));
    console.log(chalk.gray('   Run "npx create-ai-chat-context tokens" for detailed breakdown.\n'));
  }

  // Return status for programmatic use
  return {
    status,
    tokenUsage: usage.totalTokens,
    entryCount,
    recommendations,
  };
}

module.exports = {
  healthCheck,
  countConversationEntries,
  getLastUpdated,
};

