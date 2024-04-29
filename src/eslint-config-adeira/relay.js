// @flow

const getCommonConfig = require('./src/getCommonConfig');
const relayPreset = require('./src/presets/relay');
const { WARN } = require('./src/constants');

/*::

import type { EslintConfig as EslintConfigType } from './src/EslintConfig.flow';

*/

const EslintConfig /*: EslintConfigType */ = getCommonConfig(WARN, relayPreset);

module.exports = EslintConfig;
