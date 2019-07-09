// @flow strict

require('@babel/register'); // to be able to use non-transpiled '@kiwicom/monorepo-utils' here

const path = require('path');
const { findMonorepoRoot } = require('@kiwicom/monorepo-utils');

const monorepoSrcRoot = path.join(findMonorepoRoot(), 'src');

module.exports = {
  rootDir: path.join(__dirname, 'src', 'scans'),
  testRegex: '.scan.js$',
  verbose: true,
  globals: {
    __DEV__: true,
    __SRC_ROOT__: monorepoSrcRoot,
    __SRC_PACKAGES_ROOT__: path.join(monorepoSrcRoot, 'packages'),
  },
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  setupFilesAfterEnv: [path.join(__dirname, '.jest.setup.js')],
};
