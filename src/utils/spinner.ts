/**
 * Spinner utility for progress indicators
 * Following code-standards.md - October 2025
 */

import ora, { type Ora } from 'ora';

/**
 * Spinner interface for progress indication
 */
export interface Spinner {
  start: () => Spinner;
  stop: () => Spinner;
  succeed: (text?: string) => Spinner;
  fail: (text?: string) => Spinner;
  warn: (text?: string) => Spinner;
  info: (text?: string) => Spinner;
  text: (text: string) => Spinner;
}

/**
 * Creates a spinner instance for showing progress
 *
 * @param text - Initial text to display with the spinner
 * @returns Spinner instance with chainable methods
 *
 * @example
 * ```typescript
 * const spinner = createSpinner('Loading...');
 * spinner.start();
 * // ... do work ...
 * spinner.succeed('Done!');
 * ```
 */
export function createSpinner(text: string): Spinner {
  const oraSpinner: Ora = ora(text);

  return {
    start(): Spinner {
      oraSpinner.start();
      return this;
    },

    stop(): Spinner {
      oraSpinner.stop();
      return this;
    },

    succeed(text?: string): Spinner {
      oraSpinner.succeed(text);
      return this;
    },

    fail(text?: string): Spinner {
      oraSpinner.fail(text);
      return this;
    },

    warn(text?: string): Spinner {
      oraSpinner.warn(text);
      return this;
    },

    info(text?: string): Spinner {
      oraSpinner.info(text);
      return this;
    },

    text(text: string): Spinner {
      oraSpinner.text = text;
      return this;
    },
  };
}
