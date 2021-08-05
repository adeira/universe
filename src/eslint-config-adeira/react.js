// @flow

const getCommonConfig = require('./src/getCommonConfig');
const reactPreset = require('./src/presets/react');
const { WARN } = require('./src/constants');

/*::

import type { EslintConfig } from './src/EslintConfig.flow';

*/

module.exports = (getCommonConfig(WARN, reactPreset) /*: EslintConfig */);
