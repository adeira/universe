// @flow strict

/*::

import type { EslintConfigRules } from './EslintConfig.flow';

*/

const OFF = 0;
const WARN = 1;
const ERROR = 2;
const NEXT_VERSION_ERROR = 3; // special value changed later depending on the required strictness

// Please note: there are some TODOs which means we will make it more strict
// in the future versions. This change requires major version bump. It's not
// safe to immediately switch from OFF to ERROR. Some time for migration is
// needed (WARN serves this purpose).
const groupedRules = ({
  base: {
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
    'no-case-declarations': WARN,
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
    'no-fallthrough': WARN,
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
    'no-redeclare': [WARN, { builtinGlobals: true }],
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
    'no-undef': ERROR,
    'no-undef-init': ERROR,
    'no-undefined': OFF,
    'no-unused-vars': [
      ERROR,
      {
        args: 'after-used',
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_$', // (_) => { … }
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
    'prefer-rest-params': WARN,
    'prefer-spread': WARN,
    'prefer-template': ERROR,
    'require-yield': ERROR,
    'sort-imports': OFF,
    'symbol-description': ERROR,

    // import (https://github.com/benmosher/eslint-plugin-import)
    'import/default': OFF,
    'import/dynamic-import-chunkname': OFF, // TODO: warn?
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
    'import/no-relative-packages': NEXT_VERSION_ERROR,
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

    // Node.js (https://github.com/mysticatea/eslint-plugin-node)
    'node/callback-return': OFF, // see: callback-return (https://github.com/mysticatea/eslint-plugin-node/pull/206)
    'node/exports-style': OFF,
    'node/file-extension-in-import': [ERROR, 'always', { '.js': 'never' }],
    'node/global-require': OFF, // see: global-require (https://github.com/mysticatea/eslint-plugin-node/pull/206)
    'node/handle-callback-err': WARN, // see: handle-callback-err (https://github.com/mysticatea/eslint-plugin-node/pull/206)
    'node/no-callback-literal': ERROR,
    'node/no-deprecated-api': ERROR,
    'node/no-exports-assign': ERROR,
    'node/no-extraneous-import': OFF, // see: import/no-extraneous-dependencies
    'node/no-extraneous-require': OFF, // see: import/no-extraneous-dependencies
    'node/no-missing-import': OFF,
    'node/no-missing-require': ERROR,
    'node/no-mixed-requires': OFF, // see: no-mixed-requires (https://github.com/mysticatea/eslint-plugin-node/pull/206)
    'node/no-new-require': WARN, // see: no-new-require (https://github.com/mysticatea/eslint-plugin-node/pull/206)
    'node/no-path-concat': WARN, // see: no-path-concat (https://github.com/mysticatea/eslint-plugin-node/pull/206)
    'node/no-process-env': OFF, // see: no-process-env (https://github.com/mysticatea/eslint-plugin-node/pull/206)
    'node/no-process-exit': OFF, // see: no-process-exit (https://github.com/mysticatea/eslint-plugin-node/pull/206)
    'node/no-restricted-import': OFF, // see: no-restricted-import (https://github.com/mysticatea/eslint-plugin-node/pull/206)
    'node/no-restricted-require': OFF,
    'node/no-sync': OFF, // see: no-sync (https://github.com/mysticatea/eslint-plugin-node/pull/206)
    'node/no-unpublished-bin': ERROR,
    'node/no-unpublished-import': OFF,
    'node/no-unpublished-require': OFF,
    'node/no-unsupported-features/es-builtins': OFF,
    'node/no-unsupported-features/es-syntax': OFF,
    'node/no-unsupported-features/node-builtins': OFF,
    'node/prefer-global/buffer': ERROR,
    'node/prefer-global/console': ERROR,
    'node/prefer-global/process': ERROR,
    'node/prefer-global/text-decoder': OFF,
    'node/prefer-global/text-encoder': OFF,
    'node/prefer-global/url': ERROR,
    'node/prefer-global/url-search-params': OFF,
    'node/prefer-promises/dns': OFF,
    'node/prefer-promises/fs': OFF,
    'node/process-exit-as-throw': ERROR,
    'node/shebang': ERROR,

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
    'adeira/relay-import-no-values': ERROR,
    'adeira/relay-import-type-must-exist': ERROR,
    'adeira/valid-test-folder': ERROR,

    // Adeira SX custom rules
    'sx/no-concatenated-classes': ERROR,
    'sx/no-unused-stylesheet': ERROR,
    'sx/use-logical-properties': NEXT_VERSION_ERROR,
    'sx/valid-usage': ERROR,
  },
  jest: {
    // Jest (https://github.com/jest-community/eslint-plugin-jest)
    'jest/consistent-test-it': OFF,
    'jest/expect-expect': OFF,
    'jest/lowercase-name': OFF,
    'jest/no-alias-methods': OFF,
    'jest/no-commented-out-tests': OFF,
    'jest/no-conditional-expect': OFF,
    'jest/no-deprecated-functions': ERROR,
    'jest/no-disabled-tests': ERROR,
    'jest/no-done-callback': OFF,
    'jest/no-duplicate-hooks': ERROR,
    'jest/no-expect-resolves': OFF,
    'jest/no-export': ERROR,
    'jest/no-focused-tests': ERROR,
    'jest/no-hooks': OFF, // TODO: WARN (?)
    'jest/no-identical-title': ERROR,
    'jest/no-if': OFF,
    'jest/no-interpolation-in-snapshots': ERROR,
    'jest/no-jasmine-globals': ERROR,
    'jest/no-jest-import': ERROR,
    'jest/no-large-snapshots': OFF,
    'jest/no-mocks-import': ERROR,
    'jest/no-restricted-matchers': OFF,
    'jest/no-standalone-expect': ERROR,
    'jest/no-test-callback': OFF,
    'jest/no-test-prefixes': OFF,
    'jest/no-test-return-statement': ERROR,
    'jest/no-truthy-falsy': OFF,
    'jest/prefer-called-with': ERROR,
    'jest/prefer-expect-assertions': OFF,
    'jest/prefer-hooks-on-top': ERROR,
    'jest/prefer-inline-snapshots': OFF,
    'jest/prefer-spy-on': OFF,
    'jest/prefer-strict-equal': OFF, // TODO: WARN
    'jest/prefer-to-be-null': ERROR,
    'jest/prefer-to-be-undefined': ERROR,
    'jest/prefer-to-contain': ERROR,
    'jest/prefer-to-have-length': ERROR,
    'jest/prefer-todo': ERROR,
    'jest/require-to-throw-message': OFF,
    'jest/require-top-level-describe': OFF,
    'jest/unbound-method': OFF,
    'jest/valid-describe': ERROR,
    'jest/valid-expect': ERROR,
    'jest/valid-expect-in-promise': ERROR,
    'jest/valid-title': ERROR,
  },
  flowtype: {
    // flowtype (https://github.com/gajus/eslint-plugin-flowtype)
    'flowtype/array-style-complex-type': OFF,
    'flowtype/array-style-simple-type': OFF,
    'flowtype/arrow-parens': OFF,
    'flowtype/define-flow-type': WARN,
    'flowtype/enforce-line-break': OFF,
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
  },
  react: {
    // React (https://github.com/yannickcr/eslint-plugin-react)
    'react/boolean-prop-naming': OFF,
    'react/button-has-type': [ERROR, { button: true, submit: true, reset: false }],
    'react/default-props-match-prop-types': OFF,
    'react/destructuring-assignment': OFF,
    'react/display-name': OFF,
    'react/forbid-component-props': OFF,
    'react/forbid-dom-props': [
      ERROR,
      {
        forbid: [
          'class', // https://reactjs.org/docs/dom-elements.html#classname
          'for', // https://reactjs.org/docs/dom-elements.html#htmlfor
        ],
      },
    ],
    'react/forbid-elements': OFF,
    'react/forbid-foreign-prop-types': OFF,
    'react/forbid-prop-types': OFF,
    'react/jsx-boolean-value': OFF,
    'react/jsx-curly-brace-presence': OFF,
    'react/jsx-filename-extension': OFF,
    'react/jsx-fragments': OFF,
    'react/jsx-handler-names': OFF,
    'react/jsx-key': ERROR,
    'react/jsx-max-depth': OFF,
    'react/jsx-no-bind': [
      ERROR,
      {
        ignoreDOMComponents: true,
        ignoreRefs: true,
        allowArrowFunctions: true,
        allowFunctions: false,
        allowBind: false,
      },
    ],
    'react/jsx-no-comment-textnodes': ERROR,
    'react/jsx-no-constructed-context-values': ERROR,
    'react/jsx-no-duplicate-props': ERROR,
    'react/jsx-no-literals': OFF,
    'react/jsx-no-target-blank': ERROR,
    'react/jsx-no-undef': ERROR,
    'react/jsx-no-useless-fragment': ERROR,
    'react/jsx-pascal-case': ERROR,
    'react/jsx-props-no-spreading': OFF,
    'react/jsx-sort-default-props': OFF,
    'react/jsx-sort-props': OFF,
    'react/jsx-uses-react': WARN,
    'react/jsx-uses-vars': ERROR,
    'react/no-access-state-in-setstate': ERROR,
    'react/no-array-index-key': OFF,
    'react/no-children-prop': OFF,
    'react/no-danger': OFF,
    'react/no-danger-with-children': ERROR,
    'react/no-deprecated': ERROR,
    'react/no-did-mount-set-state': OFF, // https://github.com/airbnb/javascript/issues/684#issuecomment-264094930
    'react/no-did-update-set-state': ERROR,
    'react/no-direct-mutation-state': ERROR,
    'react/no-find-dom-node': ERROR,
    'react/no-is-mounted': ERROR,
    'react/no-multi-comp': [ERROR, { ignoreStateless: true }],
    'react/no-redundant-should-component-update': ERROR,
    'react/no-render-return-value': ERROR,
    'react/no-set-state': OFF,
    'react/no-string-refs': OFF,
    'react/no-this-in-sfc': ERROR,
    'react/no-typos': OFF,
    'react/no-unescaped-entities': ERROR,
    'react/no-unknown-property': ERROR,
    'react/no-unsafe': OFF,
    'react/no-unstable-nested-components': [ERROR, { allowAsProps: true }],
    'react/no-unused-prop-types': OFF,
    'react/no-unused-state': OFF, // Enable when they fix this issue: https://github.com/yannickcr/eslint-plugin-react/issues/1910
    'react/no-will-update-set-state': OFF,
    'react/prefer-es6-class': [ERROR, 'always'],
    'react/prefer-read-only-props': OFF,
    'react/prefer-stateless-function': OFF,
    'react/prop-types': OFF, // we use Flow instead,
    'react/react-in-jsx-scope': OFF,
    'react/require-default-props': OFF,
    'react/require-optimization': OFF,
    'react/require-render-return': ERROR,
    'react/self-closing-comp': ERROR,
    'react/sort-comp': [
      ERROR,
      {
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/sort-comp.md
        order: [
          'type-annotations',
          'static-variables',
          'static-methods',
          'instance-variables',
          'lifecycle',
          'everything-else',
          'rendering',
        ],
        groups: {
          lifecycle: [
            'displayName',
            'propTypes',
            'contextTypes',
            'childContextTypes',
            'mixins',
            'statics',
            'defaultProps',
            'constructor',
            'getDefaultProps',
            'state',
            'getInitialState',
            'getChildContext',
            'getDerivedStateFromProps', // this is added
            'getDerivedStateFromError', // this is added
            'componentWillMount',
            'UNSAFE_componentWillMount',
            'componentDidMount',
            'componentWillReceiveProps',
            'UNSAFE_componentWillReceiveProps',
            'shouldComponentUpdate',
            'componentWillUpdate',
            'UNSAFE_componentWillUpdate',
            'getSnapshotBeforeUpdate',
            'componentDidUpdate',
            'componentDidCatch',
            'componentWillUnmount',
          ],
          rendering: ['/^render.+$/', 'render'],
        },
      },
    ],
    'react/sort-prop-types': OFF,
    'react/state-in-constructor': OFF,
    'react/static-property-placement': OFF,
    'react/style-prop-object': ERROR,
    'react/void-dom-elements-no-children': ERROR,
    'react/function-component-definition': OFF,
    'react/jsx-no-script-url': ERROR,
    'react/no-adjacent-inline-elements': OFF,

    // React Hooks (https://www.npmjs.com/package/eslint-plugin-react-hooks)
    'react-hooks/rules-of-hooks': ERROR,
    'react-hooks/exhaustive-deps': [
      ERROR,
      {
        // https://recoiljs.org/docs/introduction/installation/#eslint
        additionalHooks: 'useRecoilCallback', // should be regex!
      },
    ],

    // React Native (https://github.com/intellicode/eslint-plugin-react-native)
    'react-native/no-color-literals': OFF,
    'react-native/no-inline-styles': OFF,
    'react-native/no-raw-text': OFF, // TODO: takes normal React into account as well, not only RN
    'react-native/no-single-element-style-arrays': ERROR,
    'react-native/no-unused-styles': ERROR,
    'react-native/sort-styles': OFF,
    'react-native/split-platform-components': OFF,

    // React Accessibility (https://github.com/evcohen/eslint-plugin-jsx-a11y)
    'jsx-a11y/accessible-emoji': ERROR,
    'jsx-a11y/alt-text': ERROR,
    'jsx-a11y/anchor-has-content': ERROR,
    'jsx-a11y/anchor-is-valid': ERROR,
    'jsx-a11y/aria-activedescendant-has-tabindex': OFF,
    'jsx-a11y/aria-props': ERROR,
    'jsx-a11y/aria-proptypes': ERROR,
    'jsx-a11y/aria-role': ERROR,
    'jsx-a11y/aria-unsupported-elements': ERROR,
    'jsx-a11y/autocomplete-valid': ERROR,
    'jsx-a11y/click-events-have-key-events': OFF,
    'jsx-a11y/control-has-associated-label': OFF,
    'jsx-a11y/heading-has-content': ERROR,
    'jsx-a11y/html-has-lang': ERROR,
    'jsx-a11y/iframe-has-title': ERROR,
    'jsx-a11y/img-redundant-alt': OFF,
    'jsx-a11y/interactive-supports-focus': ERROR,
    'jsx-a11y/label-has-associated-control': OFF,
    'jsx-a11y/label-has-for': OFF,
    'jsx-a11y/lang': ERROR,
    'jsx-a11y/media-has-caption': OFF,
    'jsx-a11y/mouse-events-have-key-events': OFF,
    'jsx-a11y/no-access-key': ERROR,
    'jsx-a11y/no-autofocus': [ERROR, { ignoreNonDOM: true }],
    'jsx-a11y/no-distracting-elements': [ERROR, { elements: ['marquee', 'blink'] }],
    'jsx-a11y/no-interactive-element-to-noninteractive-role': OFF,
    'jsx-a11y/no-noninteractive-element-interactions': OFF,
    'jsx-a11y/no-noninteractive-element-to-interactive-role': OFF,
    'jsx-a11y/no-noninteractive-tabindex': ERROR,
    'jsx-a11y/no-onchange': OFF,
    'jsx-a11y/no-redundant-roles': ERROR,
    'jsx-a11y/no-static-element-interactions': OFF,
    'jsx-a11y/role-has-required-aria-props': ERROR,
    'jsx-a11y/role-supports-aria-props': ERROR,
    'jsx-a11y/scope': ERROR,
    'jsx-a11y/tabindex-no-positive': ERROR,
  },
  relay: {
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
} /*: {[string]:EslintConfigRules} */);

exports.groupedRules = groupedRules;

let ourRules /*: EslintConfigRules */ = {};
Object.values(groupedRules).forEach((rules) => {
  ourRules = { ...ourRules, ...rules };
});

exports.ourRules = ourRules;
