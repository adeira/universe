// @flow strict

const getRules = require('./getRules');

const EslintPlugin /*: { +rules: { +[ruleName: string]: string } } */ = {
  rules: getRules(),
};

module.exports = EslintPlugin;
