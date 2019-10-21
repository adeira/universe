// @flow

const ourRules = require('./ourRules');
const changeNextVersionErrorLevel = require('./changeNextVersionErrorLevel');
const getCommonConfig = require('./getCommonConfig');

const ERROR = 2;

/*::

import type { EslintConfig } from './EslintConfig.flow';

*/

module.exports = (getCommonConfig(
  changeNextVersionErrorLevel(ourRules, ERROR),
) /*: EslintConfig */);
