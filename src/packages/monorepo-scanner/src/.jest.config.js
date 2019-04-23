// @flow strict

require('@babel/register'); // to be able to use non-transpiled '@kiwicom/monorepo' here

const fs = require('fs');
const path = require('path');
const assert = require('assert').strict;
const { findRootPackageJsonPath, Git } = require('@kiwicom/monorepo');

const changes = Git.getChangesToTest();
const monorepoSrcRoot = path.join(
  path.dirname(findRootPackageJsonPath()),
  'src',
);
const rootDir = path.join(__dirname, 'scans');

const dependenciesTable = new Map([
  // when should the check be executed => the check itself
  [/(?:package\.json|CHANGELOG\.md)$/i, 'Changelogs.scan.js'],
  [/(?:package\.json|\.babelrc)$/i, 'NextjsApplications.scan.js'],
  [/package\.json$/i, 'PrivatePackages.scan.js'],
  [/\.js$/i, 'TestsWithCorrectName.scan.js'],
  [/package\.json$/i, 'Workspaces.scan.js'],
  [/package\.json$/i, 'WorkspacesApps.scan.js'],
  [/package\.json$/i, 'WorkspacesDependencies.scan.js'],
  [/(?:LICENSE|package\.json)$/i, 'WorkspacesPackages.scan.js'],
  // TODO: every test should define their own dependencies to scale well (?)
]);

assert.deepStrictEqual(
  [...dependenciesTable.values()],
  fs.readdirSync(rootDir), // every scan should be manually registered here
);

const testRegexps = [];
for (const [regexp, newTestRegex] of dependenciesTable) {
  if (
    changes.some(changedFile => {
      const testResult = regexp.test(changedFile);
      if (testResult) {
        console.warn(
          `Matched %s on file '%s' resulting in '%s'`,
          regexp,
          changedFile,
          newTestRegex,
        );
      }
      return testResult;
    })
  ) {
    testRegexps.push(newTestRegex);
  }
}

// fallback to test everything if there is no match
const testRegex = testRegexps.length > 0 ? testRegexps : '.scan.js$';
console.warn('Value of `testRegex`:', testRegex);

module.exports = {
  rootDir,
  testRegex,
  verbose: true,
  globals: {
    __DEV__: true,
    __SRC_ROOT__: monorepoSrcRoot,
    __SRC_APPS_ROOT__: path.join(monorepoSrcRoot, 'apps'),
    __SRC_PACKAGES_ROOT__: path.join(monorepoSrcRoot, 'packages'),
  },
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  setupFilesAfterEnv: [path.join(__dirname, '.jest.setup.js')],
};
