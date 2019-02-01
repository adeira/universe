// @flow

const { createJestRunner } = require('create-jest-runner');

const externalConfig = process.argv.slice(2);

module.exports = createJestRunner(require.resolve('./run'), {
  getExtraOptions: () => {
    return {
      runAll: externalConfig.includes('--all'),
    };
  },
});
