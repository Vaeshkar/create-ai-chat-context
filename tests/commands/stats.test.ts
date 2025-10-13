/**
 * Tests for stats command
 * Following code-standards.md - TDD approach
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdtemp, rm, mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';
import { stats } from '../../src/commands/stats.js';

describe('stats command', () => {
  let testDir: string;

  beforeEach(async () => {
    testDir = await mkdtemp(join(tmpdir(), 'aic-stats-test-'));
  });

  afterEach(async () => {
    await rm(testDir, { recursive: true, force: true });
  });

  describe('basic statistics', () => {
    it('should count total files', async () => {
      const aiDir = join(testDir, '.ai');
      await mkdir(aiDir);
      await writeFile(join(aiDir, 'file1.md'), 'content 1');
      await writeFile(join(aiDir, 'file2.md'), 'content 2');

      const result = await stats({ cwd: testDir });

      expect(result.success).toBe(true);
      const data = result.data as any;
      expect(data.totalFiles).toBe(2);
    });

    it('should count total words', async () => {
      const aiDir = join(testDir, '.ai');
      await mkdir(aiDir);
      await writeFile(join(aiDir, 'test.md'), 'one two three four five');

      const result = await stats({ cwd: testDir });

      expect(result.success).toBe(true);
      const data = result.data as any;
      expect(data.totalWords).toBe(5);
    });

    it('should count total lines', async () => {
      const aiDir = join(testDir, '.ai');
      await mkdir(aiDir);
      await writeFile(join(aiDir, 'test.md'), 'line1\nline2\nline3');

      const result = await stats({ cwd: testDir });

      expect(result.success).toBe(true);
      const data = result.data as any;
      expect(data.totalLines).toBe(3);
    });

    it('should estimate total tokens', async () => {
      const aiDir = join(testDir, '.ai');
      await mkdir(aiDir);
      await writeFile(join(aiDir, 'test.md'), 'Hello world');

      const result = await stats({ cwd: testDir });

      expect(result.success).toBe(true);
      const data = result.data as any;
      expect(data.totalTokens).toBeGreaterThan(0);
    });

    it('should include files from both .ai and .aicf', async () => {
      const aiDir = join(testDir, '.ai');
      const aicfDir = join(testDir, '.aicf');
      await mkdir(aiDir);
      await mkdir(aicfDir);
      await writeFile(join(aiDir, 'file1.md'), 'content');
      await writeFile(join(aicfDir, 'file2.aicf'), 'content');

      const result = await stats({ cwd: testDir });

      expect(result.success).toBe(true);
      const data = result.data as any;
      expect(data.totalFiles).toBe(2);
    });
  });

  describe('most active file', () => {
    it('should identify most active file by word count', async () => {
      const aiDir = join(testDir, '.ai');
      await mkdir(aiDir);
      await writeFile(join(aiDir, 'small.md'), 'one two');
      await writeFile(join(aiDir, 'large.md'), 'one two three four five six');

      const result = await stats({ cwd: testDir });

      expect(result.success).toBe(true);
      const data = result.data as any;
      expect(data.mostActiveFile.name).toBe('large.md');
      expect(data.mostActiveFile.words).toBe(6);
    });

    it('should handle single file', async () => {
      const aiDir = join(testDir, '.ai');
      await mkdir(aiDir);
      await writeFile(join(aiDir, 'only.md'), 'content');

      const result = await stats({ cwd: testDir });

      expect(result.success).toBe(true);
      const data = result.data as any;
      expect(data.mostActiveFile.name).toBe('only.md');
    });

    it('should handle empty files', async () => {
      const aiDir = join(testDir, '.ai');
      await mkdir(aiDir);
      await writeFile(join(aiDir, 'empty.md'), '');

      const result = await stats({ cwd: testDir });

      expect(result.success).toBe(true);
      const data = result.data as any;
      expect(data.mostActiveFile.name).toBe('empty.md');
      expect(data.mostActiveFile.words).toBe(0);
    });
  });

  describe('last modified', () => {
    it('should track last modified date', async () => {
      const aiDir = join(testDir, '.ai');
      await mkdir(aiDir);
      await writeFile(join(aiDir, 'test.md'), 'content');

      const result = await stats({ cwd: testDir });

      expect(result.success).toBe(true);
      const data = result.data as any;
      expect(data.lastModified).toBeInstanceOf(Date);
    });

    it('should return null for empty directory', async () => {
      const aiDir = join(testDir, '.ai');
      await mkdir(aiDir);

      const result = await stats({ cwd: testDir });

      expect(result.success).toBe(true);
      const data = result.data as any;
      expect(data.lastModified).toBeNull();
    });
  });

  describe('file details', () => {
    it('should include file details in verbose mode', async () => {
      const aiDir = join(testDir, '.ai');
      await mkdir(aiDir);
      await writeFile(join(aiDir, 'test.md'), 'content');

      const result = await stats({ cwd: testDir, verbose: true });

      expect(result.success).toBe(true);
      const data = result.data as any;
      expect(data.files).toBeDefined();
      expect(Array.isArray(data.files)).toBe(true);
      expect(data.files.length).toBe(1);
    });

    it('should include file stats', async () => {
      const aiDir = join(testDir, '.ai');
      await mkdir(aiDir);
      await writeFile(join(aiDir, 'test.md'), 'one two three');

      const result = await stats({ cwd: testDir, verbose: true });

      expect(result.success).toBe(true);
      const data = result.data as any;
      const file = data.files[0];
      expect(file.name).toBe('test.md');
      expect(file.words).toBe(3);
      expect(file.lines).toBeGreaterThan(0);
      expect(file.tokens).toBeGreaterThan(0);
    });
  });

  describe('error handling', () => {
    it('should return error if .ai directory does not exist', async () => {
      const result = await stats({ cwd: testDir });

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.error?.message).toContain('.ai/');
    });

    it('should handle empty .ai directory', async () => {
      const aiDir = join(testDir, '.ai');
      await mkdir(aiDir);

      const result = await stats({ cwd: testDir });

      expect(result.success).toBe(true);
      const data = result.data as any;
      expect(data.totalFiles).toBe(0);
      expect(data.totalWords).toBe(0);
    });
  });

  describe('options', () => {
    it('should use current directory if cwd not specified', async () => {
      const originalCwd = process.cwd();
      const aiDir = join(testDir, '.ai');
      await mkdir(aiDir);
      await writeFile(join(aiDir, 'test.md'), 'test');

      process.chdir(testDir);
      const result = await stats({});
      process.chdir(originalCwd);

      expect(result.success).toBe(true);
    });

    it('should respect verbose option', async () => {
      const aiDir = join(testDir, '.ai');
      await mkdir(aiDir);
      await writeFile(join(aiDir, 'test.md'), 'test');

      const result = await stats({ cwd: testDir, verbose: true });

      expect(result.success).toBe(true);
      const data = result.data as any;
      expect(data.files).toBeDefined();
    });
  });

  describe('conversation entries', () => {
    it('should count conversation entries', async () => {
      const aiDir = join(testDir, '.ai');
      await mkdir(aiDir);
      await writeFile(
        join(aiDir, 'conversation-log.md'),
        '## 2025-10-13\nEntry 1\n\n## 2025-10-12\nEntry 2'
      );

      const result = await stats({ cwd: testDir });

      expect(result.success).toBe(true);
      const data = result.data as any;
      expect(data.conversationEntries).toBeGreaterThan(0);
    });

    it('should return 0 if no conversation log exists', async () => {
      const aiDir = join(testDir, '.ai');
      await mkdir(aiDir);
      await writeFile(join(aiDir, 'other.md'), 'content');

      const result = await stats({ cwd: testDir });

      expect(result.success).toBe(true);
      const data = result.data as any;
      expect(data.conversationEntries).toBe(0);
    });
  });
});
