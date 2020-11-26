// @flow strict

/* eslint-disable no-unused-vars */
const OFF = 0;
const WARN = 1;
const ERROR = 2;
/* eslint-enable no-unused-vars */

module.exports = {
  rules: {
    // TODO: use @adeira/relay
    'no-restricted-imports': OFF,
    'relay/graphql-naming': OFF,
  },
};
