const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  parser: 'babel-eslint', // TODO: consider moving this into `eslint-config-kiwicom`
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: false,
    },
  },
  root: true, // stop ESLint from looking for a configuration file in parent folders
  env: {
    // TODO: consider moving this into `eslint-config-kiwicom`
    es6: true,
    jest: true,
    node: true,
  },

  extends: ['@adeira/eslint-config/strict'],

  rules: {
    'no-restricted-imports': [
      ERROR,
      {
        paths: [
          {
            name: 'child_process',
            message: 'Use `ShellCommand` from @kiwicom/monorepo instead.',
          },
          {
            name: 'glob',
            message: 'Use `glob` from @kiwicom/monorepo instead.',
          },
          {
            name: 'react-relay',
            message: 'Use @kiwicom/relay instead.',
          },
          {
            name: '@kiwicom/graphql-skymock',
            message:
              'You should never require GraphQL Skymock directly. This service is being used automatically in the test environment.',
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
    'flowtype/no-weak-types': [
      ERROR,
      {
        // codeshift: https://github.com/facebook/flow/issues/7291
        any: false,
        Object: true, // { +[key: string]: any, ... }
        Function: true, // (...args: $ReadOnlyArray<any>) => any   -OR-   { [[call]]: any, ... }
      },
    ],
  },
};
