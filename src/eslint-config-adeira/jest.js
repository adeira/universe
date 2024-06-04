// @flow

const getCommonConfig = require('./src/getCommonConfig');
const jestPreset = require('./src/presets/jest');
const { WARN } = require('./src/constants');

/*::

import type { EslintConfig as EslintConfigType } from './src/EslintConfig.flow';

*/

const EslintConfig /*: EslintConfigType */ = getCommonConfig(WARN, jestPreset);

module.exports = EslintConfig;
