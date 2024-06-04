// @flow

const flowtypePreset = require('./src/presets/flowtype');
const getCommonConfig = require('./src/getCommonConfig');
const { WARN } = require('./src/constants');

/*::

import type { EslintConfig as EslintConfigType } from './src/EslintConfig.flow';

*/

const EslintConfig /*: EslintConfigType */ = getCommonConfig(WARN, flowtypePreset);

module.exports = EslintConfig;
