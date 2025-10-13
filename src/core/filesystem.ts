/**
 * Filesystem utility for file operations
 * Following code-standards.md - October 2025
 */

import {
  access,
  readFile as fsReadFile,
  writeFile as fsWriteFile,
  copyFile as fsCopyFile,
  mkdir,
  readdir,
  rm,
} from 'fs/promises';
import { FileOperationError } from '../types/errors.js';

/**
 * Checks if a path exists
 *
 * @param path - The path to check
 * @returns True if path exists, false otherwise
 *
 * @example
 * ```typescript
 * const exists = await pathExists('./file.txt');
 * if (exists) {
 *   console.log('File exists!');
 * }
 * ```
 */
export async function pathExists(path: string): Promise<boolean> {
  if (!path || path.trim().length === 0) {
    return false;
  }

  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

/**
 * Reads a file and returns its content as a string
 *
 * @param path - The file path to read
 * @returns The file content as UTF-8 string
 * @throws {FileOperationError} When file cannot be read
 *
 * @example
 * ```typescript
 * const content = await readFile('./config.json');
 * const config = JSON.parse(content);
 * ```
 */
export async function readFile(path: string): Promise<string> {
  try {
    const content = await fsReadFile(path, 'utf-8');
    return content;
  } catch (error) {
    throw new FileOperationError('read', path, error as Error);
  }
}

/**
 * Writes content to a file
 *
 * @param path - The file path to write to
 * @param content - The content to write
 * @throws {FileOperationError} When file cannot be written
 *
 * @example
 * ```typescript
 * await writeFileContent('./output.txt', 'Hello, World!');
 * ```
 */
export async function writeFileContent(path: string, content: string): Promise<void> {
  try {
    await fsWriteFile(path, content, 'utf-8');
  } catch (error) {
    throw new FileOperationError('write', path, error as Error);
  }
}

/**
 * Copies a file from source to destination
 *
 * @param src - The source file path
 * @param dest - The destination file path
 * @throws {FileOperationError} When file cannot be copied
 *
 * @example
 * ```typescript
 * await copyFile('./template.txt', './output.txt');
 * ```
 */
export async function copyFile(src: string, dest: string): Promise<void> {
  try {
    await fsCopyFile(src, dest);
  } catch (error) {
    throw new FileOperationError('copy', src, error as Error);
  }
}

/**
 * Ensures a directory exists, creating it if necessary
 *
 * @param path - The directory path to ensure
 * @throws {FileOperationError} When directory cannot be created
 *
 * @example
 * ```typescript
 * await ensureDir('./output/logs');
 * // Directory now exists, even if it didn't before
 * ```
 */
export async function ensureDir(path: string): Promise<void> {
  try {
    await mkdir(path, { recursive: true });
  } catch (error) {
    throw new FileOperationError('create directory', path, error as Error);
  }
}

/**
 * Reads a directory and returns its contents
 *
 * @param path - The directory path to read
 * @returns Array of file and directory names
 * @throws {FileOperationError} When directory cannot be read
 *
 * @example
 * ```typescript
 * const files = await readDir('./src');
 * console.log('Files:', files);
 * ```
 */
export async function readDir(path: string): Promise<string[]> {
  try {
    const contents = await readdir(path);
    return contents;
  } catch (error) {
    throw new FileOperationError('read directory', path, error as Error);
  }
}

/**
 * Removes a file or directory
 *
 * @param path - The path to remove
 * @throws {FileOperationError} When path cannot be removed
 *
 * @example
 * ```typescript
 * await removeFile('./temp.txt');
 * // File is now deleted
 * ```
 */
export async function removeFile(path: string): Promise<void> {
  try {
    await rm(path, { recursive: true, force: true });
  } catch (error) {
    throw new FileOperationError('remove', path, error as Error);
  }
}
