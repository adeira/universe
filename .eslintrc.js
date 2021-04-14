// @flow strict

/* eslint-disable no-unused-vars */
const OFF = 0;
const WARN = 1;
const ERROR = 2;
/* eslint-enable no-unused-vars */

module.exports = {
  parser: '@babel/eslint-parser', // TODO: consider moving this into `eslint-config-adeira`
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2021,
    ecmaFeatures: {
      jsx: false,
    },
  },
  root: true, // stop ESLint from looking for a configuration file in parent folders
  env: {
    // TODO: consider moving this into `eslint-config-adeira`
    es6: true,
    jest: true,
    node: true,
  },

  extends: ['@adeira/eslint-config/strict'],

  overrides: [
    {
      files: ['**/babel-preset-adeira/**/__fixtures__/**/*.js', 'src/__flowtests__/**'],
      rules: {
        'eslint-comments/no-unlimited-disable': OFF,
      },
    },
  ],

  rules: {
    'no-restricted-imports': [
      ERROR,
      {
        paths: [
          {
            name: 'child_process',
            message: 'Use `ShellCommand` from @adeira/monorepo instead.',
          },
          {
            name: 'glob',
            message: 'Use `glob` from @adeira/monorepo instead.',
          },
          {
            name: 'react-relay',
            message: 'Use @adeira/relay instead.',
          },
        ],
      },
    ],
    'import/no-extraneous-dependencies': [
      ERROR,
      {
        devDependencies: [
          '**/.babelrc.js',
          '**/next.config.js',
          '**/scripts/**',
          '**/__flowtests__/**',
          '**/__tests__/**',
        ],
      },
    ],
  },
};
