// @flow strict

/* eslint-disable no-unused-vars */
const OFF = 0;
const WARN = 1;
const ERROR = 2;
/* eslint-enable no-unused-vars */

module.exports = {
  rules: {
    // we are having here fixtures with invalid SX definitions on purpose
    'sx/use-logical-properties': OFF,
  },
};
