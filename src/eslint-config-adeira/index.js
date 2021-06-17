// @flow

const { ourRules } = require('./ourRules');
const prettierRules = require('./extraPrettierRules');
const changeNextVersionErrorLevel = require('./changeNextVersionErrorLevel');
const getCommonConfig = require('./getCommonConfig');

/*::

import type { EslintConfig } from './EslintConfig.flow';

*/

const WARN = 1;

const rules = {
  ...ourRules,
  ...prettierRules,
};

module.exports = (getCommonConfig(changeNextVersionErrorLevel(rules, WARN)) /*: EslintConfig */);
