// @flow strict

/* eslint-disable no-console */

import util from 'util';
import os from 'os';
import chalk from 'chalk';

/**
 * @see: https://facebook.github.io/jest/docs/expect.html#expectextendmatchers
 */
expect.extend({
  toBeError(received, message?: string = '') {
    if (received instanceof Error) {
      if (message === '' || message === received.message) {
        return {
          pass: true,
          message: () => 'expected value NOT to be instance of Error',
        };
      }
      return {
        pass: false,
        message: () =>
          /* $FlowFixMe[object-this-reference] This comment suppresses an error
           * when upgrading Flow to version 0.155.0. To see the error delete
           * this comment and run Flow. */
          `Expected Error message to be:${os.EOL}  ${this.utils.printExpected(message)}\n` +
          /* $FlowFixMe[object-this-reference] This comment suppresses an error
           * when upgrading Flow to version 0.155.0. To see the error delete
           * this comment and run Flow. */
          `Received:${os.EOL}  ${this.utils.printReceived(received.message)}`,
      };
    }
    return {
      pass: false,
      message: () => `expected ${received} to be instance of Error, ${typeof received} given`,
    };
  },
});

// Inspired by React itself: https://github.com/facebook/react/blob/7841d0695ae4bde9848cf8953baf34d312d0cced/scripts/jest/setupTests.js
['error', 'warn', 'log', 'info', 'groupCollapsed'].forEach((methodName) => {
  const unexpectedConsoleCalls = [];

  // $FlowExpectedError[cannot-write]: these properties are not normally writable but it's expected in this case
  console[methodName] = function (format, ...args) {
    unexpectedConsoleCalls.push(util.format(format, ...args));
  };

  // TODO: which back to beforeEach, see https://github.com/facebook/jest/issues/11456
  global.beforeAll(() => {
    unexpectedConsoleCalls.length = 0;
  });

  // TODO: which back to afterEach, see https://github.com/facebook/jest/issues/11456
  global.afterAll(() => {
    if (unexpectedConsoleCalls.length > 0) {
      const errorMessage =
        `Expected test suite not to call ${chalk.bold(`console.${methodName}()`)}.\n` +
        `If the console output is expected, test for it explicitly using ${chalk.bold(
          '@adeira/jest-disallow-console',
        )} package.\n\n` +
        `Unexpected console calls:`;

      const consoleMessages = unexpectedConsoleCalls.map(
        (message, index) => `${index + 1}) ${chalk.red(message)}\n`,
      );

      throw new Error(`${errorMessage}\n\n${consoleMessages.join('')}`);
    }
  });
});
