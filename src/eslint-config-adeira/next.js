// @flow

const getCommonConfig = require('./src/getCommonConfig');
const nextPreset = require('./src/presets/next');
const { WARN } = require('./src/constants');

/*::

import type { EslintConfig } from './src/EslintConfig.flow';

*/

module.exports = (getCommonConfig(WARN, nextPreset) /*: EslintConfig */);
