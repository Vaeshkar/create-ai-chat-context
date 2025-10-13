/**
 * Public API for create-ai-chat-context
 * Following code-standards.md - October 2025
 *
 * Note: This package is primarily a CLI tool.
 * Commands are available via CLI only (ESM).
 * This exports types and utilities for programmatic use.
 */

// Types
export type {
  CommandOptions,
  CommandResult,
  FileStats,
  TokenUsage,
  KnowledgeBaseStats,
  MigrationResult,
  Template,
} from './types/index.js';

// Errors
export {
  AppError,
  FileOperationError,
  AiDirectoryNotFoundError,
  AiDirectoryExistsError,
} from './types/errors.js';

// Core utilities (for programmatic use)
export {
  pathExists,
  readFile,
  writeFileContent,
  copyFile,
  ensureDir,
  readDir,
  removeFile,
} from './core/filesystem.js';

// Utilities (for programmatic use)
export { logger } from './utils/logger.js';
export { createSpinner } from './utils/spinner.js';
export type { Spinner } from './utils/spinner.js';
