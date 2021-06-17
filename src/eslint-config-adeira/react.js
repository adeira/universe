// @flow

const { react } = require('./presetsConfig');
const changeNextVersionErrorLevel = require('./changeNextVersionErrorLevel');
const getCommonConfig = require('./getCommonConfig');

/*::

import type { EslintConfig } from './EslintConfig.flow';

*/

const WARN = 1;

const preset = ({
  ...getCommonConfig(changeNextVersionErrorLevel(react.rules, WARN)),
  plugins: react.plugins,
} /*: EslintConfig */);

module.exports = preset;
