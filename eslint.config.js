import eslint from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import angular from '@angular-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import htmlParser from '@angular-eslint/template-parser';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tailwindcss from 'eslint-plugin-tailwindcss';

export default [
  eslint.configs.recommended,
  ...tailwindcss.configs['flat/recommended'],
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.json'],
      },
      globals: {
        ...Object.fromEntries(
          Object.entries(globals.browser).map(([key, value]) => [key.trim(), value]),
        ),
        ...Object.fromEntries(
          Object.entries(globals.node).map(([key, value]) => [key.trim(), value]),
        ),
        ...Object.fromEntries(
          Object.entries(globals.jest).map(([key, value]) => [key.trim(), value]),
        ),
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      '@angular-eslint': angular,
      'unused-imports': unusedImports,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...tseslint.configs.stylistic.rules,
      'unused-imports/no-unused-imports': 'error',
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'warn',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
      '@typescript-eslint/no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true,
          allowTernary: true,
        },
      ],
      'no-console': 'off',
      '@typescript-eslint/no-empty-function': 'error',
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-undef': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-inferrable-types': 'error',
      'no-useless-escape': 'error',
      '@typescript-eslint/consistent-indexed-object-style': 'error',
      '@typescript-eslint/no-unsafe-function-type': 'error',
      'no-self-assign': 'error',
      'no-prototype-builtins': 'error',
      'no-unsafe-optional-chaining': 'warn',
      'no-constant-binary-expression': 'error',
      '@typescript-eslint/adjacent-overload-signatures': 'error',
      'no-unused-private-class-members': 'error',
      'no-empty': 'error',
      'valid-typeof': ['error', { requireStringLiterals: true }],
      'array-callback-return': 'error',
    },
  },
  {
    files: ['**/*.html'],
    languageOptions: {
      parser: htmlParser,
    },
    plugins: {
      '@angular-eslint': angular,
    },
    rules: {
      'no-irregular-whitespace': 'off',
    },
  },
  {
    files: ['**/*.html'],
    languageOptions: {
      parser: htmlParser,
    },
    plugins: {
      '@angular-eslint': angular,
    },
    rules: {
      'no-irregular-whitespace': 'off',
      'tailwindcss/no-custom-classname': 'off',
    },
  },
];
