// @flow

const { ERROR, OFF, WARN, NEXT_VERSION_ERROR } = require('../constants');

/*::

import type { EslintConfig } from '../EslintConfig.flow';

*/

module.exports = ({
  plugins: [
    'eslint-plugin-import',
    'eslint-plugin-monorepo',
    'eslint-plugin-n',
    'eslint-plugin-eslint-comments',
    'eslint-plugin-promise',
    'eslint-plugin-adeira',
    'eslint-plugin-sx',
  ],
  rules: {
    // Possible Errors (http://eslint.org/docs/rules/#possible-errors)
    'for-direction': ERROR,
    'getter-return': ERROR,
    'no-async-promise-executor': ERROR,
    'no-compare-neg-zero': ERROR,
    'no-cond-assign': ERROR,
    'no-console': ERROR,
    'no-constant-condition': [ERROR, { checkLoops: false }],
    'no-control-regex': ERROR,
    'no-debugger': ERROR,
    'no-dupe-args': ERROR,
    'no-dupe-else-if': ERROR,
    'no-dupe-keys': ERROR,
    'no-duplicate-case': ERROR,
    'no-empty': [WARN, { allowEmptyCatch: true }],
    'no-empty-character-class': ERROR,
    'no-ex-assign': ERROR,
    'no-extra-boolean-cast': ERROR,
    'no-func-assign': ERROR,
    'no-import-assign': ERROR,
    'no-inner-declarations': OFF,
    'no-invalid-regexp': ERROR,
    'no-irregular-whitespace': ERROR,
    'no-misleading-character-class': ERROR,
    'no-obj-calls': ERROR,
    'no-promise-executor-return': ERROR,
    'no-prototype-builtins': ERROR,
    'no-regex-spaces': ERROR,
    'no-setter-return': ERROR,
    'no-sparse-arrays': ERROR,
    'no-template-curly-in-string': ERROR,
    'no-unreachable': ERROR,
    'no-unreachable-loop': ERROR,
    'no-unsafe-finally': ERROR,
    'no-unsafe-negation': ERROR,
    'no-unsafe-optional-chaining': ERROR,
    'no-unused-private-class-members': ERROR,
    'require-atomic-updates': ERROR,
    'use-isnan': [ERROR, { enforceForSwitchCase: true }],
    'valid-jsdoc': OFF,
    'valid-typeof': ERROR,

    // Best Practices (http://eslint.org/docs/rules/#best-practices)
    'accessor-pairs': [WARN, { setWithoutGet: true }],
    'array-callback-return': ERROR,
    'block-scoped-var': OFF,
    'class-methods-use-this': OFF,
    'complexity': OFF,
    'consistent-return': [ERROR, { treatUndefinedAsUnspecified: false }],
    'default-case': OFF,
    'default-case-last': ERROR,
    'default-param-last': ERROR,
    'dot-notation': ERROR,
    'eqeqeq': [ERROR, 'smart'],
    'grouped-accessor-pairs': OFF,
    'guard-for-in': ERROR,
    'max-classes-per-file': OFF,
    'no-alert': WARN,
    'no-await-in-loop': WARN,
    'no-caller': ERROR,
    'no-case-declarations': ERROR,
    'no-constructor-return': ERROR,
    'no-div-regex': WARN,
    'no-else-return': ERROR,
    'no-empty-function': OFF,
    'no-empty-pattern': ERROR,
    'no-eq-null': OFF,
    'no-eval': ERROR,
    'no-extend-native': WARN,
    'no-extra-bind': WARN,
    'no-extra-label': ERROR,
    'no-fallthrough': ERROR,
    'no-global-assign': [ERROR, { exceptions: ['Map', 'Set'] }],
    'no-implicit-coercion': [
      ERROR,
      {
        allow: ['!!'], // allows `!!foo` pattern which is fairly common
      },
    ],
    'no-implicit-globals': OFF,
    'no-implied-eval': ERROR,
    'no-invalid-this': OFF,
    'no-iterator': ERROR,
    'no-labels': [ERROR, { allowLoop: true, allowSwitch: true }],
    'no-lone-blocks': ERROR,
    'no-loop-func': ERROR,
    'no-loss-of-precision': ERROR,
    'no-magic-numbers': OFF,
    'no-multi-str': ERROR,
    'no-new': WARN,
    'no-new-func': ERROR,
    'no-new-wrappers': WARN,
    'no-nonoctal-decimal-escape': ERROR,
    'no-octal': ERROR,
    'no-octal-escape': ERROR,
    'no-param-reassign': ERROR,
    'no-proto': ERROR,
    'no-redeclare': [ERROR, { builtinGlobals: true }],
    'no-restricted-exports': OFF,
    'no-restricted-properties': OFF,
    'no-return-assign': WARN,
    'no-return-await': WARN,
    'no-script-url': ERROR,
    'no-self-assign': WARN,
    'no-self-compare': WARN,
    'no-sequences': WARN,
    'no-throw-literal': WARN,
    'no-unmodified-loop-condition': OFF,
    'no-unused-expressions': OFF, // see: flow/no-unused-expressions
    'no-unused-labels': WARN,
    'no-useless-backreference': ERROR,
    'no-useless-call': WARN,
    'no-useless-catch': ERROR,
    'no-useless-concat': ERROR,
    'no-useless-escape': ERROR,
    'no-useless-return': WARN,
    'no-void': WARN,
    'no-warning-comments': OFF,
    'no-with': ERROR,
    'prefer-named-capture-group': ERROR,
    'prefer-promise-reject-errors': WARN,
    'prefer-regex-literals': ERROR,
    'radix': ERROR,
    'require-await': ERROR,
    'require-unicode-regexp': OFF,
    'vars-on-top': ERROR,
    'yoda': ERROR,

    // Strict Mode (http://eslint.org/docs/rules/#strict-mode)
    'strict': WARN,

    // Variables (http://eslint.org/docs/rules/#variables)
    'init-declarations': OFF,
    'no-delete-var': ERROR,
    'no-label-var': ERROR,
    'no-restricted-globals': OFF,
    'no-shadow': OFF,
    'no-shadow-restricted-names': ERROR,
    'no-undef': OFF, // not needed with Flow and `hermes-eslint` parser (superfluous rule)
    'no-undef-init': ERROR,
    'no-undefined': OFF,
    'no-unused-vars': [
      ERROR,
      {
        args: 'after-used',
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_$', // (_) => { … }
        varsIgnorePattern: '^fbt$', // https://github.com/yannickcr/eslint-plugin-react/issues/3080
      },
    ],
    'no-use-before-define': OFF, // https://github.com/babel/babel-eslint/issues/485

    // Node.js and CommonJS (http://eslint.org/docs/rules/#nodejs-and-commonjs)
    'callback-return': OFF, // see: node/callback-return (https://github.com/mysticatea/eslint-plugin-node/pull/206)
    'global-require': OFF, // see: node/global-require (https://github.com/mysticatea/eslint-plugin-node/pull/206)
    'handle-callback-err': WARN, // see: node/handle-callback-err (https://github.com/mysticatea/eslint-plugin-node/pull/206)
    'no-buffer-constructor': WARN,
    'no-mixed-requires': OFF, // see: node/no-mixed-requires (https://github.com/mysticatea/eslint-plugin-node/pull/206)
    'no-new-require': WARN, // see: node/no-new-require (https://github.com/mysticatea/eslint-plugin-node/pull/206)
    'no-path-concat': WARN, // see: node/no-path-concat (https://github.com/mysticatea/eslint-plugin-node/pull/206)
    'no-process-env': OFF, // see: node/no-process-env (https://github.com/mysticatea/eslint-plugin-node/pull/206)
    'no-process-exit': OFF, // see: node/no-process-exit (https://github.com/mysticatea/eslint-plugin-node/pull/206)
    'no-restricted-modules': OFF,
    'no-sync': OFF, // see: node/no-sync (https://github.com/mysticatea/eslint-plugin-node/pull/206)

    // Stylistic Issues (http://eslint.org/docs/rules/#stylistic-issues)
    'camelcase': [
      ERROR,
      {
        ignoreDestructuring: false,
        properties: 'never', // it's quite common to have object properties mixed
      },
    ],
    'capitalized-comments': OFF,
    'consistent-this': OFF,
    'func-name-matching': OFF,
    'func-names': OFF,
    'func-style': OFF,
    'id-denylist': OFF,
    'id-length': OFF,
    'id-match': OFF,
    'line-comment-position': OFF,
    'lines-between-class-members': [WARN, 'always', { exceptAfterSingleLine: true }],
    'max-depth': OFF,
    'max-lines': OFF,
    'max-lines-per-function': OFF,
    'max-nested-callbacks': OFF,
    'max-params': OFF,
    'max-statements': OFF,
    'max-statements-per-line': OFF,
    'multiline-comment-style': OFF,
    'new-cap': [
      WARN,
      {
        newIsCap: true,
        capIsNew: false,
      },
    ],
    'no-array-constructor': WARN,
    'no-bitwise': ERROR,
    'no-continue': OFF,
    'no-inline-comments': OFF,
    'no-lonely-if': ERROR,
    'no-multi-assign': ERROR,
    'no-negated-condition': OFF,
    'no-nested-ternary': ERROR,
    'no-new-object': WARN,
    'no-plusplus': OFF,
    'no-restricted-syntax': OFF,
    'no-ternary': OFF,
    'no-underscore-dangle': OFF,
    'no-unneeded-ternary': WARN,
    'one-var': [WARN, { initialized: 'never' }],
    'operator-assignment': WARN,
    'padding-line-between-statements': OFF,
    'prefer-exponentiation-operator': ERROR,
    'prefer-object-spread': ERROR,
    'require-jsdoc': OFF,
    'sort-keys': OFF,
    'sort-vars': OFF,
    'spaced-comment': [
      ERROR,
      'always',
      {
        block: {
          balanced: true,
          markers: [':', '::'], // flow
        },
      },
    ],

    // ECMAScript 6 (http://eslint.org/docs/rules/#ecmascript-6)
    'arrow-body-style': OFF,
    'constructor-super': ERROR,
    'no-class-assign': WARN,
    'no-const-assign': ERROR,
    'no-constant-binary-expression': ERROR,
    'no-dupe-class-members': ERROR,
    'no-duplicate-imports': OFF,
    'no-new-symbol': WARN,
    'no-restricted-imports': OFF, // see: node/no-restricted-import (https://github.com/mysticatea/eslint-plugin-node/pull/206)
    'no-this-before-super': ERROR,
    'no-useless-computed-key': OFF, // Flow doesn't work with non-string literal property keys, https://github.com/facebook/flow/issues/380
    'no-useless-constructor': ERROR,
    'no-useless-rename': WARN,
    'no-var': ERROR,
    'prefer-arrow-callback': OFF,
    'object-shorthand': OFF,
    'prefer-const': [ERROR, { destructuring: 'all' }],
    'prefer-destructuring': OFF,
    'prefer-numeric-literals': OFF,
    'prefer-object-has-own': OFF, // TODO: NEXT_VERSION_ERROR (?) (https://eslint.org/docs/rules/prefer-object-has-own)
    'prefer-rest-params': WARN,
    'prefer-spread': WARN,
    'prefer-template': ERROR,
    'require-yield': ERROR,
    'sort-imports': OFF,
    'symbol-description': ERROR,

    // import (https://github.com/benmosher/eslint-plugin-import)
    'import/default': OFF,
    'import/dynamic-import-chunkname': OFF,
    'import/export': ERROR,
    'import/exports-last': OFF,
    'import/extensions': [ERROR, 'never', { json: 'always' }],
    'import/first': ERROR,
    'import/group-exports': OFF,
    'import/imports-first': OFF,
    'import/named': OFF, // TODO: warn? seems to be broken
    'import/namespace': OFF,
    'import/newline-after-import': ERROR,
    'import/no-absolute-path': ERROR,
    'import/no-amd': ERROR,
    'import/no-anonymous-default-export': [
      ERROR,
      {
        allowArray: true,
        allowArrowFunction: false,
        allowAnonymousClass: false,
        allowAnonymousFunction: false,
        allowCallExpression: true,
        allowLiteral: true,
        allowObject: true,
      },
    ],
    'import/no-commonjs': OFF,
    'import/no-cycle': WARN,
    'import/no-default-export': OFF,
    'import/no-deprecated': OFF,
    'import/no-duplicates': ERROR,
    'import/no-dynamic-require': OFF,
    'import/no-extraneous-dependencies': [
      ERROR,
      {
        devDependencies: [
          '**/*.spec.js',
          '**/*.stories.js',
          '**/*.test.js',
          '**/.storybook/**',
          '**/__flowtests__/**',
          '**/__tests__/**',
          '**/metro.config.js',
          '**/webpack.config.js',
        ],
      },
    ],
    'import/no-import-module-exports': OFF,
    'import/no-internal-modules': OFF,
    'import/no-mutable-exports': ERROR,
    'import/no-named-as-default': OFF,
    'import/no-named-as-default-member': OFF,
    'import/no-named-default': ERROR,
    'import/no-named-export': OFF,
    'import/no-namespace': OFF,
    'import/no-nodejs-modules': OFF,
    'import/no-relative-packages': ERROR,
    'import/no-relative-parent-imports': OFF,
    'import/no-restricted-paths': OFF,
    'import/no-unassigned-import': OFF,
    'import/no-unresolved': [
      ERROR,
      {
        // compatible with Relay 'artifactDirectory'
        ignore: ['^__generated__/'],
      },
    ],
    'import/no-useless-path-segments': ERROR,
    'import/no-webpack-loader-syntax': ERROR,
    'import/max-dependencies': OFF,
    'import/order': [
      ERROR,
      {
        'groups': [['builtin', 'external'], ['parent', 'sibling'], 'index'],
        'newlines-between': 'always',
      },
    ],
    'import/prefer-default-export': OFF,
    'import/no-self-import': ERROR,
    'import/no-unused-modules': OFF, // TODO: warn?
    'import/unambiguous': OFF, // TODO: warn?

    // monorepo (https://github.com/azz/eslint-plugin-monorepo)
    // TODO: remove (see `import/no-relative-packages` and new ESM modules resolution with `exports` field)
    'monorepo/no-internal-import': ERROR,
    'monorepo/no-relative-import': ERROR,

    // TODO: change when the situation settles and we have one maintained Eslint plugin for Node.js (vv)
    // Node.js (https://github.com/weiran-zsd/eslint-plugin-node)
    // Node.js (https://github.com/mysticatea/eslint-plugin-node)
    'n/callback-return': OFF, // see: callback-return (https://github.com/mysticatea/eslint-plugin-node/pull/206)
    'n/exports-style': OFF,
    'n/file-extension-in-import': [ERROR, 'always', { '.js': 'never' }],
    'n/global-require': OFF, // see: global-require (https://github.com/mysticatea/eslint-plugin-node/pull/206)
    'n/handle-callback-err': WARN, // see: handle-callback-err (https://github.com/mysticatea/eslint-plugin-node/pull/206)
    'n/no-callback-literal': ERROR,
    'n/no-deprecated-api': ERROR,
    'n/no-exports-assign': ERROR,
    'n/no-extraneous-import': OFF, // see: import/no-extraneous-dependencies
    'n/no-extraneous-require': OFF, // see: import/no-extraneous-dependencies
    'n/no-missing-import': OFF,
    'n/no-missing-require': ERROR,
    'n/no-mixed-requires': OFF, // see: no-mixed-requires (https://github.com/mysticatea/eslint-plugin-node/pull/206)
    'n/no-new-require': WARN, // see: no-new-require (https://github.com/mysticatea/eslint-plugin-node/pull/206)
    'n/no-path-concat': WARN, // see: no-path-concat (https://github.com/mysticatea/eslint-plugin-node/pull/206)
    'n/no-process-env': OFF, // see: no-process-env (https://github.com/mysticatea/eslint-plugin-node/pull/206)
    'n/no-process-exit': OFF, // see: no-process-exit (https://github.com/mysticatea/eslint-plugin-node/pull/206)
    'n/no-restricted-import': OFF, // see: no-restricted-import (https://github.com/mysticatea/eslint-plugin-node/pull/206)
    'n/no-restricted-require': OFF,
    'n/no-sync': OFF, // see: no-sync (https://github.com/mysticatea/eslint-plugin-node/pull/206)
    'n/no-unpublished-bin': ERROR,
    'n/no-unpublished-import': OFF,
    'n/no-unpublished-require': OFF,
    'n/no-unsupported-features/es-builtins': OFF,
    'n/no-unsupported-features/es-syntax': OFF,
    'n/no-unsupported-features/node-builtins': OFF,
    'n/prefer-global/buffer': ERROR,
    'n/prefer-global/console': ERROR,
    'n/prefer-global/process': ERROR,
    'n/prefer-global/text-decoder': OFF,
    'n/prefer-global/text-encoder': OFF,
    'n/prefer-global/url': ERROR,
    'n/prefer-global/url-search-params': OFF,
    'n/prefer-promises/dns': OFF,
    'n/prefer-promises/fs': OFF,
    'n/process-exit-as-throw': ERROR,
    'n/shebang': ERROR,

    // Eslint comments (https://github.com/mysticatea/eslint-plugin-eslint-comments)
    'eslint-comments/disable-enable-pair': OFF,
    'eslint-comments/require-description': OFF,
    'eslint-comments/no-aggregating-enable': OFF,
    'eslint-comments/no-duplicate-disable': ERROR,
    'eslint-comments/no-restricted-disable': OFF,
    'eslint-comments/no-unlimited-disable': ERROR,
    'eslint-comments/no-unused-disable': OFF,
    'eslint-comments/no-unused-enable': ERROR,
    'eslint-comments/no-use': OFF,

    // JavaScript promises (https://github.com/xjamundx/eslint-plugin-promise)
    'promise/always-return': OFF,
    'promise/avoid-new': OFF,
    'promise/catch-or-return': OFF,
    'promise/no-callback-in-promise': OFF,
    'promise/no-multiple-resolved': NEXT_VERSION_ERROR,
    'promise/no-native': OFF,
    'promise/no-nesting': WARN,
    'promise/no-new-statics': ERROR,
    'promise/no-promise-in-callback': OFF,
    'promise/no-return-in-finally': OFF,
    'promise/no-return-wrap': ERROR,
    'promise/param-names': ERROR,
    'promise/prefer-await-to-callbacks': OFF,
    'promise/prefer-await-to-then': OFF,
    'promise/valid-params': ERROR,

    // Adeira custom rules
    'adeira/graphql-require-object-description': WARN,
    'adeira/no-duplicate-import-type-import': ERROR,
    'adeira/no-invalid-flow-annotations': ERROR,
    'adeira/only-nullable-fields': ERROR,
    'adeira/valid-test-folder': ERROR,

    // Adeira SX custom rules
    'sx/no-concatenated-classes': ERROR,
    'sx/no-unused-stylesheet': ERROR,
    'sx/use-logical-properties': ERROR,
    'sx/valid-usage': ERROR,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.android.js', '.ios.js', '.native.js', '.web.js'],
      },
    },
  },
  overrides: [
    {
      files: ['**/__generated__/*.graphql.js'],
      rules: {
        // Relay disables generated files with unlimited scope
        'eslint-comments/no-unlimited-disable': OFF,
      },
    },
  ],
} /*: EslintConfig */);
