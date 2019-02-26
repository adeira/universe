// @flow

const os = require('os');
const { pass, fail, skip } = require('create-jest-runner');
const CLIEngine = require('eslint').CLIEngine;
const isCI = require('is-ci');
const { execSync } = require('child_process');

const formatter = require('./stylish');

const PERFORM_FIXES = isCI === false;
const cliEngine = new CLIEngine({
  fix: PERFORM_FIXES,
  reportUnusedDisableDirectives: true,
});

/*::

type Options = {|
  +testPath: string,
  +config: Object,
  +globalConfig: Object,
  +extraOptions: {|
    +runAll: boolean,
  |}
|}

*/

const changedFiles = (function() {
  function _parseRows(changes) {
    return changes.split(os.EOL).filter(row => row !== '');
  }

  const uncommittedChanges = _parseRows(
    execSync('git --no-pager diff --name-only HEAD', {
      encoding: 'utf8',
    }),
  );

  const changesInLastCommitFiles = _parseRows(
    execSync('git --no-pager diff --name-only HEAD^1 HEAD', {
      encoding: 'utf8',
    }),
  );

  return uncommittedChanges.length > 0
    ? uncommittedChanges
    : changesInLastCommitFiles;
})();

module.exports = ({ testPath, extraOptions } /*: Options */) => {
  const start = Date.now();

  if (cliEngine.isPathIgnored(testPath)) {
    return skip({
      start,
      end: start,
      test: {
        path: testPath,
      },
    });
  }

  if (extraOptions.runAll === false) {
    const normalizedPath = testPath
      .replace(process.cwd(), '')
      .replace(/^\//, '');

    if (changedFiles.includes(normalizedPath) === false) {
      return skip({
        start,
        end: start,
        test: {
          path: testPath,
        },
      });
    }
  }

  const report = cliEngine.executeOnFiles([testPath]);
  if (PERFORM_FIXES) {
    CLIEngine.outputFixes(report);
  }

  const end = Date.now();
  const result = report.results[0];

  if (result.errorCount === 0 && result.warningCount > 0) {
    return passWithWarning({
      start,
      end,
      test: {
        path: testPath,
        warningMessage: formatter(report.results),
      },
    });
  } else if (result.errorCount > 0) {
    return fail({
      start,
      end,
      test: {
        path: testPath,
        errorMessage: formatter(report.results),
      },
    });
  }

  return pass({ start, end, test: { path: testPath } });
};

function passWithWarning({ start, end, test }) {
  return {
    console: null,
    failureMessage: test.warningMessage,
    numFailingTests: 0,
    numPassingTests: 1,
    numPendingTests: 0,
    numTodoTests: 0,
    perfStats: {
      end: new Date(start).getTime(),
      start: new Date(end).getTime(),
    },
    skipped: false,
    snapshot: {
      added: 0,
      fileDeleted: false,
      matched: 0,
      unchecked: 0,
      unmatched: 0,
      updated: 0,
    },
    sourceMaps: {},
    testExecError: null,
    testFilePath: test.path,
    testResults: [
      {
        ancestorTitles: [],
        duration: end - start,
        failureMessages: [test.warningMessage],
        fullName: test.path,
        numPassingAsserts: test.warningMessage ? 1 : 0,
        status: test.warningMessage ? 'failed' : 'passed',
        title: '',
      },
    ],
  };
}
