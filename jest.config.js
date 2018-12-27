// @flow

const TESTS_REGEXP = '__tests__/**/?(*.)+(spec|test).js';

const commonProjectConfig = {
  setupTestFrameworkScriptFile: '<rootDir>/scripts/setupTests.js',
};

module.exports = {
  verbose: false,
  reporters: ['default'],
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
