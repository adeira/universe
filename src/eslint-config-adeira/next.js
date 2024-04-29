// @flow

const getCommonConfig = require('./src/getCommonConfig');
const nextPreset = require('./src/presets/next');
const { WARN } = require('./src/constants');

/*::

import type { EslintConfig as EslintConfigType } from './src/EslintConfig.flow';

*/

const EslintConfig /*: EslintConfigType */ = getCommonConfig(WARN, nextPreset);

module.exports = EslintConfig;
