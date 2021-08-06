// @flow

const { ERROR } = require('./constants');
const changeNextVersionErrorLevel = require('./changeNextVersionErrorLevel');

/*::

import type { EslintConfig } from './EslintConfig.flow';

*/

module.exports = function getCommonConfig(
  nextVersionErrorLevel /*: 0|1|2 */,
  baseConfig /*: EslintConfig */,
) /*: EslintConfig */ {
  return {
    rules: {
      ...changeNextVersionErrorLevel(baseConfig.rules, nextVersionErrorLevel),
      // overwriting Prettier rules, see: https://github.com/prettier/eslint-config-prettier/blob/9444ee0b20f9af3ff364f62d6a9ab967ad673a9d/README.md#special-rules
      'curly': [ERROR, 'all'], // TODO: move to the "base" preset only
      // TODO: move to the "base" preset only:
      'prettier/prettier': [
        ERROR,
        {
          // see: prettier.config.js
          bracketSpacing: true,
          printWidth: 100, // see: https://prettier.io/docs/en/options.html#print-width
          singleQuote: true,
          tabWidth: 2,
          trailingComma: 'all',
          quoteProps: 'consistent',
        },
      ],
    },

    settings: { ...baseConfig.settings },

    globals: {
      global: 'readonly', // TODO: make it 'off'
      globalThis: 'readonly', // https://github.com/tc39/proposal-global
      __DEV__: 'readonly',
      FormData: 'readonly', // https://developer.mozilla.org/en-US/docs/Web/API/FormData
    },

    plugins: [
      ...baseConfig.plugins,
      'eslint-plugin-prettier', // TODO: move to the "base" preset only
    ],

    overrides: [...(baseConfig.overrides ?? [])],
  };
};
