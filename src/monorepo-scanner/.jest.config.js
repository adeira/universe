// @flow strict

require('@babel/register'); // to be able to use non-transpiled '@adeira/monorepo-utils' here

const path = require('path');
const { findMonorepoRoot } = require('@adeira/monorepo-utils');

const monorepoSrcRoot /*: string */ = path.join(findMonorepoRoot(), 'src');

module.exports = {
  rootDir: (path.join(__dirname, 'src', 'scans') /*: string */),
  testRegex: '.scan.js$',
  verbose: false,
  globals: {
    __DEV__: true,
  },
  transform: {
    '^.+\\.js$': ['babel-jest', { rootMode: 'upward' }],
  },
  setupFilesAfterEnv: [(path.join(__dirname, '.jest.setup.js') /*: string */)],
};
