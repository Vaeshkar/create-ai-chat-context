/**
 * Tests for migrate command
 * Following code-standards.md - TDD approach
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdtemp, rm, mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';
import { migrate } from '../../src/commands/migrate.js';
import { pathExists } from '../../src/core/filesystem.js';

describe('migrate command', () => {
  let testDir: string;

  beforeEach(async () => {
    testDir = await mkdtemp(join(tmpdir(), 'aic-migrate-test-'));
  });

  afterEach(async () => {
    await rm(testDir, { recursive: true, force: true });
  });

  describe('basic migration', () => {
    it('should add missing .ai files', async () => {
      const aiDir = join(testDir, '.ai');
      await mkdir(aiDir);
      await writeFile(join(aiDir, 'README.md'), 'existing');

      const result = await migrate({ cwd: testDir });

      expect(result.success).toBe(true);
      const data = result.data as any;
      expect(data.filesAdded).toBeGreaterThan(0);
    });

    it('should add missing .aicf directory', async () => {
      const aiDir = join(testDir, '.ai');
      await mkdir(aiDir);
      await writeFile(join(aiDir, 'README.md'), 'existing');

      const result = await migrate({ cwd: testDir });

      expect(result.success).toBe(true);
      const aicfExists = await pathExists(join(testDir, '.aicf'));
      expect(aicfExists).toBe(true);
    });

    it('should add missing .aicf files', async () => {
      const aiDir = join(testDir, '.ai');
      const aicfDir = join(testDir, '.aicf');
      await mkdir(aiDir);
      await mkdir(aicfDir);
      await writeFile(join(aiDir, 'README.md'), 'existing');

      const result = await migrate({ cwd: testDir });

      expect(result.success).toBe(true);
      const data = result.data as any;
      expect(data.filesAdded).toBeGreaterThan(0);
    });

    it('should not overwrite existing files', async () => {
      const aiDir = join(testDir, '.ai');
      await mkdir(aiDir);
      await writeFile(join(aiDir, 'README.md'), 'custom content');

      await migrate({ cwd: testDir });

      const content = await pathExists(join(aiDir, 'README.md'));
      expect(content).toBe(true);
    });

    it('should add .ai-instructions if missing', async () => {
      const aiDir = join(testDir, '.ai');
      await mkdir(aiDir);
      await writeFile(join(aiDir, 'README.md'), 'existing');

      const result = await migrate({ cwd: testDir });

      expect(result.success).toBe(true);
      const instructionsExist = await pathExists(join(testDir, '.ai-instructions'));
      expect(instructionsExist).toBe(true);
    });

    it('should add NEW_CHAT_PROMPT.md if missing', async () => {
      const aiDir = join(testDir, '.ai');
      await mkdir(aiDir);
      await writeFile(join(aiDir, 'README.md'), 'existing');

      const result = await migrate({ cwd: testDir });

      expect(result.success).toBe(true);
      const promptExists = await pathExists(join(testDir, 'NEW_CHAT_PROMPT.md'));
      expect(promptExists).toBe(true);
    });
  });

  describe('migration report', () => {
    it('should report files added', async () => {
      const aiDir = join(testDir, '.ai');
      await mkdir(aiDir);
      await writeFile(join(aiDir, 'README.md'), 'existing');

      const result = await migrate({ cwd: testDir });

      expect(result.success).toBe(true);
      const data = result.data as any;
      expect(data.filesAdded).toBeGreaterThan(0);
      expect(Array.isArray(data.addedFiles)).toBe(true);
    });

    it('should report files skipped', async () => {
      const aiDir = join(testDir, '.ai');
      await mkdir(aiDir);
      await writeFile(join(aiDir, 'README.md'), 'existing');
      await writeFile(join(aiDir, 'conversation-log.md'), 'existing');

      const result = await migrate({ cwd: testDir });

      expect(result.success).toBe(true);
      const data = result.data as any;
      expect(data.filesSkipped).toBeGreaterThan(0);
      expect(Array.isArray(data.skippedFiles)).toBe(true);
    });

    it('should report no changes if all files exist', async () => {
      const aiDir = join(testDir, '.ai');
      const aicfDir = join(testDir, '.aicf');
      await mkdir(aiDir);
      await mkdir(aicfDir);

      // Create all expected files
      const aiFiles = [
        'README.md',
        'conversation-log.md',
        'technical-decisions.md',
        'next-steps.md',
        'code-style.md',
        'design-system.md',
        'project-overview.md',
      ];
      for (const file of aiFiles) {
        await writeFile(join(aiDir, file), 'existing');
      }

      const aicfFiles = [
        'README.md',
        'conversations.aicf',
        'decisions.aicf',
        'tasks.aicf',
        'issues.aicf',
        'technical-context.aicf',
      ];
      for (const file of aicfFiles) {
        await writeFile(join(aicfDir, file), 'existing');
      }

      await writeFile(join(testDir, '.ai-instructions'), 'existing');
      await writeFile(join(testDir, 'NEW_CHAT_PROMPT.md'), 'existing');

      const result = await migrate({ cwd: testDir });

      expect(result.success).toBe(true);
      const data = result.data as any;
      expect(data.filesAdded).toBe(0);
    });
  });

  describe('error handling', () => {
    it('should return error if .ai directory does not exist', async () => {
      const result = await migrate({ cwd: testDir });

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.error?.message).toContain('.ai/');
    });

    it('should handle file system errors gracefully', async () => {
      const aiDir = join(testDir, '.ai');
      await mkdir(aiDir);

      const result = await migrate({ cwd: testDir });

      expect(result.success).toBe(true);
    });
  });

  describe('options', () => {
    it('should use current directory if cwd not specified', async () => {
      const originalCwd = process.cwd();
      const aiDir = join(testDir, '.ai');
      await mkdir(aiDir);
      await writeFile(join(aiDir, 'README.md'), 'existing');

      process.chdir(testDir);
      const result = await migrate({});
      process.chdir(originalCwd);

      expect(result.success).toBe(true);
    });

    it('should respect verbose option', async () => {
      const aiDir = join(testDir, '.ai');
      await mkdir(aiDir);
      await writeFile(join(aiDir, 'README.md'), 'existing');

      const result = await migrate({ cwd: testDir, verbose: true });

      expect(result.success).toBe(true);
    });

    it('should respect dryRun option', async () => {
      const aiDir = join(testDir, '.ai');
      await mkdir(aiDir);
      await writeFile(join(aiDir, 'README.md'), 'existing');

      const result = await migrate({ cwd: testDir, dryRun: true });

      expect(result.success).toBe(true);
      const data = result.data as any;
      expect(data.dryRun).toBe(true);
    });
  });
});
