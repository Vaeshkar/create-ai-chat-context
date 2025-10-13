/**
 * Logger utility for console output with colors
 * Following code-standards.md - October 2025
 */

import chalk from 'chalk';

/**
 * Logs an informational message in blue
 * @param message - The message to log
 */
function info(message: string): void {
  console.log(chalk.blue(message));
}

/**
 * Logs a success message in green with checkmark
 * @param message - The success message to log
 */
function success(message: string): void {
  console.log(chalk.green(`✓ ${message}`));
}

/**
 * Logs an error message in red with X symbol
 * @param message - The error message to log
 * @param error - Optional error object for additional context
 */
function error(message: string, error?: Error): void {
  const errorMessage = error ? `${message} ${error.message}` : message;
  console.error(chalk.red(`✗ ${errorMessage}`));
}

/**
 * Logs a warning message in yellow with warning symbol
 * @param message - The warning message to log
 */
function warn(message: string): void {
  console.warn(chalk.yellow(`⚠ ${message}`));
}

/**
 * Logs a debug message in gray
 * @param message - The debug message to log
 */
function debug(message: string): void {
  console.log(chalk.gray(message));
}

/**
 * Logs one or more empty lines
 * @param count - Number of empty lines to log (default: 1)
 */
function newline(count: number = 1): void {
  for (let i = 0; i < count; i++) {
    console.log('');
  }
}

/**
 * Logs a bold cyan heading
 * @param text - The heading text to log
 */
function heading(text: string): void {
  console.log(chalk.cyan.bold(text));
}

/**
 * Logs dimmed gray text for less important information
 * @param text - The text to log
 */
function dim(text: string): void {
  console.log(chalk.gray.dim(text));
}

/**
 * Logger utility with colored console output
 */
export const logger = {
  info,
  success,
  error,
  warn,
  debug,
  newline,
  heading,
  dim,
};
