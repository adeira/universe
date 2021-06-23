// @flow

const { ourRules } = require('./ourRules');
const prettierRules = require('./extraPrettierRules');
const changeNextVersionErrorLevel = require('./changeNextVersionErrorLevel');
const getCommonConfig = require('./getCommonConfig');

const ERROR = 2;

/*::

import type { EslintConfig } from './EslintConfig.flow';

*/

const rules = {
  ...ourRules,
  ...prettierRules,
};

module.exports = (getCommonConfig(changeNextVersionErrorLevel(rules, ERROR)) /*: EslintConfig */);
