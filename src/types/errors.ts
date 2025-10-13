/**
 * Custom error types for better error handling
 * October 2025 - TypeScript/ESM
 */

/**
 * Base error class for all application errors
 */
export class AppError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly details?: unknown
  ) {
    super(message);
    this.name = 'AppError';
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error when .ai directory is not found
 */
export class AiDirectoryNotFoundError extends AppError {
  constructor(path: string) {
    super(`No .ai/ directory found at ${path}`, 'AI_DIR_NOT_FOUND', { path });
    this.name = 'AiDirectoryNotFoundError';
  }
}

/**
 * Error when template is not found
 */
export class TemplateNotFoundError extends AppError {
  constructor(templateName: string, availableTemplates: string[]) {
    super(`Template "${templateName}" not found`, 'TEMPLATE_NOT_FOUND', {
      templateName,
      availableTemplates,
    });
    this.name = 'TemplateNotFoundError';
  }
}

/**
 * Error when file operation fails
 */
export class FileOperationError extends AppError {
  constructor(operation: string, path: string, cause?: Error) {
    super(`Failed to ${operation} file: ${path}`, 'FILE_OPERATION_ERROR', {
      operation,
      path,
      cause,
    });
    this.name = 'FileOperationError';
  }
}

/**
 * Error thrown when .ai directory already exists
 */
export class AiDirectoryExistsError extends AppError {
  constructor(path: string) {
    super(`.ai/ directory already exists at ${path}. Use --force to overwrite.`, 'AI_DIR_EXISTS', {
      path,
    });
    this.name = 'AiDirectoryExistsError';
  }
}

/**
 * Error when directory already exists
 */
export class DirectoryExistsError extends AppError {
  constructor(path: string) {
    super(`Directory already exists: ${path}`, 'DIRECTORY_EXISTS', { path });
    this.name = 'DirectoryExistsError';
  }
}

/**
 * Type guard to check if error is an AppError
 */
export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

/**
 * Format error for display to user
 */
export function formatError(error: unknown): string {
  if (isAppError(error)) {
    return `${error.message} (${error.code})`;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
}
