// @flow

const { ERROR, OFF, WARN } = require('../constants');

/*::

import type { EslintConfig } from '../EslintConfig.flow';

*/

module.exports = ({
  plugins: ['eslint-plugin-flowtype', 'eslint-plugin-fb-flow'],
  rules: {
    // flowtype (https://github.com/gajus/eslint-plugin-flowtype)
    'flowtype/array-style-complex-type': OFF,
    'flowtype/array-style-simple-type': OFF,
    'flowtype/arrow-parens': OFF,
    'flowtype/define-flow-type': WARN,
    'flowtype/enforce-line-break': OFF,
    'flowtype/interface-id-match': OFF,
    'flowtype/newline-after-flow-annotation': [ERROR, 'always'],
    'flowtype/no-dupe-keys': ERROR,
    'flowtype/no-existential-type': ERROR, // https://github.com/facebook/flow/issues/6308
    'flowtype/no-flow-fix-me-comments': OFF,
    'flowtype/no-internal-flow-type': ERROR,
    'flowtype/no-mixed': OFF,
    'flowtype/no-mutable-array': OFF,
    'flowtype/no-primitive-constructor-types': WARN,
    'flowtype/no-types-missing-file-annotation': ERROR,
    'flowtype/no-unused-expressions': [ERROR, { allowTaggedTemplates: true }],
    'flowtype/no-weak-types': [
      ERROR,
      {
        // codeshift: https://github.com/facebook/flow/issues/7291
        any: false,
        Object: true, // { +[key: string]: any, ... }
        Function: true, // (...args: $ReadOnlyArray<any>) => any   -OR-   { [[call]]: any, ... }
      },
    ],
    'flowtype/require-compound-type-alias': OFF,
    'flowtype/require-exact-type': [ERROR, 'never'], // we are using `exact_by_default=true`
    'flowtype/require-indexer-name': OFF,
    'flowtype/require-inexact-type': OFF,
    'flowtype/require-parameter-type': OFF,
    'flowtype/require-readonly-react-props': [
      ERROR,
      {
        useImplicitExactTypes: true,
      },
    ],
    'flowtype/require-return-type': OFF,
    'flowtype/require-types-at-top': OFF,
    'flowtype/require-valid-file-annotation': [ERROR, 'always'],
    'flowtype/require-variable-type': OFF,
    'flowtype/sort-keys': OFF,
    'flowtype/spread-exact-type': OFF, // TODO: WARN?
    'flowtype/type-id-match': OFF,
    'flowtype/type-import-style': OFF,
    'flowtype/use-flow-type': WARN,
    'flowtype/use-read-only-spread': ERROR,
    'flowtype/valid-syntax': OFF,

    // Flow FB: https://github.com/facebook/flow/tree/master/packages/eslint-plugin-fb-flow
    'fb-flow/use-indexed-access-type': OFF, // TODO (revert https://github.com/adeira/universe/pull/2662)
  },
} /*: EslintConfig */);
