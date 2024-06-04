// @flow

/*::

import type { EslintConfigRules } from './EslintConfig.flow';

*/

// https://github.com/prettier/eslint-config-prettier#excluding-deprecated-rules
process.env.ESLINT_CONFIG_PRETTIER_NO_DEPRECATED = 'true';

const rules /*: EslintConfigRules */ = require('eslint-config-prettier').rules;

module.exports = rules;
