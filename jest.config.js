// @flow

const TESTS_REGEXP = '__tests__/**/?(*.)+(spec|test).js';

const commonConfig = {
  setupTestFrameworkScriptFile: '<rootDir>/scripts/setupTests.js',
};

module.exports = {
  projects: [
    {
      displayName: 'other',
      ...commonConfig,
      testMatch: [
        '<rootDir>/src/' + TESTS_REGEXP,
        '<rootDir>/scripts/**/' + TESTS_REGEXP,
      ],
    },
    {
      displayName: 'apps',
      ...commonConfig,
      testMatch: ['<rootDir>/src/apps/**/' + TESTS_REGEXP],
    },
    {
      displayName: 'packages',
      ...commonConfig,
      testMatch: ['<rootDir>/src/packages/**/' + TESTS_REGEXP],
    },
  ],
};
