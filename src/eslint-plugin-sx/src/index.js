// @flow

const getRules = require('./getRules');

module.exports = ({
  rules: getRules(),
} /*: {| +rules: {| +[ruleName: string]: string |} |} */);
