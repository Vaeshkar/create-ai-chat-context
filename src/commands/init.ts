/**
 * Init command - Initialize .ai/ and .aicf/ knowledge base
 * Following code-standards.md - October 2025
 */

import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import type { CommandOptions, CommandResult } from '../types/index.js';
import { pathExists, ensureDir, copyFile } from '../core/filesystem.js';
import { logger } from '../utils/logger.js';
import { createSpinner } from '../utils/spinner.js';
import { AiDirectoryExistsError } from '../types/errors.js';

// Get __dirname equivalent for both ESM and CJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Template files to copy to .ai/ directory
 */
const AI_TEMPLATE_FILES = [
  'README.md',
  'conversation-log.md',
  'technical-decisions.md',
  'next-steps.md',
  'code-style.md',
  'design-system.md',
  'project-overview.md',
] as const;

/**
 * Template files to copy to .aicf/ directory
 */
const AICF_TEMPLATE_FILES = [
  'README.md',
  'conversations.aicf',
  'decisions.aicf',
  'tasks.aicf',
  'issues.aicf',
  'technical-context.aicf',
] as const;

/**
 * Initializes AI knowledge base in the project
 *
 * @param options - Command options
 * @returns Command result with success status
 *
 * @example
 * ```typescript
 * const result = await init({ cwd: '/path/to/project' });
 * if (result.success) {
 *   console.log('Initialized!');
 * }
 * ```
 */
export async function init(options: CommandOptions = {}): Promise<CommandResult> {
  const cwd = options.cwd ?? process.cwd();
  const force = options.force ?? false;
  const verbose = options.verbose ?? false;
  const dryRun = options.dryRun ?? false;

  try {
    const aiDir = join(cwd, '.ai');
    const aicfDir = join(cwd, '.aicf');
    const aiInstructions = join(cwd, '.ai-instructions');
    const newChatPrompt = join(cwd, 'NEW_CHAT_PROMPT.md');

    if (verbose) {
      logger.info(`Initializing in: ${cwd}`);
    }

    // Check if already initialized
    if (!force) {
      await checkNotInitialized(aiDir, aiInstructions);
    }

    if (dryRun) {
      logger.info('Dry run - no files will be created');
      return { success: true, message: 'Dry run completed' };
    }

    // Create directories
    const spinner = createSpinner('Creating directory structure...').start();

    await ensureDir(aiDir);
    spinner.text('Created .ai/ directory');

    await ensureDir(aicfDir);
    spinner.succeed('Created directories');

    // Copy template files
    spinner.text('Copying template files...').start();

    const templatesDir = getTemplatesDir();
    await copyTemplateFiles(templatesDir, aiDir, aicfDir, aiInstructions, newChatPrompt);

    spinner.succeed('Copied all template files');

    logger.newline();
    logger.success('AI knowledge base initialized!');
    logger.newline();
    logger.info('Next steps:');
    logger.dim('  1. Review .ai/README.md for instructions');
    logger.dim('  2. Customize files in .ai/ for your project');
    logger.dim('  3. Read .ai-instructions for AI assistant guidelines');
    logger.newline();

    return {
      success: true,
      message: 'AI knowledge base initialized successfully',
    };
  } catch (error) {
    logger.error('Failed to initialize', error as Error);

    return {
      success: false,
      error: error as Error,
    };
  }
}

/**
 * Checks if project is not already initialized
 */
async function checkNotInitialized(aiDir: string, aiInstructions: string): Promise<void> {
  const aiExists = await pathExists(aiDir);
  const instructionsExist = await pathExists(aiInstructions);

  if (aiExists) {
    throw new AiDirectoryExistsError(aiDir);
  }

  if (instructionsExist) {
    throw new AiDirectoryExistsError(aiInstructions);
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
 * Copies all template files to their destinations
 */
async function copyTemplateFiles(
  templatesDir: string,
  aiDir: string,
  aicfDir: string,
  aiInstructions: string,
  newChatPrompt: string
): Promise<void> {
  // Copy .ai template files
  for (const file of AI_TEMPLATE_FILES) {
    const src = join(templatesDir, 'ai', file);
    const dest = join(aiDir, file);
    await copyFile(src, dest);
  }

  // Copy .aicf template files
  for (const file of AICF_TEMPLATE_FILES) {
    const src = join(templatesDir, 'aicf', file);
    const dest = join(aicfDir, file);
    await copyFile(src, dest);
  }

  // Copy root files
  await copyFile(join(templatesDir, 'ai-instructions.md'), aiInstructions);
  await copyFile(join(templatesDir, 'NEW_CHAT_PROMPT.md'), newChatPrompt);
}
