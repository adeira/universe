// @flow

const { relay } = require('./presetsConfig');
const changeNextVersionErrorLevel = require('./changeNextVersionErrorLevel');
const getCommonConfig = require('./getCommonConfig');

/*::

import type { EslintConfig } from './EslintConfig.flow';

*/

const WARN = 1;

const preset = ({
  ...getCommonConfig(changeNextVersionErrorLevel(relay.rules, WARN)),
  plugins: relay.plugins,
} /*: EslintConfig */);

module.exports = preset;
