// @flow strict

module.exports = {
  displayName: 'lint',
  rootDir: __dirname,
  verbose: false,
  reporters: ['default'],
  runner: '@adeira/eslint-config/runner',
  testMatch: ['<rootDir>/src/**/*.js', '<rootDir>/scripts/**/*.js'],
};
