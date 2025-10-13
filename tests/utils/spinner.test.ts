/**
 * Tests for spinner utility
 * Following code-standards.md - TDD approach
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createSpinner } from '../../src/utils/spinner.js';

describe('spinner', () => {
  beforeEach(() => {
    // Mock process.stdout.isTTY to simulate terminal environment
    vi.stubGlobal('process', {
      ...process,
      stdout: { ...process.stdout, isTTY: true },
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe('createSpinner', () => {
    it('should create a spinner with text', () => {
      const spinner = createSpinner('Loading...');

      expect(spinner).toBeDefined();
      expect(spinner.start).toBeDefined();
      expect(spinner.stop).toBeDefined();
      expect(spinner.succeed).toBeDefined();
      expect(spinner.fail).toBeDefined();
      expect(spinner.warn).toBeDefined();
      expect(spinner.info).toBeDefined();
    });

    it('should create spinner with empty text', () => {
      const spinner = createSpinner('');

      expect(spinner).toBeDefined();
    });

    it('should start spinner', () => {
      const spinner = createSpinner('Processing...');

      expect(() => spinner.start()).not.toThrow();
    });

    it('should stop spinner', () => {
      const spinner = createSpinner('Processing...');
      spinner.start();

      expect(() => spinner.stop()).not.toThrow();
    });

    it('should succeed with message', () => {
      const spinner = createSpinner('Processing...');
      spinner.start();

      expect(() => spinner.succeed('Done!')).not.toThrow();
    });

    it('should succeed without message', () => {
      const spinner = createSpinner('Processing...');
      spinner.start();

      expect(() => spinner.succeed()).not.toThrow();
    });

    it('should fail with message', () => {
      const spinner = createSpinner('Processing...');
      spinner.start();

      expect(() => spinner.fail('Error occurred')).not.toThrow();
    });

    it('should fail without message', () => {
      const spinner = createSpinner('Processing...');
      spinner.start();

      expect(() => spinner.fail()).not.toThrow();
    });

    it('should warn with message', () => {
      const spinner = createSpinner('Processing...');
      spinner.start();

      expect(() => spinner.warn('Warning!')).not.toThrow();
    });

    it('should info with message', () => {
      const spinner = createSpinner('Processing...');
      spinner.start();

      expect(() => spinner.info('Info message')).not.toThrow();
    });

    it('should update text while spinning', () => {
      const spinner = createSpinner('Initial text');
      spinner.start();

      expect(() => spinner.text('Updated text')).not.toThrow();
      spinner.stop();
    });

    it('should handle multiple start/stop cycles', () => {
      const spinner = createSpinner('Test');

      spinner.start();
      spinner.stop();
      spinner.start();
      spinner.stop();

      expect(true).toBe(true); // No errors thrown
    });

    it('should handle succeed after stop', () => {
      const spinner = createSpinner('Test');
      spinner.start();
      spinner.stop();

      expect(() => spinner.succeed('Done')).not.toThrow();
    });

    it('should handle fail after stop', () => {
      const spinner = createSpinner('Test');
      spinner.start();
      spinner.stop();

      expect(() => spinner.fail('Failed')).not.toThrow();
    });
  });

  describe('spinner methods return spinner', () => {
    it('should allow method chaining', () => {
      const spinner = createSpinner('Test');

      expect(() => {
        spinner.start().text('Updated').stop();
      }).not.toThrow();
    });
  });

  describe('spinner in non-TTY environment', () => {
    beforeEach(() => {
      // Mock non-TTY environment (CI/CD)
      vi.stubGlobal('process', {
        ...process,
        stdout: { ...process.stdout, isTTY: false },
      });
    });

    it('should create spinner without errors in non-TTY', () => {
      const spinner = createSpinner('Loading...');

      expect(spinner).toBeDefined();
      expect(() => spinner.start()).not.toThrow();
      expect(() => spinner.succeed()).not.toThrow();
    });
  });
});
