module.exports = {
  displayName: 'lint',
  rootDir: __dirname,
  verbose: false,
  reporters: [
    // optional but quite nice, give it a try
    '@adeira/eslint-runner/reporter',
  ],
  runner: '@adeira/eslint-runner',
  testMatch: [
    // add whatever files you want to lint
    '<rootDir>/src/**/*.js',
  ],
};
