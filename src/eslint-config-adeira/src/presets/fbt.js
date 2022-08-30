// @flow

const { ERROR, OFF } = require('../constants');

/*::

import type { EslintConfig } from '../EslintConfig.flow';

*/

module.exports = ({
  plugins: ['eslint-plugin-fbt'],
  rules: {
    // FBT: https://github.com/alexandernanberg/eslint-plugin-fbt
    'fbt/no-empty-strings': ERROR,
    'fbt/no-unwrapped-strings': OFF, // TODO
  },
} /*: EslintConfig */);
