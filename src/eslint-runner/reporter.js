// @flow

const ProgressBar = require('progress');
const chalk = require('chalk');

/* eslint-disable no-console */

/*::
type RunCompleteResults = {|
  +numFailedTestSuites: number,
  +numFailedTests: number,
  +numPassedTestSuites: number,
  +numPassedTests: number,
  +numPendingTestSuites: number,
  +numPendingTests: number,
  +numRuntimeErrorTestSuites: number,
  +numTodoTests: number,
  +numTotalTestSuites: number,
  +numTotalTests: number,
  +openHandles: $ReadOnlyArray<any>, // TODO
  +snapshot: {|
    +added: number,
    +didUpdate: boolean,
    +failure: boolean,
    +filesAdded: number,
    +filesRemoved: number,
    +filesRemovedList: $ReadOnlyArray<string>,
    +filesUnmatched: number,
    +filesUpdated: number,
    +matched: number,
    +total: number,
    +unchecked: number,
    +uncheckedKeysByFile: number,
    +unmatched: number,
    +updated: number,
  |},
  +startTime: number,
  +success: boolean,
  +wasInterrupted: boolean,
  +testResults: $ReadOnlyArray<{|
    +numFailingTests: number,
    +numPassingTests: number,
    +numPendingTests: number,
    +numTodoTests: number,
    +failureMessage?: string,
  |}>,
|};
*/

class JestProgressBarReporter {
  _numTotalTestSuites /*: number  */ = 0;
  _bar /*: typeof ProgressBar  */;

  onRunStart(test /*: any */) /*: void */ {
    const { numTotalTestSuites } = test;
    this._numTotalTestSuites = numTotalTestSuites;
  }

  onTestStart() /*: void */ {
    if (this._bar == null) {
      // Note that the space behind :total is necessary so that the cursor doesn't cover the last number of the total.
      this._bar = new ProgressBar(':bar :current/:total ', {
        complete: '█',
        incomplete: '░',
        total: this._numTotalTestSuites,
      });
    }
  }

  onTestResult() /*: void */ {
    this._bar.tick();
  }

  onRunComplete(test /*: any */, results /*: RunCompleteResults */) /*: void */ {
    // TODO: there might be an obsolete .snap file which causes Eslint Runner to fail (should be handle it?)

    results.testResults.forEach(({ failureMessage }) => {
      if (failureMessage != null) {
        console.log(failureMessage);
      }
    });

    if (results.numFailedTests === 0) {
      // Print basic stats when there are no failures:
      console.warn(
        'Skipped files: %s (no changes)',
        chalk.bold.yellow(String(results.numPendingTests)),
      );
      console.warn('Checked files: %s', chalk.bold.green(String(results.numPassedTests)));
    }
  }
}

module.exports = JestProgressBarReporter;
