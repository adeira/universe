// @flow strict

module.exports = {
  displayName: 'lint',
  rootDir: __dirname,
  verbose: false,
  reporters: ['@adeira/eslint-runner/reporter'],
  runner: '@adeira/eslint-runner',
  testMatch: ['<rootDir>/src/**/*.js', '<rootDir>/scripts/**/*.js'],
};
