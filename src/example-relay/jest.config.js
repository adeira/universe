// @flow strict

const path = require('path');

/*::

type JestConfig = {
  +rootDir?: string,
  +testMatch?: $ReadOnlyArray<string>,
  +transform?: { +[string]: string },
  +setupFilesAfterEnv?: $ReadOnlyArray<string>,
  +setupFiles?: $ReadOnlyArray<string>,
};

*/

// This configuration is merged with the project configuration defined
// in this monorepo root.
module.exports = ({
  rootDir: __dirname,
  // @x-shipit-enable: testMatch: ['<rootDir>/**/__tests__/**/?(*.)+(spec|test).js?(x)'],
  transform: { '^.+\\.js$': '<rootDir>/scripts/jest/custom-transformer.js' }, // @x-shipit-disable
  setupFilesAfterEnv: [path.join(__dirname, 'scripts', 'jest', 'setupTests.js')],
  setupFiles: [path.join(__dirname, 'scripts', 'jest', 'setEnvVars.js')],
} /*: JestConfig */);
