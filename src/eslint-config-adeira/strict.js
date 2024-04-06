// @flow

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

module.exports = (getCommonConfig(ERROR, {
  plugins: {
    ...basePreset.plugins,
    ...flowtypePreset.plugins,
    ...jestPreset.plugins,
    ...reactPreset.plugins,
    ...relayPreset.plugins,
  },
  rules: {
    ...basePreset.rules,
    ...flowtypePreset.rules,
    ...jestPreset.rules,
    ...reactPreset.rules,
    ...relayPreset.rules,
    ...prettierRules,
  },
  overrides: [
    ...(basePreset.overrides ?? []),
    ...(flowtypePreset.overrides ?? []),
    ...(jestPreset.overrides ?? []),
    ...(reactPreset.overrides ?? []),
    ...(relayPreset.overrides ?? []),
  ],
  settings: {
    ...basePreset.settings,
    // $FlowFixMe[exponential-spread]
    ...flowtypePreset.settings,
    ...jestPreset.settings,
    ...reactPreset.settings,
    ...relayPreset.settings,
  },
}) /*: EslintConfig */);
