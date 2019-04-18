// @flow strict

module.exports = {
  displayName: 'lint',
  rootDir: __dirname,
  verbose: false,
  reporters: ['default'],
  runner: '@kiwicom/eslint-config/runner',
  testMatch: ['<rootDir>/src/**/*.js', '<rootDir>/scripts/**/*.js'],
};
