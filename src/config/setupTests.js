// @flow

import os from 'os';

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
          'Expected Error message to be:' +
          os.EOL +
          `  ${this.utils.printExpected(message)}\n` +
          'Received:' +
          os.EOL +
          `  ${this.utils.printReceived(received.message)}`,
      };
    }
    return {
      pass: false,
      message: () =>
        `expected ${received} to be instance of Error, ${typeof received} given`,
    };
  },
});
