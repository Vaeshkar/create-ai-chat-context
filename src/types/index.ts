/**
 * Core type definitions for create-ai-chat-context
 * October 2025 - TypeScript/ESM
 */

/**
 * Command options passed from CLI
 */
export interface CommandOptions {
  cwd?: string;
  template?: string;
  force?: boolean;
  verbose?: boolean;
  dryRun?: boolean;
}

/**
 * File statistics for token counting
 */
export interface FileStats {
  path: string;
  name: string;
  words: number;
  lines: number;
  tokens: number;
  category: 'entry' | 'core' | 'history' | 'planning' | 'aicf';
  exists: boolean;
  lastModified?: Date;
}

/**
 * Token usage summary
 */
export interface TokenUsage {
  total: number;
  totalWords: number;
  totalLines: number;
  byCategory: Record<string, number>;
  files: FileStats[];
  recommendations: string[];
}

/**
 * Knowledge base statistics
 */
export interface KnowledgeBaseStats {
  totalFiles: number;
  totalWords: number;
  totalLines: number;
  totalTokens: number;
  conversationEntries: number;
  lastModified: Date | null;
  mostActiveFile: {
    name: string;
    words: number;
  };
  files: Array<{
    name: string;
    words: number;
    lines: number;
    tokens: number;
    lastModified?: Date;
  }>;
}

/**
 * Migration result information
 */
export interface MigrationResult {
  filesAdded: number;
  filesSkipped: number;
  addedFiles: string[];
  skippedFiles: string[];
  dryRun: boolean;
}

/**
 * Template information
 */
export interface Template {
  key: string;
  name: string;
  description: string;
  path: string;
}

/**
 * Project detection result
 */
export interface ProjectInfo {
  type: string;
  framework?: string;
  language?: string;
  packageManager?: string;
  hasTests?: boolean;
}

/**
 * Migration status
 */
export interface MigrationStatus {
  hasAiDir: boolean;
  hasAicfDir: boolean;
  missingAiFiles: string[];
  missingAicfFiles: string[];
  existingAiFiles: string[];
  existingAicfFiles: string[];
  needsMigration: boolean;
}

/**
 * Result of a command execution
 */
export interface CommandResult {
  success: boolean;
  message?: string;
  error?: Error;
  data?: unknown;
}
