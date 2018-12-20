// @flow

import execa from 'execa';

type WorkspaceDependencies = {
  [string]: {|
    +location: string,
    +workspaceDependencies: $ReadOnlyArray<string>,
    +mismatchedWorkspaceDependencies: $ReadOnlyArray<string>,
  |},
};

export function _findRelatedWorkspaces(
  workspaceDependencies: WorkspaceDependencies,
  touchedWorkspaces: Set<string>,
) {
  // 1) the initial workspaces itself
  const workspacesToTest = new Set<string>(touchedWorkspaces);

  // 2) workspaces depending on this workspace
  Object.keys(workspaceDependencies).forEach(key => {
    const value = workspaceDependencies[key];
    touchedWorkspaces.forEach(touchedWorkspace => {
      if (value.workspaceDependencies.includes(touchedWorkspace)) {
        _findRelatedWorkspaces(workspaceDependencies, new Set([key])).forEach(
          relatedWorkspace => {
            workspacesToTest.add(relatedWorkspace);
          },
        );
      }
    });
  });

  return workspacesToTest;
}

export function _findDirtyWorkspaces(
  workspaceDependencies: WorkspaceDependencies,
  changedFiles: $ReadOnlyArray<string>,
) {
  const dirtyWorkspaces = new Set<string>();
  Object.keys(workspaceDependencies).forEach(dependencyName => {
    const value = workspaceDependencies[dependencyName];
    changedFiles.forEach(changedFile => {
      if (new RegExp(value.location).test(changedFile)) {
        dirtyWorkspaces.add(dependencyName);
      }
    });
  });
  return dirtyWorkspaces;
}

function _runJest(config, stdio = 'inherit', timezone = 'UTC') {
  process.env.TZ = timezone;

  return execa.sync('jest', ['--config=jest.json', ...config], {
    stdio,
  });
}

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
export function runTests(workspaceDependencies: WorkspaceDependencies) {
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
  const dirtyWorkspaces = _findDirtyWorkspaces(
    workspaceDependencies,
    changedTestFiles,
  );

  const relatedWorkspaces = _findRelatedWorkspaces(
    workspaceDependencies,
    dirtyWorkspaces,
  );

  // console.warn('RELEVANT TESTS: ', changedTestFiles); // eslint-disable-line no-console
  console.warn('DIRTY WORKSPACES: ', dirtyWorkspaces); // eslint-disable-line no-console
  console.warn('WORKSPACES TO TEST: ', relatedWorkspaces); // eslint-disable-line no-console

  const pathsToTest = new Set<string>();
  relatedWorkspaces.forEach(relatedWorkspace => {
    pathsToTest.add(workspaceDependencies[relatedWorkspace].location);
  });

  if (pathsToTest.size > 0 || changedTestFiles.length > 0) {
    const externalConfig = process.argv.slice(2);

    let jestConfig;
    if (externalConfig.length > 0) {
      // external requirements always take precedence
      jestConfig = Array.from(externalConfig);
    } else {
      // some tests may be outside of Yarn Workspace
      jestConfig = Array.from(pathsToTest).concat(changedTestFiles);
    }

    // we do run the same tests in different timezone to uncover TZ issues
    _runJest(jestConfig, 'inherit', 'UTC');
    _runJest(jestConfig, 'inherit', 'Asia/Tokyo'); // +9
    _runJest(jestConfig, 'inherit', 'America/Lima'); // -5
  }
}

export function runAllTests() {
  // just run everything with different TZ variants
  _runJest([], 'inherit', 'UTC');
  _runJest([], 'inherit', 'Asia/Tokyo'); // +9
  _runJest([], 'inherit', 'America/Lima'); // -5
}
