// @flow

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
          `Expected Error message to be:\n` +
          `  ${this.utils.printExpected(message)}\n` +
          `Received:\n` +
          `  ${this.utils.printReceived(received.message)}`,
      };
    } else {
      return {
        pass: false,
        message: () =>
          `expected ${received} to be instance of Error, ${typeof received} given`,
      };
    }
  },
});
