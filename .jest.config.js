// @flow

// Please note: this file should be named `.jest.config.js` because this way
// we can prevent calling `yarn jest` directly. It wouldn't work with config
// name `jest.config.js` because this config is being loaded automatically.

const TESTS_REGEXP = '__tests__/**/?(*.)+(spec|test).js';

const commonProjectConfig = {
  // runs once per test file (before `setupTestFrameworkScriptFile` and before
  // test framework is being installed)
  setupFiles: ['<rootDir>/scripts/setupTestFiles.js'],

  // runs before each test (after test framework is installed)
  setupTestFrameworkScriptFile: '<rootDir>/scripts/setupTests.js',

  globals: {
    __DEV__: true,
  },
};

module.exports = {
  verbose: false,
  reporters: ['default', 'jest-junit'],
  projects: [
    {
      displayName: null,
      ...commonProjectConfig,
      testMatch: [
        '<rootDir>/src/' + TESTS_REGEXP,
        '<rootDir>/scripts/**/' + TESTS_REGEXP,
      ],
    },
    {
      displayName: 'apps',
      ...commonProjectConfig,
      testMatch: ['<rootDir>/src/apps/**/' + TESTS_REGEXP],
    },
    {
      displayName: 'packages',
      ...commonProjectConfig,
      testMatch: ['<rootDir>/src/packages/**/' + TESTS_REGEXP],
    },
  ],
};
