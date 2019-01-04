// @flow

import execa from 'execa';

import findPathsToTest from './findPathsToTest';
import { type WorkspaceDependencies } from './Workspaces.flow';

function _runJest(config, stdio = 'inherit', timezone = 'UTC') {
  process.env.TZ = timezone;
  return execa.sync('jest', ['--config=jest.config.js', ...config], {
    stdio,
  });
}

// TODO: use parallel and CI_NODE_INDEX, CI_NODE_TOTAL (https://docs.gitlab.com/ee/ci/yaml/#parallel)
function _runJestTimezoneVariants(config) {
  // we do run the same tests in different timezone to uncover TZ issues
  _runJest(config, 'inherit', 'UTC');

  if (!config.includes('--watch')) {
    // run tests variants only in normal mode (not watch)
    _runJest(config, 'inherit', 'Asia/Tokyo'); // +9
    _runJest(config, 'inherit', 'America/Lima'); // -5
  }
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
export function runTests(externalConfig: ExternalConfig) {
  const { stdout } = execa.sync('yarn', ['workspaces', 'info', '--json'], {
    stdio: 'pipe',
  });
  const workspaceDependencies: WorkspaceDependencies = JSON.parse(
    JSON.parse(stdout).data,
  );

  if (externalConfig.some(option => /^(?!--).+/.test(option))) {
    // user passed something that is not an option (probably tests regexp)
    // so we give it precedence before our algorithm
    _runJestTimezoneVariants(externalConfig);
    return;
  }

  // TODO:
  //  This is probably not good enough because it lists only related tests.
  //  However, there may be changes in non-JS files affecting the tests results
  //  and Jest is not able to detect this for obvious reasons. It would be better
  //  to extract the implementation from Jest and use Git here directly. This
  //  way we can find all related files and not only related test files.
  const changedFilesOutput = _runJest(
    // https://jestjs.io/docs/en/cli.html#changedfileswithancestor
    ['--listTests', '--changedFilesWithAncestor', '--json'],
    'pipe',
  );

  const changedTestFiles = JSON.parse(changedFilesOutput.stdout);
  const pathsToTest = findPathsToTest(workspaceDependencies, changedTestFiles);

  if (pathsToTest.size > 0 || changedTestFiles.length > 0) {
    // we are running tests only when we have dirty workspaces OR when we
    // have some files to test outside of our workspaces (system level tests)
    const jestConfig = Array.from(pathsToTest).concat(changedTestFiles);
    _runJestTimezoneVariants(jestConfig.concat(externalConfig));
  }
}

export function runAllTests(externalConfig: ExternalConfig) {
  _runJestTimezoneVariants(externalConfig.length > 0 ? externalConfig : []);
}
