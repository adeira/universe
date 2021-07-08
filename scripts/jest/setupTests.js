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

type MaybeSpy =
  | {
      +calls?: {
        count: mixed,
        ...
      },
      ...
    }
  | { ... };

const isSpy = (spy: MaybeSpy): boolean %checks => {
  return spy.calls != null && typeof spy.calls.count === 'function';
};

// TODO: .toWarnDev() ?
// Inspired by React itself: https://github.com/facebook/react/blob/7841d0695ae4bde9848cf8953baf34d312d0cced/scripts/jest/setupTests.js
['error', 'warn', 'log', 'info', 'groupCollapsed'].forEach((methodName) => {
  const unexpectedConsoleCallStacks = [];
  const newMethod = function (format, ...args) {
    const stack = new Error().stack;
    unexpectedConsoleCallStacks.push([
      stack.substr(stack.indexOf('\n') + 1),
      util.format(format, ...args),
    ]);
  };

  // $FlowExpectedError[cannot-write]: these properties are not normally writable but it's expected in this case
  console[methodName] = newMethod;

  // TODO: which back to beforeEach, see https://github.com/facebook/jest/issues/11456
  global.beforeAll(() => {
    unexpectedConsoleCallStacks.length = 0;
  });

  // TODO: which back to afterEach, see https://github.com/facebook/jest/issues/11456
  global.afterAll(() => {
    if (console[methodName] !== newMethod && !isSpy(console[methodName])) {
      throw new Error(
        `Test did not tear down console.${methodName} mock properly. Did you call spy.mockRestore() or jest.restoreAllMocks()?`,
      );
    }

    if (unexpectedConsoleCallStacks.length > 0) {
      const messages = unexpectedConsoleCallStacks.map(
        ([stack, message]) =>
          `${chalk.red(message)}\n` +
          `${stack
            .split('\n')
            .map((line) => chalk.gray(line))
            .join('\n')}`,
      );

      const message =
        `Expected test not to call ${chalk.bold(`console.${methodName}()`)}.\n\n` +
        `If the console output is expected, test for it explicitly by mocking it out using ${chalk.bold(
          'jest.spyOn',
        )}(console, '${methodName}').mockImplementation(...) and test that the output occurs.`;

      throw new Error(`${message}\n\n${messages.join('\n\n')}`);
    }
  });
});
