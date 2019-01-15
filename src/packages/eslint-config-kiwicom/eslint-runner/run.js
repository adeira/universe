// @flow

const { pass, fail } = require('create-jest-runner');
const CLIEngine = require('eslint').CLIEngine;
const isCI = require('is-ci');

const formatter = require('./stylish');

// TODO: what to do with these messages?
global.console = {
  log: () => {},
  warn: () => {},
  error: () => {},
};

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
|}

*/

module.exports = ({ testPath } /*: Options */) => {
  const start = Date.now();

  const report = cliEngine.executeOnFiles([testPath]);
  if (PERFORM_FIXES) {
    CLIEngine.outputFixes(report);
  }

  const end = Date.now();
  const result = report.results[0];

  if (result.messages.length === 0) {
    return pass({ start, end, test: { path: testPath } });
  }
  return fail({
    start,
    end,
    test: {
      path: testPath,
      errorMessage: formatter(report.results),
    },
  });
};
