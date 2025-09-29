import globals from 'globals';
import pluginNext from '@next/eslint-plugin-next';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import babelParser from '@babel/eslint-parser';
import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    files: ['src/**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
        React: true,
        L: 'readonly', // for leaflet@1.8
      },
      parser: babelParser, // for JSX parsing
      parserOptions: {
        requireConfigFile: false, // skip check for babel.config.js
        babelOptions: {
          plugins: ['@babel/plugin-syntax-jsx'],
        },
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      '@next/next': pluginNext,
      'react-hooks': pluginReactHooks,
      react: pluginReact,
    },
    rules: {
      ...pluginNext.configs['core-web-vitals'].rules,
      ...pluginNext.configs['recommended'].rules,
      ...pluginReact.configs['jsx-runtime'].rules,
      ...pluginReact.configs['recommended'].rules,
      ...pluginReactHooks.configs['recommended'].rules,
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
    },
    settings: {
      react: {
        version: '19.1.1',
      },
    },
  },
  {
    files: ['{etl,ci}/**/*.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
  },
];
