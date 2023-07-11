// @flow strict

/* eslint-disable no-unused-vars */
const OFF = 0;
const WARN = 1;
const ERROR = 2;
/* eslint-enable no-unused-vars */

module.exports = {
  rules: {
    // Jest rules incompatible with Playwright:
    'jest/no-disabled-tests': OFF,
    'jest/no-standalone-expect': OFF,
    'jest/valid-title': OFF,
  },
};
