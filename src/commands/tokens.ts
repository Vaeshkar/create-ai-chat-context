/**
 * Tokens command - Analyze token usage in knowledge base
 * Following code-standards.md - October 2025
 */

import { join } from 'path';
import type { CommandOptions, CommandResult, TokenUsage, FileStats } from '../types/index.js';
import { pathExists, readFile, readDir } from '../core/filesystem.js';
import { logger } from '../utils/logger.js';
import { createSpinner } from '../utils/spinner.js';
import { AiDirectoryNotFoundError } from '../types/errors.js';

/**
 * File categories for token analysis
 */
const FILE_CATEGORIES: Record<string, string> = {
  'README.md': 'entry',
  'conversation-log.md': 'history',
  'technical-decisions.md': 'core',
  'next-steps.md': 'planning',
  'code-style.md': 'core',
  'design-system.md': 'core',
  'project-overview.md': 'entry',
};

/**
 * Analyzes token usage in the knowledge base
 *
 * @param options - Command options
 * @returns Command result with token usage data
 *
 * @example
 * ```typescript
 * const result = await tokens({ cwd: '/path/to/project' });
 * if (result.success) {
 *   console.log('Total tokens:', result.data.totalTokens);
 * }
 * ```
 */
export async function tokens(options: CommandOptions = {}): Promise<CommandResult> {
  const cwd = options.cwd ?? process.cwd();
  const verbose = options.verbose ?? false;

  try {
    const aiDir = join(cwd, '.ai');
    const aicfDir = join(cwd, '.aicf');

    if (verbose) {
      logger.info(`Analyzing token usage in: ${cwd}`);
    }

    // Check if .ai directory exists
    const aiExists = await pathExists(aiDir);
    if (!aiExists) {
      throw new AiDirectoryNotFoundError(aiDir);
    }

    const spinner = createSpinner('Analyzing files...').start();

    // Analyze files
    const files: FileStats[] = [];

    // Analyze .ai directory
    const aiFiles = await analyzeDirectory(aiDir, 'ai');
    files.push(...aiFiles);

    // Analyze .aicf directory if it exists
    const aicfExists = await pathExists(aicfDir);
    if (aicfExists) {
      const aicfFiles = await analyzeDirectory(aicfDir, 'aicf');
      files.push(...aicfFiles);
    }

    spinner.succeed('Analysis complete');

    // Calculate totals
    const usage = calculateUsage(files);

    // Display results
    displayResults(usage, verbose);

    return {
      success: true,
      message: 'Token analysis complete',
      data: usage,
    };
  } catch (error) {
    logger.error('Failed to analyze tokens', error as Error);

    return {
      success: false,
      error: error as Error,
    };
  }
}

/**
 * Analyzes all files in a directory
 */
async function analyzeDirectory(dirPath: string, type: 'ai' | 'aicf'): Promise<FileStats[]> {
  const files: FileStats[] = [];
  const entries = await readDir(dirPath);

  for (const entry of entries) {
    const filePath = join(dirPath, entry);
    const stats = await analyzeFile(filePath, entry, type);
    files.push(stats);
  }

  return files;
}

/**
 * Analyzes a single file
 */
async function analyzeFile(
  filePath: string,
  fileName: string,
  type: 'ai' | 'aicf'
): Promise<FileStats> {
  const content = await readFile(filePath);
  const words = countWords(content);
  const lines = countLines(content);
  const tokens = estimateTokens(content);

  const category = type === 'aicf' ? 'aicf' : (FILE_CATEGORIES[fileName] ?? 'core');

  return {
    path: filePath,
    name: fileName,
    words,
    lines,
    tokens,
    category: category as FileStats['category'],
    exists: true,
  };
}

/**
 * Counts words in text
 */
function countWords(text: string): number {
  if (!text || text.trim().length === 0) {
    return 0;
  }
  return text.trim().split(/\s+/).length;
}

/**
 * Counts lines in text
 */
function countLines(text: string): number {
  if (!text) {
    return 0;
  }
  return text.split('\n').length;
}

/**
 * Estimates tokens using word count approximation
 * Rule of thumb: 1 token ≈ 0.75 words (or 1.33 tokens per word)
 */
function estimateTokens(text: string): number {
  const words = countWords(text);
  return Math.ceil(words * 1.33);
}

/**
 * Calculates total usage from file stats
 */
function calculateUsage(files: FileStats[]): TokenUsage {
  const totalWords = files.reduce((sum, f) => sum + f.words, 0);
  const totalLines = files.reduce((sum, f) => sum + f.lines, 0);
  const totalTokens = files.reduce((sum, f) => sum + f.tokens, 0);

  const byCategory: Record<string, number> = {};
  for (const file of files) {
    byCategory[file.category] = (byCategory[file.category] ?? 0) + file.tokens;
  }

  const recommendations = generateRecommendations(totalTokens, files);

  return {
    total: totalTokens,
    totalWords,
    totalLines,
    byCategory,
    files,
    recommendations,
  };
}

/**
 * Generates recommendations based on token usage
 */
function generateRecommendations(totalTokens: number, files: FileStats[]): string[] {
  const recommendations: string[] = [];

  if (totalTokens > 50000) {
    recommendations.push('Consider archiving old conversation logs to reduce token usage');
  }

  if (totalTokens > 100000) {
    recommendations.push(
      'Token usage is very high - consider splitting into multiple knowledge bases'
    );
  }

  const largeFiles = files.filter((f) => f.tokens > 10000);
  if (largeFiles.length > 0) {
    recommendations.push(`Large files detected: ${largeFiles.map((f) => f.name).join(', ')}`);
  }

  if (recommendations.length === 0) {
    recommendations.push('Token usage is within normal range');
  }

  return recommendations;
}

/**
 * Displays token usage results
 */
function displayResults(usage: TokenUsage, verbose: boolean): void {
  logger.newline();
  logger.heading('Token Usage Analysis');
  logger.newline();

  logger.info(`Total tokens: ${usage.total.toLocaleString()}`);
  logger.info(`Total words: ${usage.totalWords.toLocaleString()}`);
  logger.info(`Total lines: ${usage.totalLines.toLocaleString()}`);
  logger.newline();

  if (verbose) {
    logger.heading('By Category');
    logger.newline();
    for (const [category, tokens] of Object.entries(usage.byCategory)) {
      logger.info(`  ${category}: ${tokens.toLocaleString()} tokens`);
    }
    logger.newline();

    logger.heading('Files');
    logger.newline();
    for (const file of usage.files) {
      logger.dim(`  ${file.name}: ${file.tokens.toLocaleString()} tokens`);
    }
    logger.newline();
  }

  logger.heading('Recommendations');
  logger.newline();
  for (const rec of usage.recommendations) {
    logger.dim(`  • ${rec}`);
  }
  logger.newline();
}
