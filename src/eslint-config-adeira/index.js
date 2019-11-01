// @flow

const ourRules = require('./ourRules');
const changeNextVersionErrorLevel = require('./changeNextVersionErrorLevel');
const getCommonConfig = require('./getCommonConfig');

/*::

import type { EslintConfig } from './EslintConfig.flow';

*/

const WARN = 1;

module.exports = (getCommonConfig(changeNextVersionErrorLevel(ourRules, WARN)) /*: EslintConfig */);
