// @flow

require('@babel/register'); // to be able to use non-transpiled '@adeira/monorepo-utils' here

const { pass, fail, skip } = require('create-jest-runner');
const CLIEngine = require('eslint').CLIEngine;
const isCI = require('is-ci');
const { Git } = require('@adeira/monorepo-utils');

const formatter = require('./stylish');
const shouldLintAll = require('./shouldLintAll').default;

const PERFORM_FIXES = isCI === false;
const cliEngine = new CLIEngine({
  fix: PERFORM_FIXES,
  reportUnusedDisableDirectives: true,
});

/*::

type Options = {|
  +testPath: string,
  +config: { [key: string]: any, ... },
  +globalConfig: { [key: string]: any, ... },
  +extraOptions: {|
    +runAll: boolean,
  |}
|}

*/

// TODO: we should eventually get rid of 'create-jest-runner' dependency and use our own
//  implementation with this built-in mechanism. This way we don't have to iterate all the files
//  and skipping them.
const changedFiles = Git.getChangesToTest();

module.exports = ({ testPath, extraOptions } /*: Options */) /*: { +[string]: mixed, ... } */ => {
  const start = Date.now();

  let runAll = extraOptions.runAll;
  for (const changedFile of changedFiles) {
    if (shouldLintAll(changedFile)) {
      runAll = true;
      break;
    }
  }

  if (cliEngine.isPathIgnored(testPath)) {
    return skip({
      start,
      end: start,
      test: {
        path: testPath,
      },
    });
  }

  if (runAll === false) {
    const normalizedPath = testPath.replace(process.cwd(), '').replace(/^\//, '');
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
