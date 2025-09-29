import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import prettierPlugin from 'eslint-plugin-prettier';
import globals from 'globals';

export default defineConfig([
  {
    files: ['src/**/*.{js,jsx,mjs}'],
    plugins: {
      react: reactPlugin,
      prettier: prettierPlugin,
    },
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        React: true,
      },
    },

    settings: {
      react: {
        version: '19.1.1',
      },
    },
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '@emotion/styled',
              message: 'Please use MUI/System instead.',
            },
            {
              name: '@mui/material/styles',
              importNames: ['styled'],
              message: 'Please use MUI/System instead.',
            },
          ],

          patterns: ['@mui/*/*/*', '!@mui/material/test-utils/*'],
        },
      ],
      'react/prop-types': 'error',
      'react/react-in-jsx-scope': 'off',
      'prettier/prettier': 'error',
    },
  },
  {
    files: ['{ci,etl}/**/*.mjs'],

    plugins: {
      prettier: prettierPlugin,
    },

    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
]);
