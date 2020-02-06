// @flow

const { createJestRunner } = require('create-jest-runner');

const verifyPackageTree = require('./src/verifyPackageTree');

const externalConfig = process.argv.slice(2);

verifyPackageTree();

module.exports = (createJestRunner(require.resolve('./src/run'), {
  getExtraOptions: () => {
    return {
      runAll: externalConfig.includes('--all'),
      noWarnings: externalConfig.includes('--no-warnings'),
    };
  },
}) /*: any */);
