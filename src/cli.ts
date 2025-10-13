#!/usr/bin/env node

/**
 * CLI entry point for create-ai-chat-context
 * Following code-standards.md - October 2025
 */

import { Command } from 'commander';
import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { init } from './commands/init.js';
import { migrate } from './commands/migrate.js';
import { tokens } from './commands/tokens.js';
import { stats } from './commands/stats.js';
import { logger } from './utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Gets package.json version
 */
async function getVersion(): Promise<string> {
  try {
    // In built version: dist/esm/cli.js -> ../../package.json
    const packageJsonPath = join(__dirname, '..', '..', 'package.json');
    const content = await readFile(packageJsonPath, 'utf-8');
    const pkg = JSON.parse(content) as { version: string };
    return pkg.version;
  } catch {
    return '2.0.0';
  }
}

/**
 * Main CLI function
 */
async function main(): Promise<void> {
  const version = await getVersion();
  const program = new Command();

  program
    .name('create-ai-chat-context')
    .description('Create and manage AI chat context knowledge bases')
    .version(version);

  // Init command
  program
    .command('init')
    .description('Initialize a new AI knowledge base')
    .option('-f, --force', 'Overwrite existing files')
    .option('-v, --verbose', 'Show detailed output')
    .option('-d, --dry-run', 'Show what would be created without creating files')
    .action(async (options: { force?: boolean; verbose?: boolean; dryRun?: boolean }) => {
      const result = await init({
        force: options.force,
        verbose: options.verbose,
        dryRun: options.dryRun,
      });

      if (!result.success) {
        process.exit(1);
      }
    });

  // Migrate command
  program
    .command('migrate')
    .description('Migrate existing installation to latest version')
    .option('-v, --verbose', 'Show detailed output')
    .option('-d, --dry-run', 'Show what would be changed without making changes')
    .action(async (options: { verbose?: boolean; dryRun?: boolean }) => {
      const result = await migrate({
        verbose: options.verbose,
        dryRun: options.dryRun,
      });

      if (!result.success) {
        process.exit(1);
      }
    });

  // Tokens command
  program
    .command('tokens')
    .description('Analyze token usage in knowledge base')
    .option('-v, --verbose', 'Show detailed breakdown by file')
    .action(async (options: { verbose?: boolean }) => {
      const result = await tokens({
        verbose: options.verbose,
      });

      if (!result.success) {
        process.exit(1);
      }
    });

  // Stats command
  program
    .command('stats')
    .description('Show knowledge base statistics')
    .option('-v, --verbose', 'Show detailed file list')
    .action(async (options: { verbose?: boolean }) => {
      const result = await stats({
        verbose: options.verbose,
      });

      if (!result.success) {
        process.exit(1);
      }
    });

  // Parse arguments
  await program.parseAsync(process.argv);
}

// Run CLI
main().catch((error: unknown) => {
  logger.error('Unexpected error', error as Error);
  process.exit(1);
});
