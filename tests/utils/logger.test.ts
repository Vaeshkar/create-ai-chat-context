/**
 * Tests for logger utility
 * Following code-standards.md - TDD approach
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { logger } from '../../src/utils/logger.js';

describe('logger', () => {
  // Capture console output for testing
  let consoleLogSpy: ReturnType<typeof vi.spyOn>;
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;
  let consoleWarnSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('info', () => {
    it('should log info message with blue color', () => {
      logger.info('Test message');

      expect(consoleLogSpy).toHaveBeenCalledOnce();
      expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Test message'));
    });

    it('should handle empty string', () => {
      logger.info('');

      expect(consoleLogSpy).toHaveBeenCalledOnce();
    });

    it('should handle multiline messages', () => {
      logger.info('Line 1\nLine 2');

      expect(consoleLogSpy).toHaveBeenCalledOnce();
      expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Line 1\nLine 2'));
    });
  });

  describe('success', () => {
    it('should log success message with green color', () => {
      logger.success('Operation completed');

      expect(consoleLogSpy).toHaveBeenCalledOnce();
      expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Operation completed'));
    });

    it('should include checkmark symbol', () => {
      logger.success('Done');

      expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('✓'));
    });
  });

  describe('error', () => {
    it('should log error message with red color', () => {
      logger.error('Something failed');

      expect(consoleErrorSpy).toHaveBeenCalledOnce();
      expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('Something failed'));
    });

    it('should include error symbol', () => {
      logger.error('Failed');

      expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('✗'));
    });

    it('should handle Error objects', () => {
      const error = new Error('Test error');
      logger.error('Failed:', error);

      expect(consoleErrorSpy).toHaveBeenCalledOnce();
    });
  });

  describe('warn', () => {
    it('should log warning message with yellow color', () => {
      logger.warn('Be careful');

      expect(consoleWarnSpy).toHaveBeenCalledOnce();
      expect(consoleWarnSpy).toHaveBeenCalledWith(expect.stringContaining('Be careful'));
    });

    it('should include warning symbol', () => {
      logger.warn('Warning');

      expect(consoleWarnSpy).toHaveBeenCalledWith(expect.stringContaining('⚠'));
    });
  });

  describe('debug', () => {
    it('should log debug message with gray color', () => {
      logger.debug('Debug info');

      expect(consoleLogSpy).toHaveBeenCalledOnce();
      expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Debug info'));
    });
  });

  describe('newline', () => {
    it('should log empty line', () => {
      logger.newline();

      expect(consoleLogSpy).toHaveBeenCalledWith('');
    });

    it('should log multiple empty lines', () => {
      logger.newline(3);

      expect(consoleLogSpy).toHaveBeenCalledTimes(3);
    });

    it('should default to 1 line', () => {
      logger.newline();

      expect(consoleLogSpy).toHaveBeenCalledOnce();
    });
  });

  describe('heading', () => {
    it('should log bold cyan heading', () => {
      logger.heading('Section Title');

      expect(consoleLogSpy).toHaveBeenCalledOnce();
      expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Section Title'));
    });

    it('should handle empty heading', () => {
      logger.heading('');

      expect(consoleLogSpy).toHaveBeenCalledOnce();
    });
  });

  describe('dim', () => {
    it('should log dimmed gray text', () => {
      logger.dim('Less important');

      expect(consoleLogSpy).toHaveBeenCalledOnce();
      expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Less important'));
    });
  });
});
