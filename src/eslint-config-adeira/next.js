// @flow

const changeNextVersionErrorLevel = require('./src/changeNextVersionErrorLevel');
const getCommonConfig = require('./src/getCommonConfig');
const nextPreset = require('./src/presets/next');
const { WARN } = require('./src/constants');

/*::

import type { EslintConfig } from './src/EslintConfig.flow';

*/

module.exports = (getCommonConfig(
  changeNextVersionErrorLevel(nextPreset.rules, WARN),
  nextPreset.plugins,
) /*: EslintConfig */);
