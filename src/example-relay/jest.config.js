// @flow strict

// This configuration is merged with the project configuration defined
// in this monorepo root.
module.exports = {
  rootDir: __dirname,
  // @x-shipit-enable: testMatch: ['<rootDir>/**/__tests__/**/?(*.)+(spec|test).js?(x)'],
  transform: { '^.+\\.js$': '<rootDir>/scripts/jest/custom-transformer.js' }, // @x-shipit-disable
};
