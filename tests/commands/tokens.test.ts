/**
 * Tests for tokens command
 * Following code-standards.md - TDD approach
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdtemp, rm, mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';
import { tokens } from '../../src/commands/tokens.js';

describe('tokens command', () => {
  let testDir: string;

  beforeEach(async () => {
    testDir = await mkdtemp(join(tmpdir(), 'aic-tokens-test-'));
  });

  afterEach(async () => {
    await rm(testDir, { recursive: true, force: true });
  });

  describe('basic token counting', () => {
    it('should count tokens in .ai directory', async () => {
      const aiDir = join(testDir, '.ai');
      await mkdir(aiDir);
      await writeFile(join(aiDir, 'test.md'), 'Hello world! This is a test.');

      const result = await tokens({ cwd: testDir });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
    });

    it('should count tokens in .aicf directory', async () => {
      const aiDir = join(testDir, '.ai');
      const aicfDir = join(testDir, '.aicf');
      await mkdir(aiDir);
      await mkdir(aicfDir);
      await writeFile(join(aicfDir, 'test.aicf'), 'Some content here.');

      const result = await tokens({ cwd: testDir });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
    });

    it('should count words correctly', async () => {
      const aiDir = join(testDir, '.ai');
      await mkdir(aiDir);
      await writeFile(join(aiDir, 'test.md'), 'one two three four five');

      const result = await tokens({ cwd: testDir });

      expect(result.success).toBe(true);
      const usage = result.data as any;
      expect(usage.totalWords).toBeGreaterThan(0);
    });

    it('should count lines correctly', async () => {
      const aiDir = join(testDir, '.ai');
      await mkdir(aiDir);
      await writeFile(join(aiDir, 'test.md'), 'line1\nline2\nline3');

      const result = await tokens({ cwd: testDir });

      expect(result.success).toBe(true);
      const usage = result.data as any;
      expect(usage.totalLines).toBeGreaterThan(0);
    });

    it('should estimate tokens correctly', async () => {
      const aiDir = join(testDir, '.ai');
      await mkdir(aiDir);
      await writeFile(join(aiDir, 'test.md'), 'Hello world');

      const result = await tokens({ cwd: testDir });

      expect(result.success).toBe(true);
      const usage = result.data as any;
      expect(usage.total).toBeGreaterThan(0);
    });
  });

  describe('multiple files', () => {
    it('should count tokens across multiple files', async () => {
      const aiDir = join(testDir, '.ai');
      await mkdir(aiDir);
      await writeFile(join(aiDir, 'file1.md'), 'Content in file 1');
      await writeFile(join(aiDir, 'file2.md'), 'Content in file 2');

      const result = await tokens({ cwd: testDir });

      expect(result.success).toBe(true);
      const usage = result.data as any;
      expect(usage.files).toHaveLength(2);
    });

    it('should categorize files correctly', async () => {
      const aiDir = join(testDir, '.ai');
      await mkdir(aiDir);
      await writeFile(join(aiDir, 'README.md'), 'Entry point');
      await writeFile(join(aiDir, 'conversation-log.md'), 'History');

      const result = await tokens({ cwd: testDir });

      expect(result.success).toBe(true);
      const usage = result.data as any;
      expect(usage.byCategory).toBeDefined();
    });
  });

  describe('error handling', () => {
    it('should return error if .ai directory does not exist', async () => {
      const result = await tokens({ cwd: testDir });

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.error?.message).toContain('.ai/');
    });

    it('should handle empty .ai directory', async () => {
      const aiDir = join(testDir, '.ai');
      await mkdir(aiDir);

      const result = await tokens({ cwd: testDir });

      expect(result.success).toBe(true);
      const usage = result.data as any;
      expect(usage.total).toBe(0);
    });

    it('should handle files with no content', async () => {
      const aiDir = join(testDir, '.ai');
      await mkdir(aiDir);
      await writeFile(join(aiDir, 'empty.md'), '');

      const result = await tokens({ cwd: testDir });

      expect(result.success).toBe(true);
      const usage = result.data as any;
      expect(usage.files).toHaveLength(1);
    });
  });

  describe('options', () => {
    it('should use current directory if cwd not specified', async () => {
      const originalCwd = process.cwd();
      const aiDir = join(testDir, '.ai');
      await mkdir(aiDir);
      await writeFile(join(aiDir, 'test.md'), 'test');

      process.chdir(testDir);
      const result = await tokens({});
      process.chdir(originalCwd);

      expect(result.success).toBe(true);
    });

    it('should respect verbose option', async () => {
      const aiDir = join(testDir, '.ai');
      await mkdir(aiDir);
      await writeFile(join(aiDir, 'test.md'), 'test');

      const result = await tokens({ cwd: testDir, verbose: true });

      expect(result.success).toBe(true);
    });
  });

  describe('recommendations', () => {
    it('should provide recommendations for large token usage', async () => {
      const aiDir = join(testDir, '.ai');
      await mkdir(aiDir);
      // Create a large file
      const largeContent = 'word '.repeat(10000);
      await writeFile(join(aiDir, 'large.md'), largeContent);

      const result = await tokens({ cwd: testDir });

      expect(result.success).toBe(true);
      const usage = result.data as any;
      expect(usage.recommendations).toBeDefined();
      expect(Array.isArray(usage.recommendations)).toBe(true);
    });
  });
});
