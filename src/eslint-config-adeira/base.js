// @flow

const basePreset = require('./src/presets/base');
const getCommonConfig = require('./src/getCommonConfig');
const { WARN } = require('./src/constants');

/*::

import type { EslintConfig as EslintConfigType } from './src/EslintConfig.flow';

*/

const EslintConfig /*: EslintConfigType */ = getCommonConfig(WARN, basePreset);

module.exports = EslintConfig;
