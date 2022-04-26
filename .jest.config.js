// @flow strict

// Please note: this file should be named `.jest.config.js` because this way
// we can prevent calling `yarn jest` directly. It wouldn't work with config
// name `jest.config.js` because this config is being loaded automatically.

require('@babel/register'); // to be able to use non-transpiled '@adeira/monorepo-utils' here

const fs = require('fs');
const path = require('path');
const { Workspaces } = require('@adeira/monorepo-utils');

const TESTS_GLOB = '__tests__/**/?(*.)+(spec|test).js';

// we have to set __DEV__ even to JS globals since it's not being transpiled in
// test environment but it's used even before Jest starts testing (when looking for workspaces)
global.__DEV__ = true;

// SEE: https://jestjs.io/docs/en/configuration.html
const commonProjectConfig = {
  // runs before each test (after test framework is installed)
  setupFilesAfterEnv: [path.join(__dirname, 'scripts/jest/setupTests.js')],
  // set global __DEV__ since RN expects non-transpiled version in test environment
  globals: {
    __DEV__: true,
  },
  transform: {
    '^.+\\.js$': ['babel-jest', { rootMode: 'upward' }],
  },
  fakeTimers: {
    enableGlobally: false,
  },
};

function tryToLoadWorkspaceConfig(configPath /*: string */) /*: Object */ {
  if (fs.existsSync(configPath)) {
    console.warn('Loaded additional config %s', configPath.replace(__dirname, ''));
    return require(configPath);
  }
  return {};
}

module.exports = {
  bail: 100,
  errorOnDeprecated: true,
  moduleFileExtensions: ['js', 'json'],
  reporters: ['default', 'github-actions'],
  rootDir: __dirname,
  verbose: false,
  testEnvironment: 'node',
  setupFilesAfterEnv: commonProjectConfig.setupFilesAfterEnv, // specified here so it triggers all tests to run if changed.
  projects: Workspaces.getWorkspacesSync().map((packageJSONLocation) => {
    const packageJSON = require(packageJSONLocation);
    const workspaceDirname = path.dirname(packageJSONLocation);
    const projectConfig = tryToLoadWorkspaceConfig(path.join(workspaceDirname, 'jest.config.js'));

    if (projectConfig.setupFilesAfterEnv != null) {
      // Adding setup files in workspace will overwrite the root one
      // So rather merge them together
      projectConfig.setupFilesAfterEnv = projectConfig.setupFilesAfterEnv.concat(
        commonProjectConfig.setupFilesAfterEnv,
      );
    }

    return {
      displayName: packageJSON.name,
      rootDir: workspaceDirname,
      testMatch: ['**/' + TESTS_GLOB],
      ...commonProjectConfig,
      ...projectConfig,
    };
  }),
};
