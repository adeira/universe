// @flow strict

require('@babel/register'); // to be able to use non-transpiled '@kiwicom/monorepo' here

const path = require('path');
const { findRootPackageJsonPath, Git } = require('@kiwicom/monorepo');

const changes = Git.getChangesToTest();
const srcRoot = path.join(path.dirname(findRootPackageJsonPath()), 'src');

const testRegexps = [];
const dependenciesTable = [
  // when should the check be executed => the check itself
  [/(?:package\.json|CHANGELOG\.md)$/i, /Changelogs/],
  [/(?:package\.json|\.babelrc)$/i, /NextjsApplications/],
  [/package\.json$/i, /WorkspacesApps/],
  // TODO: every test should define their own dependencies to scale well (?)
];

for (const [regexp, newTestRegex] of dependenciesTable) {
  if (
    changes.some(changedFile => {
      const testResult = regexp.test(changedFile);
      if (testResult) {
        console.warn(
          `Matched %s on file '%s' resulting in %s`,
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
const testRegex = testRegexps.length > 0 ? testRegexps : '.test.js$';
console.warn(testRegex);

module.exports = {
  rootDir: path.join(__dirname, 'tests'),
  testRegex,
  verbose: true,
  globals: {
    __DEV__: true,
    __SRC_ROOT__: srcRoot,
    __SRC_APPS_ROOT__: path.join(srcRoot, 'apps'),
    __SRC_PACKAGES_ROOT__: path.join(srcRoot, 'packages'),
  },
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  setupFilesAfterEnv: [path.join(__dirname, '.jest.setup.js')],
};
