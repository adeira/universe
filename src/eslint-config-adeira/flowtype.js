// @flow

const flowtypePreset = require('./src/presets/flowtype');
const getCommonConfig = require('./src/getCommonConfig');
const { WARN } = require('./src/constants');

/*::

import type { EslintConfig } from './src/EslintConfig.flow';

*/

module.exports = (getCommonConfig(WARN, flowtypePreset) /*: EslintConfig */);
