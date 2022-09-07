// @flow strict

/* eslint-disable no-unused-vars */
const OFF = 0;
const WARN = 1;
const ERROR = 2;
/* eslint-enable no-unused-vars */

module.exports = {
  rules: {
    // We are having here fixtures with invalid SX definitions (and other Eslint rules) on purpose:
    'sx/no-unused-stylesheet': OFF,
    'react/no-unknown-property': OFF,
  },
};
