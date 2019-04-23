// @flow strict

expect.extend({
  toGiveHelp(received, helpMessage) {
    if (received === true) {
      return {
        pass: true,
      };
    }

    return {
      message: () => helpMessage,
      pass: false,
    };
  },
});
