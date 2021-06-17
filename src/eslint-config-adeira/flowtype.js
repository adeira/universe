// @flow

const { flowtype } = require('./presetsConfig');
const changeNextVersionErrorLevel = require('./changeNextVersionErrorLevel');
const getCommonConfig = require('./getCommonConfig');

/*::

import type { EslintConfig } from './EslintConfig.flow';

*/

const WARN = 1;

const preset = ({
  ...getCommonConfig(changeNextVersionErrorLevel(flowtype.rules, WARN)),
  plugins: flowtype.plugins,
} /*: EslintConfig */);

module.exports = preset;
