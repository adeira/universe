// @flow

import { invariant } from '@adeira/js';

import findPathsToTest from './findPathsToTest';
import getChangedFiles from './getChangedFiles';
import ShellCommand from './ShellCommand';
import getWorkspaceDependencies from './getWorkspaceDependencies';

function _runJest(config, timezone = 'UTC') {
  if (process.env.TZ === undefined) {
    // Do not overwrite TZ when user sets it explicitly (only when it's undefined).
    process.env.TZ = timezone;
  }

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

  console.warn(`Running tests in timezone: ${process.env.TZ ?? timezone}`); // eslint-disable-line no-console
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

function _runJestTimezoneVariants(config, ciNode: CINode) {
  if (ciNode.total > 1) {
    const index = ciNode.index - 1;
    const timezones = [
      'UTC',
      'Asia/Tokyo', // +9
      'America/Lima', // -5
    ];

    invariant(
      timezones[index] !== undefined,
      `CI node with index ${ciNode.index} is not supported.`,
    );

    _runJest(config, timezones[index]);
  } else {
    _runJest(config, 'UTC');
  }
}

type ExternalConfig = $ReadOnlyArray<string>;
type CINode = {|
  +index: number,
  +total: number,
|};

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
export function runTests(externalConfig: ExternalConfig, ciNode: CINode) {
  if (externalConfig.some((option) => /^(?!--).+/.test(option))) {
    // user passed something that is not an option (probably tests regexp)
    // so we give it precedence before our algorithm
    _runJestTimezoneVariants(externalConfig, ciNode);
    return;
  }

  const workspaceDependencies = getWorkspaceDependencies();

  const changedFiles = getChangedFiles();
  const pathsToTest = findPathsToTest(workspaceDependencies, changedFiles);

  if (pathsToTest.size > 0 || changedFiles.length > 0) {
    // we are running tests only when we have dirty workspaces OR when we
    // have some files to test outside of our workspaces (system level tests)
    const jestConfig = Array.from(pathsToTest).concat(changedFiles);
    _runJestTimezoneVariants(jestConfig.concat(externalConfig), ciNode);
  }
}

export function runAllTests(externalConfig: ExternalConfig, ciNode: CINode) {
  _runJestTimezoneVariants(externalConfig.length > 0 ? externalConfig : [], ciNode);
}
