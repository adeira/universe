// @flow

const getCommonConfig = require('./src/getCommonConfig');
const reactPreset = require('./src/presets/react');
const { WARN } = require('./src/constants');

/*::

import type { EslintConfig as EslintConfigType } from './src/EslintConfig.flow';

*/

const EslintConfig /*: EslintConfigType */ = getCommonConfig(WARN, reactPreset);

module.exports = EslintConfig;
