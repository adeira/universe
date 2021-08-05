// @flow

const basePreset = require('./src/presets/base');
const getCommonConfig = require('./src/getCommonConfig');
const { WARN } = require('./src/constants');

/*::

import type { EslintConfig } from './src/EslintConfig.flow';

*/

module.exports = (getCommonConfig(WARN, basePreset) /*: EslintConfig */);
