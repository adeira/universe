// @flow

const ourRules = require('./ourRules');
const changeNextVersionErrorLevel = require('./changeNextVersionErrorLevel');
const getCommonConfig = require('./getCommonConfig');

const ERROR = 2;

module.exports = getCommonConfig(changeNextVersionErrorLevel(ourRules, ERROR));
