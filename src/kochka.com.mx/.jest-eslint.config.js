module.exports = {
  displayName: 'lint',
  reporters: ['@adeira/eslint-runner/reporter'],
  runner: '@adeira/eslint-runner',
  testMatch: [
    //
    '<rootDir>/pages/**/*.js',
    '<rootDir>/scripts/**/*.js',
    '<rootDir>/src/**/*.js',
  ],
};
