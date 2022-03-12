// @flow

import { ShellCommand } from '@adeira/shell-command';

import findPathsToTest from './findPathsToTest';
import getChangedFiles from './getChangedFiles';
import getWorkspaceDependencies from './getWorkspaceDependencies';

function _runJest(config) {
  const flags = {
    nodeArgs: [],
    jestArgs: [],
  };

  config.forEach((arg) => {
    if (process.allowedNodeEnvironmentFlags.has(arg)) {
      flags.nodeArgs.push(arg);
    } else {
      flags.jestArgs.push(arg);
    }
  });

  return new ShellCommand(
    null,
    'node',
    ...flags.nodeArgs,
    'node_modules/.bin/jest',
    '--config=.jest.config.js',
    '--passWithNoTests', // necessary because there may be no tests in the dirty workspace (see Docs for example)
    ...flags.jestArgs,
  )
    .setOutputToScreen()
    .runSynchronously();
}

type ExternalConfig = $ReadOnlyArray<string>;

/**
 * This script tests the whole application except Yarn Workspaces. Workspaces
 * and its related workspaces are being tested only when something actually
 * changed there. Therefore if you don't touch workspaces then they should
 * be completely ignored in the tests.
 *
 * Please note, something like this is not sufficient at this moment because
 * it doesn't work with Yarn Workspaces:
 *
 * ```
 * yarn test --listTests --findRelatedTests src/packages/signed-source/src/SignedSource.js --json
 * ```
 *
 * Hopefully, this is going to be resolved and then we can completely remove
 * this script. See: https://github.com/facebook/jest/issues/6062
 */
export function runTests(externalConfig: ExternalConfig, setupFiles: $ReadOnlyArray<string>): void {
  if (externalConfig.some((option) => /^(?!--).+/.test(option))) {
    // user passed something that is not an option (probably tests regexp)
    // so we give it precedence before our algorithm
    _runJest(externalConfig);
    return;
  }

  const workspaceDependencies = getWorkspaceDependencies();

  const changedFiles = getChangedFiles();

  if (changedFiles.some((file) => setupFiles.includes(file))) {
    // eslint-disable-next-line no-console
    console.warn('DETECTED CHANGE IN CONFIG FILE. RUNNING ALL TESTS');
    runAllTests(externalConfig);
    return;
  }

  const pathsToTest = findPathsToTest(workspaceDependencies, changedFiles);

  if (pathsToTest.size > 0 || changedFiles.length > 0) {
    // we are running tests only when we have dirty workspaces OR when we
    // have some files to test outside of our workspaces (system level tests)
    const jestConfig = Array.from(pathsToTest).concat(changedFiles);
    _runJest(jestConfig.concat(externalConfig));
  }
}

export function runAllTests(externalConfig: ExternalConfig): void {
  _runJest(externalConfig.length > 0 ? externalConfig : []);
}
