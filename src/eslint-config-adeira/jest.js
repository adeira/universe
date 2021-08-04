// @flow

const changeNextVersionErrorLevel = require('./src/changeNextVersionErrorLevel');
const getCommonConfig = require('./src/getCommonConfig');
const jestPreset = require('./src/presets/jest');
const { WARN } = require('./src/constants');

/*::

import type { EslintConfig } from './src/EslintConfig.flow';

*/

module.exports = (getCommonConfig(
  changeNextVersionErrorLevel(jestPreset.rules, WARN),
  jestPreset.plugins,
) /*: EslintConfig */);
