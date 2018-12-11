// @flow

const execa = require('execa');

let data = '';
process.stdin.on('data', chunk => {
  data += chunk;
});
process.stdin.on('end', () => {
  runTests(JSON.parse(JSON.parse(data).data));
});

function findRelatedWorkspaces(
  workspaceDependencies,
  touchedWorkspaces /*: Set<string> */,
) {
  // 1) the initial workspaces itself
  const workspacesToTest = new Set(touchedWorkspaces);

  // 2) workspaces depending on this workspace
  Object.keys(workspaceDependencies).forEach(key => {
    const value = workspaceDependencies[key];
    touchedWorkspaces.forEach(touchedWorkspace => {
      if (value.workspaceDependencies.includes(touchedWorkspace)) {
        findRelatedWorkspaces(workspaceDependencies, new Set([key])).forEach(
          relatedWorkspace => {
            workspacesToTest.add(relatedWorkspace);
          },
        );
      }
    });
  });

  return workspacesToTest;
}

function findDirtyWorkspaces(
  workspaceDependencies,
  changedFiles /*: $ReadOnlyArray<string> */,
) {
  const dirtyWorkspaces = new Set();
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

function runJest(config, stdio = 'inherit') {
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
function runTests(workspaceDependencies) {
  const changedFiles = runJest(
    // TODO: verify it's ok on CI (maybe combine with --lastCommit?)
    ['--listTests', '--onlyChanged', '--json'],
    'pipe',
  );
  const dirtyWorkspaces = findDirtyWorkspaces(
    workspaceDependencies,
    JSON.parse(changedFiles.stdout),
  );

  const relatedWorkspaces = findRelatedWorkspaces(
    workspaceDependencies,
    dirtyWorkspaces,
  );

  // console.warn('CHANGED FILES: ', changedFiles.stdout);
  console.warn('DIRTY WORKSPACES: ', dirtyWorkspaces); // eslint-disable-line no-console
  console.warn('WORKSPACES TO TEST: ', relatedWorkspaces); // eslint-disable-line no-console

  const pathsToTest = new Set();
  relatedWorkspaces.forEach(relatedWorkspace => {
    pathsToTest.add(workspaceDependencies[relatedWorkspace].location);
  });

  if (pathsToTest.size > 0) {
    runJest(Array.from(pathsToTest));
  }
}

// const workspaceDependencies = {
//   '@kiwicom/graphql-bc-checker': {
//     location: 'src/packages/bc-checker',
//     workspaceDependencies: ['@kiwicom/signed-source'],
//     mismatchedWorkspaceDependencies: [],
//   },
//   ...
// };
