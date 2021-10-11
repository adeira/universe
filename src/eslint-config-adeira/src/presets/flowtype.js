// @flow

const { ERROR, OFF, WARN } = require('../constants');

/*::

import type { EslintConfig } from '../EslintConfig.flow';

*/

module.exports = ({
  plugins: ['eslint-plugin-ft-flow', 'eslint-plugin-fb-flow'],
  rules: {
    // Flow:
    //  - https://github.com/flow-typed/eslint-plugin-ft-flow
    //  - https://github.com/gajus/eslint-plugin-flowtype
    'ft-flow/array-style-complex-type': OFF,
    'ft-flow/array-style-simple-type': OFF,
    'ft-flow/arrow-parens': OFF,
    'ft-flow/boolean-style': OFF, // TODO: enable (?)
    'ft-flow/define-flow-type': WARN,
    'ft-flow/delimiter-dangle': OFF,
    'ft-flow/enforce-line-break': OFF,
    'ft-flow/enforce-suppression-code': ERROR,
    'ft-flow/generic-spacing': OFF,
    'ft-flow/interface-id-match': OFF,
    'ft-flow/newline-after-flow-annotation': [ERROR, 'always'],
    'ft-flow/no-dupe-keys': ERROR,
    'ft-flow/no-duplicate-type-union-intersection-members': ERROR,
    'ft-flow/no-existential-type': ERROR, // https://github.com/facebook/flow/issues/6308
    'ft-flow/no-flow-fix-me-comments': OFF,
    'ft-flow/no-flow-suppressions-in-strict-files': OFF, // TODO: enable (after fixing our codebase)
    'ft-flow/no-internal-flow-type': ERROR,
    'ft-flow/no-mixed': OFF,
    'ft-flow/no-mutable-array': OFF,
    'ft-flow/no-primitive-constructor-types': WARN,
    'ft-flow/no-types-missing-file-annotation': ERROR,
    'ft-flow/no-unused-expressions': [ERROR, { allowTaggedTemplates: true }],
    'ft-flow/no-weak-types': [
      ERROR,
      {
        // codeshift: https://github.com/facebook/flow/issues/7291
        any: false,
        Object: true, // { +[key: string]: any, ... }
        Function: true, // (...args: $ReadOnlyArray<any>) => any   -OR-   { [[call]]: any, ... }
      },
    ],
    'ft-flow/object-type-curly-spacing': OFF,
    'ft-flow/object-type-delimiter': OFF,
    'ft-flow/quotes': OFF,
    'ft-flow/require-compound-type-alias': OFF,
    'ft-flow/require-exact-type': OFF, // see: fb-flow/use-exact-by-default-object-type
    'ft-flow/require-indexer-name': OFF,
    'ft-flow/require-inexact-type': OFF,
    'ft-flow/require-parameter-type': OFF,
    'ft-flow/require-readonly-react-props': [
      ERROR,
      {
        useImplicitExactTypes: true,
      },
    ],
    'ft-flow/require-return-type': OFF,
    'ft-flow/require-types-at-top': OFF,
    'ft-flow/require-valid-file-annotation': [ERROR, 'always'],
    'ft-flow/require-variable-type': OFF,
    'ft-flow/semi': OFF,
    'ft-flow/sort-keys': OFF,
    'ft-flow/sort-type-union-intersection-members': OFF,
    'ft-flow/space-after-type-colon': OFF,
    'ft-flow/space-before-generic-bracket': OFF,
    'ft-flow/space-before-type-colon': OFF,
    'ft-flow/spread-exact-type': OFF, // TODO: WARN?
    'ft-flow/type-id-match': OFF,
    'ft-flow/type-import-style': OFF,
    'ft-flow/union-intersection-spacing': OFF,
    'ft-flow/use-flow-type': WARN,
    'ft-flow/use-read-only-spread': ERROR,
    'ft-flow/valid-syntax': OFF,

    // Flow FB: https://github.com/facebook/flow/tree/master/packages/eslint-plugin-fb-flow
    'fb-flow/flow-enums-default-if-possible': ERROR,
    'fb-flow/no-flow-enums-object-mapping': ERROR,
    'fb-flow/use-exact-by-default-object-type': ERROR, // we are using `exact_by_default=true`
    'fb-flow/use-flow-enums': ERROR,
    'fb-flow/use-indexed-access-type': ERROR,
  },
} /*: EslintConfig */);
