// @flow strict

module.exports = {
  bail: 100,
  errorOnDeprecated: true,
  moduleFileExtensions: ['js', 'json'],
  reporters: ['default'],
  // rootDir: __dirname,
  verbose: false,
  testMatch: ['**/__tests__/**/?(*.)+(spec|test).js'],
  globals: {
    __DEV__: true,
  },
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  timers: 'fake',
};
