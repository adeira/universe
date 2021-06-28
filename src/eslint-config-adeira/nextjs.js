// @flow

const { nextjs } = require('./presetsConfig');
const changeNextVersionErrorLevel = require('./changeNextVersionErrorLevel');
const getCommonConfig = require('./getCommonConfig');

/*::

import type { EslintConfig } from './EslintConfig.flow';

*/

const WARN = 1;

const preset = ({
  ...getCommonConfig(changeNextVersionErrorLevel(nextjs.rules, WARN)),
  plugins: nextjs.plugins,
} /*: EslintConfig */);

module.exports = preset;
