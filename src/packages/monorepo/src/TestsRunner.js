// @flow

import { invariant } from '@kiwicom/js';

import findPathsToTest from './findPathsToTest';
import getChangedFiles from './getChangedFiles';
import sanitizeWorkspaces from './sanitizeWorkspaces';
import ChildProcess from './ChildProcess';

function _runJest(config, timezone = 'UTC') {
  process.env.TZ = timezone;
  console.warn(`Running tests in timezone: ${timezone}`); // eslint-disable-line no-console
  return ChildProcess.executeSystemCommand(
    'jest',
    [
      '--config=.jest.config.js',
      '--passWithNoTests', // necessary because there may be no tests in the dirty workspace (see Docs for example)
      ...config,
    ],
    {
      stdio: 'inherit',
    },
  );
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
  if (externalConfig.some(option => /^(?!--).+/.test(option))) {
    // user passed something that is not an option (probably tests regexp)
    // so we give it precedence before our algorithm
    _runJestTimezoneVariants(externalConfig, ciNode);
    return;
  }

  const stdout = ChildProcess.executeSystemCommand('yarn', [
    'workspaces',
    'info',
    '--json',
  ]);
  const workspaceDependencies = sanitizeWorkspaces(
    JSON.parse(JSON.parse(stdout).data),
  );

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
  _runJestTimezoneVariants(
    externalConfig.length > 0 ? externalConfig : [],
    ciNode,
  );
}
