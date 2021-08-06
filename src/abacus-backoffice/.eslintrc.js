// @flow strict

/* eslint-disable no-unused-vars */
const OFF = 0;
const WARN = 1;
const ERROR = 2;
/* eslint-enable no-unused-vars */

module.exports = {
  env: {
    browser: true,
  },
  extends: [
    '@adeira/eslint-config/strict', // preset with almost everything
    '@adeira/eslint-config/next', // additional Next.js rules
  ],
};
