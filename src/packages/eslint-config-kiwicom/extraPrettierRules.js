// @flow

/*::

import type { EslintConfigRules } from './EslintConfig.flow';

*/

module.exports = ({
  ...require('eslint-config-prettier').rules,
  ...require('eslint-config-prettier/babel').rules,
  ...require('eslint-config-prettier/flowtype').rules,
  ...require('eslint-config-prettier/react').rules,
} /*: EslintConfigRules */);
