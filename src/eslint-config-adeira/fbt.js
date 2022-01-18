// @flow

const fbtPreset = require('./src/presets/fbt');
const getCommonConfig = require('./src/getCommonConfig');
const { WARN } = require('./src/constants');

/*::

import type { EslintConfig } from './src/EslintConfig.flow';

*/

module.exports = (getCommonConfig(WARN, fbtPreset) /*: EslintConfig */);
