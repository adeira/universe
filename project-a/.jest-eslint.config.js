module.exports = {
  displayName: 'lint',
  runner: '@adeira/eslint-config/runner',
  testMatch: [
    //
    '<rootDir>/pages/**/*.js',
    '<rootDir>/scripts/**/*.js',
    '<rootDir>/src/**/*.js',
  ],
};
