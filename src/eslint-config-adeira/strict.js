// @flow

const changeNextVersionErrorLevel = require('./src/changeNextVersionErrorLevel');
const getCommonConfig = require('./src/getCommonConfig');
const prettierRules = require('./src/extraPrettierRules');
const basePreset = require('./src/presets/base');
const flowtypePreset = require('./src/presets/flowtype');
const jestPreset = require('./src/presets/jest');
const reactPreset = require('./src/presets/react');
const relayPreset = require('./src/presets/relay');
const { ERROR } = require('./src/constants');

/*::

import type { EslintConfig } from './src/EslintConfig.flow';

*/

module.exports = (getCommonConfig(
  changeNextVersionErrorLevel(
    {
      ...basePreset.rules,
      ...flowtypePreset.rules,
      ...jestPreset.rules,
      ...reactPreset.rules,
      ...relayPreset.rules,
      ...prettierRules,
    },
    ERROR,
  ),
  [
    //
    ...basePreset.plugins,
    ...flowtypePreset.plugins,
    ...jestPreset.plugins,
    ...reactPreset.plugins,
    ...relayPreset.plugins,
  ],
) /*: EslintConfig */);
