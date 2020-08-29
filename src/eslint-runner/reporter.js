// @flow

const ProgressBar = require('progress');

class JestProgressBarReporter {
  _numTotalTestSuites /*: number  */ = 0;
  _bar /*: typeof ProgressBar  */;

  onRunStart(test /*: any */) {
    const { numTotalTestSuites } = test;
    this._numTotalTestSuites = numTotalTestSuites;
  }

  onTestStart() {
    if (this._bar == null) {
      this._bar = new ProgressBar(':bar :current/:total :percent', {
        complete: '█',
        incomplete: ' ',
        total: this._numTotalTestSuites,
      });
    }
  }

  onRunComplete(
    test /*: any */,
    results /*: {| +testResults: $ReadOnlyArray<{| +failureMessage: string |}> |} */,
  ) {
    results.testResults.forEach(({ failureMessage }) => {
      if (failureMessage) {
        console.log(failureMessage); // eslint-disable-line no-console
      }
    });
  }

  onTestResult() {
    this._bar.tick();
  }
}

module.exports = JestProgressBarReporter;
