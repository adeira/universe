// @flow

const getCommonConfig = require('./src/getCommonConfig');
const prettierRules = require('./src/extraPrettierRules');
const basePreset = require('./src/presets/base');
const flowtypePreset = require('./src/presets/flowtype');
const jestPreset = require('./src/presets/jest');
const reactPreset = require('./src/presets/react');
const relayPreset = require('./src/presets/relay');
const { WARN } = require('./src/constants');

/*::

import type { EslintConfig } from './src/EslintConfig.flow';

*/

module.exports = (getCommonConfig(WARN, {
  rules: {
    ...basePreset.rules,
    ...flowtypePreset.rules,
    ...jestPreset.rules,
    ...reactPreset.rules,
    ...relayPreset.rules,
    ...prettierRules,
  },
  plugins: [
    ...basePreset.plugins,
    ...flowtypePreset.plugins,
    ...jestPreset.plugins,
    ...reactPreset.plugins,
    ...relayPreset.plugins,
  ],
  overrides: [
    ...(basePreset.overrides ?? []),
    ...(flowtypePreset.overrides ?? []),
    ...(jestPreset.overrides ?? []),
    ...(reactPreset.overrides ?? []),
    ...(relayPreset.overrides ?? []),
  ],
}) /*: EslintConfig */);
