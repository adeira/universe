// @flow

const { ERROR, OFF } = require('../constants');

/*::

import type { EslintConfig } from '../EslintConfig.flow';

*/

module.exports = ({
  plugins: ['eslint-plugin-relay'],
  rules: {
    // Relay (https://github.com/relayjs/eslint-plugin-relay)
    'relay/compat-uses-vars': OFF, // we do not use Relay Compat
    'relay/function-required-argument': ERROR,
    'relay/generated-flow-types': ERROR,
    'relay/graphql-naming': OFF, // no longer needed, see: https://github.com/facebook/relay/commit/ff1c10bc6595f3715f29660b46f779e000be9c70
    'relay/graphql-syntax': ERROR,
    'relay/hook-required-argument': ERROR,
    'relay/must-colocate-fragment-spreads': ERROR,
    'relay/no-future-added-value': ERROR,
    'relay/unused-fields': ERROR,
  },
} /*: EslintConfig */);
