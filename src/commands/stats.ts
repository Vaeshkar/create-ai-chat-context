/**
 * Stats command - Show knowledge base statistics
 * Following code-standards.md - October 2025
 */

import { join } from 'path';
import { stat } from 'fs/promises';
import type {
  CommandOptions,
  CommandResult,
  KnowledgeBaseStats,
  FileStats,
} from '../types/index.js';
import { pathExists, readFile, readDir } from '../core/filesystem.js';
import { logger } from '../utils/logger.js';
import { createSpinner } from '../utils/spinner.js';
import { AiDirectoryNotFoundError } from '../types/errors.js';

/**
 * Shows knowledge base statistics
 *
 * @param options - Command options
 * @returns Command result with statistics data
 *
 * @example
 * ```typescript
 * const result = await stats({ cwd: '/path/to/project' });
 * if (result.success) {
 *   console.log('Total files:', result.data.totalFiles);
 * }
 * ```
 */
export async function stats(options: CommandOptions = {}): Promise<CommandResult> {
  const cwd = options.cwd ?? process.cwd();
  const verbose = options.verbose ?? false;

  try {
    const aiDir = join(cwd, '.ai');
    const aicfDir = join(cwd, '.aicf');

    if (verbose) {
      logger.info(`Analyzing knowledge base in: ${cwd}`);
    }

    // Check if .ai directory exists
    const aiExists = await pathExists(aiDir);
    if (!aiExists) {
      throw new AiDirectoryNotFoundError(aiDir);
    }

    const spinner = createSpinner('Gathering statistics...').start();

    // Collect file stats
    const files: FileStats[] = [];

    // Analyze .ai directory
    const aiFiles = await analyzeDirectory(aiDir);
    files.push(...aiFiles);

    // Analyze .aicf directory if it exists
    const aicfExists = await pathExists(aicfDir);
    if (aicfExists) {
      const aicfFiles = await analyzeDirectory(aicfDir);
      files.push(...aicfFiles);
    }

    spinner.succeed('Statistics gathered');

    // Calculate statistics
    const statistics = await calculateStats(files, aiDir);

    // Display results
    displayStats(statistics, verbose);

    return {
      success: true,
      message: 'Statistics gathered successfully',
      data: statistics,
    };
  } catch (error) {
    logger.error('Failed to gather statistics', error as Error);

    return {
      success: false,
      error: error as Error,
    };
  }
}

/**
 * Analyzes all files in a directory
 */
async function analyzeDirectory(dirPath: string): Promise<FileStats[]> {
  const files: FileStats[] = [];
  const entries = await readDir(dirPath);

  for (const entry of entries) {
    const filePath = join(dirPath, entry);
    const fileStats = await analyzeFile(filePath, entry);
    files.push(fileStats);
  }

  return files;
}

/**
 * Analyzes a single file
 */
async function analyzeFile(filePath: string, fileName: string): Promise<FileStats> {
  const content = await readFile(filePath);
  const words = countWords(content);
  const lines = countLines(content);
  const tokens = estimateTokens(content);

  const fileStat = await stat(filePath);

  return {
    path: filePath,
    name: fileName,
    words,
    lines,
    tokens,
    category: categorizeFile(fileName),
    exists: true,
    lastModified: fileStat.mtime,
  };
}

/**
 * Categorizes a file based on its name
 */
function categorizeFile(fileName: string): FileStats['category'] {
  if (fileName === 'README.md' || fileName === 'project-overview.md') {
    return 'entry';
  }
  if (fileName === 'conversation-log.md') {
    return 'history';
  }
  if (fileName === 'next-steps.md') {
    return 'planning';
  }
  if (fileName.endsWith('.aicf')) {
    return 'aicf';
  }
  return 'core';
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
 */
function estimateTokens(text: string): number {
  const words = countWords(text);
  return Math.ceil(words * 1.33);
}

/**
 * Calculates statistics from file stats
 */
async function calculateStats(files: FileStats[], aiDir: string): Promise<KnowledgeBaseStats> {
  const totalFiles = files.length;
  const totalWords = files.reduce((sum, f) => sum + f.words, 0);
  const totalLines = files.reduce((sum, f) => sum + f.lines, 0);
  const totalTokens = files.reduce((sum, f) => sum + f.tokens, 0);

  // Find most active file
  const mostActiveFile =
    files.length > 0
      ? files.reduce<FileStats>((max, f) => (f.words > max.words ? f : max), files[0] as FileStats)
      : {
          name: '',
          words: 0,
          lines: 0,
          tokens: 0,
          category: 'core' as const,
          exists: false,
          path: '',
        };

  // Find last modified date
  const lastModified =
    files.length > 0
      ? files.reduce<Date | null>((latest, f) => {
          if (!f.lastModified) return latest;
          if (!latest) return f.lastModified;
          return f.lastModified > latest ? f.lastModified : latest;
        }, null)
      : null;

  // Count conversation entries
  const conversationEntries = await countConversationEntries(aiDir);

  return {
    totalFiles,
    totalWords,
    totalLines,
    totalTokens,
    conversationEntries,
    lastModified,
    mostActiveFile: {
      name: mostActiveFile.name,
      words: mostActiveFile.words,
    },
    files: files.map((f) => ({
      name: f.name,
      words: f.words,
      lines: f.lines,
      tokens: f.tokens,
      lastModified: f.lastModified,
    })),
  };
}

/**
 * Counts conversation entries in conversation-log.md
 */
async function countConversationEntries(aiDir: string): Promise<number> {
  const conversationLogPath = join(aiDir, 'conversation-log.md');
  const exists = await pathExists(conversationLogPath);

  if (!exists) {
    return 0;
  }

  const content = await readFile(conversationLogPath);
  // Count markdown headers (## Date format)
  const matches = content.match(/^##\s+/gm);
  return matches ? matches.length : 0;
}

/**
 * Displays statistics
 */
function displayStats(stats: KnowledgeBaseStats, verbose: boolean): void {
  logger.newline();
  logger.heading('Knowledge Base Statistics');
  logger.newline();

  logger.info(`Total files: ${String(stats.totalFiles)}`);
  logger.info(`Total words: ${stats.totalWords.toLocaleString()}`);
  logger.info(`Total lines: ${stats.totalLines.toLocaleString()}`);
  logger.info(`Total tokens: ${stats.totalTokens.toLocaleString()}`);
  logger.info(`Conversation entries: ${String(stats.conversationEntries)}`);
  logger.newline();

  logger.info(
    `Most active file: ${stats.mostActiveFile.name} (${String(stats.mostActiveFile.words)} words)`
  );

  if (stats.lastModified) {
    logger.info(`Last modified: ${stats.lastModified.toLocaleDateString()}`);
  }

  if (verbose && stats.files.length > 0) {
    logger.newline();
    logger.heading('Files');
    logger.newline();

    for (const file of stats.files) {
      const modified = file.lastModified ? file.lastModified.toLocaleDateString() : 'unknown';
      logger.dim(
        `  ${file.name}: ${String(file.words)} words, ${String(file.tokens)} tokens (${modified})`
      );
    }
  }

  logger.newline();
}
