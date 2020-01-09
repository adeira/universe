// @flow

const { createJestRunner } = require('create-jest-runner');

const verifyPackageTree = require('./verifyPackageTree');

const externalConfig = process.argv.slice(2);

verifyPackageTree();

module.exports = (createJestRunner(require.resolve('./run'), {
  getExtraOptions: () => {
    return {
      runAll: externalConfig.includes('--all'),
      noWarnings: externalConfig.includes('--no-warnings'),
    };
  },
}) /*: any */);
