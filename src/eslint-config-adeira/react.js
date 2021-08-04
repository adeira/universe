// @flow

const changeNextVersionErrorLevel = require('./src/changeNextVersionErrorLevel');
const getCommonConfig = require('./src/getCommonConfig');
const reactPreset = require('./src/presets/react');
const { WARN } = require('./src/constants');

/*::

import type { EslintConfig } from './src/EslintConfig.flow';

*/

module.exports = (getCommonConfig(
  changeNextVersionErrorLevel(reactPreset.rules, WARN),
  reactPreset.plugins,
) /*: EslintConfig */);
