// @flow

const execa = require('execa');

let data = '';
if (process.argv.includes('--all')) {
  runJest([]); // just run everything
} else {
  process.stdin.on('data', chunk => {
    data += chunk;
  });
  process.stdin.on('end', () => {
    runTests(JSON.parse(JSON.parse(data).data));
  });
}

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

function runJest(config, stdio = 'inherit', timezone = 'UTC') {
  process.env.TZ = timezone;
  const jestOptions = ['--config=jest.json', ...config];
  // eslint-disable-next-line no-console
  console.warn(
    `Running tests in TZ=${
      process.env.TZ
    } with these options: ${jestOptions.join(' ')}`,
  );
  return execa.sync('jest', jestOptions, {
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
  // TODO:
  //  This is probably not good enough because it lists only related tests.
  //  However, there may be changes in non-JS files affecting the tests results
  //  and Jest is not able to detect this for obvious reasons. It would be better
  //  to extract the implementation from Jest and use Git here directly. This
  //  way we can find all related files and not only related test files.
  const changedFilesOutput = runJest(
    // https://jestjs.io/docs/en/cli.html#changedfileswithancestor
    ['--listTests', '--changedFilesWithAncestor', '--json'],
    'pipe',
  );

  const changedTestFiles = JSON.parse(changedFilesOutput.stdout);
  const dirtyWorkspaces = findDirtyWorkspaces(
    workspaceDependencies,
    changedTestFiles,
  );

  const relatedWorkspaces = findRelatedWorkspaces(
    workspaceDependencies,
    dirtyWorkspaces,
  );

  // console.warn('RELEVANT TESTS: ', changedTestFiles); // eslint-disable-line no-console
  console.warn('DIRTY WORKSPACES: ', dirtyWorkspaces); // eslint-disable-line no-console
  console.warn('WORKSPACES TO TEST: ', relatedWorkspaces); // eslint-disable-line no-console

  const pathsToTest = new Set();
  relatedWorkspaces.forEach(relatedWorkspace => {
    pathsToTest.add(workspaceDependencies[relatedWorkspace].location);
  });

  if (pathsToTest.size > 0 || changedTestFiles.length > 0) {
    const jestConfig = Array.from(pathsToTest)
      .concat(process.argv.slice(2))
      .concat(changedTestFiles); // some tests may be outside of Yarn Workspace

    // we do run the same tests in different timezone to uncover TZ issues
    runJest(jestConfig, 'inherit', 'UTC');
    runJest(jestConfig, 'inherit', 'Asia/Tokyo'); // +9
    runJest(jestConfig, 'inherit', 'America/Lima'); // -5
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
