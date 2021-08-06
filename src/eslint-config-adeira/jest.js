// @flow

const getCommonConfig = require('./src/getCommonConfig');
const jestPreset = require('./src/presets/jest');
const { WARN } = require('./src/constants');

/*::

import type { EslintConfig } from './src/EslintConfig.flow';

*/

module.exports = (getCommonConfig(WARN, jestPreset) /*: EslintConfig */);
