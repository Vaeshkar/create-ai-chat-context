import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Enforce modern standards
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      
      // Code quality
      'no-console': 'off', // We're a CLI tool
      'max-lines-per-function': ['warn', { max: 50, skipBlankLines: true, skipComments: true }],
      'complexity': ['warn', 10],
      
      // Modern patterns
      'prefer-const': 'error',
      'no-var': 'error',
      'prefer-arrow-callback': 'error',
    },
  },
  {
    ignores: ['dist/', 'node_modules/', '**/*.js', '**/*.cjs', '**/*.mjs'],
  }
);

