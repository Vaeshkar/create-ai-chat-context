/**
 * Migrate command - Update existing installations
 * Following code-standards.md - October 2025
 */

import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import type { CommandOptions, CommandResult, MigrationResult } from '../types/index.js';
import { pathExists, ensureDir, copyFile } from '../core/filesystem.js';
import { logger } from '../utils/logger.js';
import { createSpinner } from '../utils/spinner.js';
import { AiDirectoryNotFoundError } from '../types/errors.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const AI_TEMPLATE_FILES = [
  'README.md',
  'conversation-log.md',
  'technical-decisions.md',
  'next-steps.md',
  'code-style.md',
  'design-system.md',
  'project-overview.md',
] as const;

const AICF_TEMPLATE_FILES = [
  'README.md',
  'conversations.aicf',
  'decisions.aicf',
  'tasks.aicf',
  'issues.aicf',
  'technical-context.aicf',
] as const;

/**
 * Migrates existing installation to latest version
 *
 * @param options - Command options
 * @returns Command result with migration data
 *
 * @example
 * ```typescript
 * const result = await migrate({ cwd: '/path/to/project' });
 * if (result.success) {
 *   console.log('Files added:', result.data.filesAdded);
 * }
 * ```
 */
export async function migrate(options: CommandOptions = {}): Promise<CommandResult> {
  const cwd = options.cwd ?? process.cwd();
  const verbose = options.verbose ?? false;
  const dryRun = options.dryRun ?? false;

  try {
    const aiDir = join(cwd, '.ai');
    const aicfDir = join(cwd, '.aicf');
    const aiInstructions = join(cwd, '.ai-instructions');
    const newChatPrompt = join(cwd, 'NEW_CHAT_PROMPT.md');

    if (verbose) {
      logger.info(`Migrating knowledge base in: ${cwd}`);
    }

    // Check if .ai directory exists
    const aiExists = await pathExists(aiDir);
    if (!aiExists) {
      throw new AiDirectoryNotFoundError(aiDir);
    }

    const spinner = createSpinner('Checking for updates...').start();

    const addedFiles: string[] = [];
    const skippedFiles: string[] = [];

    // Ensure .aicf directory exists
    const aicfExists = await pathExists(aicfDir);
    if (!aicfExists) {
      if (!dryRun) {
        await ensureDir(aicfDir);
      }
      addedFiles.push('.aicf/');
    }

    // Get templates directory
    const templatesDir = getTemplatesDir();

    // Check and add missing .ai files
    await checkAndAddFiles(
      templatesDir,
      aiDir,
      'ai',
      AI_TEMPLATE_FILES,
      addedFiles,
      skippedFiles,
      dryRun
    );

    // Check and add missing .aicf files
    await checkAndAddFiles(
      templatesDir,
      aicfDir,
      'aicf',
      AICF_TEMPLATE_FILES,
      addedFiles,
      skippedFiles,
      dryRun
    );

    // Check and add .ai-instructions
    const instructionsExist = await pathExists(aiInstructions);
    if (!instructionsExist) {
      if (!dryRun) {
        await copyFile(join(templatesDir, 'ai-instructions.md'), aiInstructions);
      }
      addedFiles.push('.ai-instructions');
    } else {
      skippedFiles.push('.ai-instructions');
    }

    // Check and add NEW_CHAT_PROMPT.md
    const promptExists = await pathExists(newChatPrompt);
    if (!promptExists) {
      if (!dryRun) {
        await copyFile(join(templatesDir, 'NEW_CHAT_PROMPT.md'), newChatPrompt);
      }
      addedFiles.push('NEW_CHAT_PROMPT.md');
    } else {
      skippedFiles.push('NEW_CHAT_PROMPT.md');
    }

    spinner.succeed('Migration complete');

    // Display results
    displayResults(addedFiles, skippedFiles, dryRun, verbose);

    const migrationResult: MigrationResult = {
      filesAdded: addedFiles.length,
      filesSkipped: skippedFiles.length,
      addedFiles,
      skippedFiles,
      dryRun,
    };

    return {
      success: true,
      message: dryRun ? 'Dry run completed' : 'Migration completed successfully',
      data: migrationResult,
    };
  } catch (error) {
    logger.error('Failed to migrate', error as Error);

    return {
      success: false,
      error: error as Error,
    };
  }
}

/**
 * Gets the templates directory path
 * Works in both development and production
 */
function getTemplatesDir(): string {
  // In development: src/commands -> ../../templates
  // In production: dist/esm/commands -> ../../../templates
  // But we copy templates to dist/templates, so: dist/esm/commands -> ../../templates
  return join(__dirname, '..', '..', 'templates');
}

/**
 * Checks and adds missing files from templates
 */
async function checkAndAddFiles(
  templatesDir: string,
  targetDir: string,
  templateType: 'ai' | 'aicf',
  files: readonly string[],
  addedFiles: string[],
  skippedFiles: string[],
  dryRun: boolean
): Promise<void> {
  for (const file of files) {
    const targetPath = join(targetDir, file);
    const exists = await pathExists(targetPath);

    if (!exists) {
      if (!dryRun) {
        const sourcePath = join(templatesDir, templateType, file);
        await copyFile(sourcePath, targetPath);
      }
      addedFiles.push(`${templateType === 'ai' ? '.ai' : '.aicf'}/${file}`);
    } else {
      skippedFiles.push(`${templateType === 'ai' ? '.ai' : '.aicf'}/${file}`);
    }
  }
}

/**
 * Displays migration results
 */
function displayResults(
  addedFiles: string[],
  skippedFiles: string[],
  dryRun: boolean,
  verbose: boolean
): void {
  logger.newline();
  logger.heading('Migration Results');
  logger.newline();

  if (dryRun) {
    logger.warn('Dry run - no files were actually modified');
    logger.newline();
  }

  if (addedFiles.length > 0) {
    logger.success(`${String(addedFiles.length)} files would be added${dryRun ? '' : ' (added)'}`);
    if (verbose) {
      for (const file of addedFiles) {
        logger.dim(`  + ${file}`);
      }
    }
  } else {
    logger.info('No files need to be added');
  }

  if (verbose && skippedFiles.length > 0) {
    logger.newline();
    logger.info(`${String(skippedFiles.length)} files already exist (skipped)`);
    for (const file of skippedFiles) {
      logger.dim(`  ✓ ${file}`);
    }
  }

  logger.newline();

  if (addedFiles.length === 0) {
    logger.success('Knowledge base is up to date!');
  } else if (!dryRun) {
    logger.success('Migration completed successfully!');
  }

  logger.newline();
}
