/**
 * Tests for init command
 * Following code-standards.md - TDD approach
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdtemp, rm } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';
import { init } from '../../src/commands/init.js';
import { pathExists, readDir } from '../../src/core/filesystem.js';

describe('init command', () => {
  let testDir: string;

  beforeEach(async () => {
    // Create a temporary directory for each test
    testDir = await mkdtemp(join(tmpdir(), 'aic-init-test-'));
  });

  afterEach(async () => {
    // Clean up temporary directory after each test
    await rm(testDir, { recursive: true, force: true });
  });

  describe('basic initialization', () => {
    it('should create .ai directory', async () => {
      await init({ cwd: testDir });

      const aiDir = join(testDir, '.ai');
      const exists = await pathExists(aiDir);

      expect(exists).toBe(true);
    });

    it('should create .aicf directory', async () => {
      await init({ cwd: testDir });

      const aicfDir = join(testDir, '.aicf');
      const exists = await pathExists(aicfDir);

      expect(exists).toBe(true);
    });

    it('should copy .ai template files', async () => {
      await init({ cwd: testDir });

      const aiDir = join(testDir, '.ai');
      const files = await readDir(aiDir);

      expect(files).toContain('README.md');
      expect(files).toContain('conversation-log.md');
      expect(files).toContain('technical-decisions.md');
      expect(files).toContain('next-steps.md');
      expect(files).toContain('code-style.md');
      expect(files).toContain('design-system.md');
      expect(files).toContain('project-overview.md');
    });

    it('should copy .aicf template files', async () => {
      await init({ cwd: testDir });

      const aicfDir = join(testDir, '.aicf');
      const files = await readDir(aicfDir);

      expect(files).toContain('README.md');
      expect(files).toContain('conversations.aicf');
      expect(files).toContain('decisions.aicf');
      expect(files).toContain('tasks.aicf');
      expect(files).toContain('issues.aicf');
      expect(files).toContain('technical-context.aicf');
    });

    it('should copy .ai-instructions to root', async () => {
      await init({ cwd: testDir });

      const aiInstructions = join(testDir, '.ai-instructions');
      const exists = await pathExists(aiInstructions);

      expect(exists).toBe(true);
    });

    it('should copy NEW_CHAT_PROMPT.md to root', async () => {
      await init({ cwd: testDir });

      const newChatPrompt = join(testDir, 'NEW_CHAT_PROMPT.md');
      const exists = await pathExists(newChatPrompt);

      expect(exists).toBe(true);
    });
  });

  describe('error handling', () => {
    it('should return error if .ai directory already exists without force', async () => {
      await init({ cwd: testDir });

      const result = await init({ cwd: testDir, force: false });

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.error?.message).toContain('.ai/ directory already exists');
    });

    it('should overwrite if force option is true', async () => {
      await init({ cwd: testDir });

      const result = await init({ cwd: testDir, force: true });

      expect(result.success).toBe(true);
    });

    it('should return error if .ai-instructions already exists without force', async () => {
      await init({ cwd: testDir });

      const result = await init({ cwd: testDir, force: false });

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('options', () => {
    it('should use current directory if cwd not specified', async () => {
      const originalCwd = process.cwd();
      process.chdir(testDir);

      await init({});

      const aiDir = join(testDir, '.ai');
      const exists = await pathExists(aiDir);

      expect(exists).toBe(true);

      process.chdir(originalCwd);
    });

    it('should respect verbose option', async () => {
      await expect(init({ cwd: testDir, verbose: true })).resolves.not.toThrow();
    });

    it('should respect dryRun option', async () => {
      await init({ cwd: testDir, dryRun: true });

      const aiDir = join(testDir, '.ai');
      const exists = await pathExists(aiDir);

      expect(exists).toBe(false);
    });
  });

  describe('return value', () => {
    it('should return success result', async () => {
      const result = await init({ cwd: testDir });

      expect(result.success).toBe(true);
      expect(result.message).toBeDefined();
    });

    it('should return error result on failure', async () => {
      await init({ cwd: testDir });

      const result = await init({ cwd: testDir, force: false });

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });
});
