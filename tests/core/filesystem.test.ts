/**
 * Tests for filesystem utility
 * Following code-standards.md - TDD approach
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdtemp, rm, writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';
import {
  pathExists,
  readFile,
  writeFileContent,
  copyFile,
  ensureDir,
  readDir,
  removeFile,
} from '../../src/core/filesystem.js';

describe('filesystem', () => {
  let testDir: string;

  beforeEach(async () => {
    // Create a temporary directory for each test
    testDir = await mkdtemp(join(tmpdir(), 'aic-test-'));
  });

  afterEach(async () => {
    // Clean up temporary directory after each test
    await rm(testDir, { recursive: true, force: true });
  });

  describe('pathExists', () => {
    it('should return true for existing file', async () => {
      const filePath = join(testDir, 'test.txt');
      await writeFile(filePath, 'content');

      const exists = await pathExists(filePath);

      expect(exists).toBe(true);
    });

    it('should return true for existing directory', async () => {
      const dirPath = join(testDir, 'subdir');
      await mkdir(dirPath);

      const exists = await pathExists(dirPath);

      expect(exists).toBe(true);
    });

    it('should return false for non-existent path', async () => {
      const filePath = join(testDir, 'nonexistent.txt');

      const exists = await pathExists(filePath);

      expect(exists).toBe(false);
    });

    it('should return false for empty string', async () => {
      const exists = await pathExists('');

      expect(exists).toBe(false);
    });
  });

  describe('readFile', () => {
    it('should read file content', async () => {
      const filePath = join(testDir, 'test.txt');
      const content = 'Hello, World!';
      await writeFile(filePath, content);

      const result = await readFile(filePath);

      expect(result).toBe(content);
    });

    it('should read empty file', async () => {
      const filePath = join(testDir, 'empty.txt');
      await writeFile(filePath, '');

      const result = await readFile(filePath);

      expect(result).toBe('');
    });

    it('should throw FileOperationError for non-existent file', async () => {
      const filePath = join(testDir, 'nonexistent.txt');

      await expect(readFile(filePath)).rejects.toThrow('Failed to read file');
    });

    it('should read UTF-8 content correctly', async () => {
      const filePath = join(testDir, 'utf8.txt');
      const content = '你好世界 🌍';
      await writeFile(filePath, content, 'utf-8');

      const result = await readFile(filePath);

      expect(result).toBe(content);
    });
  });

  describe('writeFileContent', () => {
    it('should write file content', async () => {
      const filePath = join(testDir, 'test.txt');
      const content = 'Hello, World!';

      await writeFileContent(filePath, content);

      const result = await readFile(filePath);
      expect(result).toBe(content);
    });

    it('should overwrite existing file', async () => {
      const filePath = join(testDir, 'test.txt');
      await writeFile(filePath, 'old content');

      await writeFileContent(filePath, 'new content');

      const result = await readFile(filePath);
      expect(result).toBe('new content');
    });

    it('should write empty content', async () => {
      const filePath = join(testDir, 'empty.txt');

      await writeFileContent(filePath, '');

      const result = await readFile(filePath);
      expect(result).toBe('');
    });

    it('should throw FileOperationError for invalid path', async () => {
      const filePath = join(testDir, 'nonexistent', 'deep', 'test.txt');

      await expect(writeFileContent(filePath, 'content')).rejects.toThrow('Failed to write file');
    });
  });

  describe('copyFile', () => {
    it('should copy file', async () => {
      const srcPath = join(testDir, 'source.txt');
      const destPath = join(testDir, 'dest.txt');
      const content = 'Copy me!';
      await writeFile(srcPath, content);

      await copyFile(srcPath, destPath);

      const result = await readFile(destPath);
      expect(result).toBe(content);
    });

    it('should overwrite existing destination file', async () => {
      const srcPath = join(testDir, 'source.txt');
      const destPath = join(testDir, 'dest.txt');
      await writeFile(srcPath, 'new content');
      await writeFile(destPath, 'old content');

      await copyFile(srcPath, destPath);

      const result = await readFile(destPath);
      expect(result).toBe('new content');
    });

    it('should throw FileOperationError for non-existent source', async () => {
      const srcPath = join(testDir, 'nonexistent.txt');
      const destPath = join(testDir, 'dest.txt');

      await expect(copyFile(srcPath, destPath)).rejects.toThrow('Failed to copy file');
    });
  });

  describe('ensureDir', () => {
    it('should create directory', async () => {
      const dirPath = join(testDir, 'newdir');

      await ensureDir(dirPath);

      const exists = await pathExists(dirPath);
      expect(exists).toBe(true);
    });

    it('should create nested directories', async () => {
      const dirPath = join(testDir, 'a', 'b', 'c');

      await ensureDir(dirPath);

      const exists = await pathExists(dirPath);
      expect(exists).toBe(true);
    });

    it('should not throw if directory already exists', async () => {
      const dirPath = join(testDir, 'existing');
      await mkdir(dirPath);

      await expect(ensureDir(dirPath)).resolves.not.toThrow();
    });

    it('should handle empty string gracefully', async () => {
      await expect(ensureDir('')).rejects.toThrow();
    });
  });

  describe('readDir', () => {
    it('should read directory contents', async () => {
      const file1 = join(testDir, 'file1.txt');
      const file2 = join(testDir, 'file2.txt');
      await writeFile(file1, 'content1');
      await writeFile(file2, 'content2');

      const contents = await readDir(testDir);

      expect(contents).toHaveLength(2);
      expect(contents).toContain('file1.txt');
      expect(contents).toContain('file2.txt');
    });

    it('should return empty array for empty directory', async () => {
      const emptyDir = join(testDir, 'empty');
      await mkdir(emptyDir);

      const contents = await readDir(emptyDir);

      expect(contents).toHaveLength(0);
    });

    it('should throw FileOperationError for non-existent directory', async () => {
      const dirPath = join(testDir, 'nonexistent');

      await expect(readDir(dirPath)).rejects.toThrow('Failed to read directory');
    });
  });

  describe('removeFile', () => {
    it('should remove file', async () => {
      const filePath = join(testDir, 'test.txt');
      await writeFile(filePath, 'content');

      await removeFile(filePath);

      const exists = await pathExists(filePath);
      expect(exists).toBe(false);
    });

    it('should not throw if file does not exist', async () => {
      const filePath = join(testDir, 'nonexistent.txt');

      await expect(removeFile(filePath)).resolves.not.toThrow();
    });

    it('should remove directory recursively', async () => {
      const dirPath = join(testDir, 'subdir');
      const filePath = join(dirPath, 'file.txt');
      await mkdir(dirPath);
      await writeFile(filePath, 'content');

      await removeFile(dirPath);

      const exists = await pathExists(dirPath);
      expect(exists).toBe(false);
    });
  });
});
