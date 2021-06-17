// @flow

const { jest } = require('./presetsConfig');
const changeNextVersionErrorLevel = require('./changeNextVersionErrorLevel');
const getCommonConfig = require('./getCommonConfig');

/*::

import type { EslintConfig } from './EslintConfig.flow';

*/

const WARN = 1;

const preset = ({
  ...getCommonConfig(changeNextVersionErrorLevel(jest.rules, WARN)),
  plugins: jest.plugins,
} /*: EslintConfig */);

module.exports = preset;
