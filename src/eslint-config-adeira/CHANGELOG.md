# Unreleased

---

Changelog before our fork:

```text
# Unreleased

- New rule [`jest/valid-title`](https://github.com/jest-community/eslint-plugin-jest/blob/master/docs/rules/valid-title.md) added (warnings or errors in strict mode).

# 8.4.0

- Changes in package.json will trigger eslint runner to run with `--all` flag
- Rule [no-unused-vars](https://eslint.org/docs/6.0.0/rules/no-unused-vars) now allows unused variable when it's used to omit properties from object using [rest spread](https://github.com/tc39/proposal-object-rest-spread).
- New rule [`jest/prefer-hooks-on-top`](https://github.com/jest-community/eslint-plugin-jest/blob/master/docs/rules/prefer-hooks-on-top.md) added (warnings or errors in strict mode).

# 8.3.0

- New rule `kiwicom-incubator/no-internal-flow-type` enabled (warnings or errors in strict mode). This rule forces you to use types like `React.Node` instead of `React$Node`.

# 8.2.0

- New rules [`default-param-last`](https://eslint.org/docs/rules/default-param-last), [`no-import-assign`](https://eslint.org/docs/rules/no-import-assign), [`prefer-regex-literals`](https://eslint.org/docs/rules/prefer-regex-literals) and [`react/jsx-no-useless-fragment`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-useless-fragment.md) added (warnings in normal mode, errors in strict mode).
- Rule [`use-isnan`](https://eslint.org/docs/rules/use-isnan) uses new option `enforceForSwitchCase` by default.
- Eslint Config Runner now automatically runs check of all the files when you change any Eslint-related configuration file (see: https://eslint.org/docs/user-guide/configuring#configuration-file-formats). Please note: this doesn't take configuration via `package.json` into account.

# 8.1.0

- Added `@kiwicom/eslint-config/nitro` as a replacement for deprecated `@kiwicom/eslint-config-nitro`.
- Rules [`symbol-description`](https://eslint.org/docs/rules/symbol-description), [`yoda`](https://eslint.org/docs/rules/yoda), [`react/no-unknown-property`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unknown-property.md), [`react/jsx-no-comment-textnodes`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-comment-textnodes.md) now throw errors in strict mode.
- Rule [`react/style-prop-object`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/style-prop-object.md) now shows warnings (errors in strict mode).
- New rule `relay/hook-required-argument` added (warnings or errors in strict mode).
- Rule `flowtype/no-unused-expressions` now supports tagged templates. This is useful to combine with `@inline` GraphQL fragments definition for example.

# 8.0.0

- Major upgrade of `eslint-plugin-node` to the latest version (see: https://github.com/mysticatea/eslint-plugin-node/releases/tag/v10.0.0). This is a breaking change so we are bumping major version. You should be shielded from most of the changes however, you may get some new errors on `import()` and on deprecated `module.createRequireFromPath` calls.
- New rule [`node/no-exports-assign`](https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-exports-assign.md) now throws errors in both normal and strict mode.
- Rule [`flowtype/no-dupe-keys`](https://github.com/gajus/eslint-plugin-flowtype/blob/master/.README/rules/no-dupe-keys.md) now throws errors in both normal and strict mode.
- Plugin `eslint-plugin-jest` is now more strict, see: https://github.com/jest-community/eslint-plugin-jest/releases/tag/v22.17.0 (affects behavior of rules `jest/prefer-to-be-null`, `jest/prefer-to-be-undefined`, `jest/prefer-to-contain` and `jest/prefer-to-have-length`).

# 7.1.1

- Exceptions on mishmashed Eslint plugin versions has been reverted back to warnings only.

# 7.1.0

- Tests runner now throws exceptions when you have mishmashed Eslint plugin versions. This is potentially breaking change but you should not have such mishmash in your codebase anyway (it creates problems when running Eslint).
- Added brand new rule [`node/no-callback-literal`](https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-callback-literal.md) which shows warnings in both normal and strict mode.

# 7.0.0

- Update of internal dependencies. Notably, we updated `eslint-plugin-react-hooks` to version 2.0.1 which is a breaking change, see: https://github.com/facebook/react/pull/16455
- Rules [`jest/no-duplicate-hooks`](https://github.com/jest-community/eslint-plugin-jest/blob/master/docs/rules/no-duplicate-hooks.md), [`jest/no-export`](https://github.com/jest-community/eslint-plugin-jest/blob/master/docs/rules/no-export.md) and [`jest/no-standalone-expect`](https://github.com/jest-community/eslint-plugin-jest/blob/master/docs/rules/no-standalone-expect.md) now report errors instead of warnings (no change in strict mode).
- Rule `flowtype/no-dupe-keys` now shows warnings (errors in strict mode)
- Rule `no-inner-declarations` was disabled

# 6.5.0

- New rule `jest/no-standalone-expect` enabled (warnings resp. errors in strict mode). See: https://github.com/jest-community/eslint-plugin-jest/blob/098219b4614192b365e51b0de68deac9caae1d68/docs/rules/no-standalone-expect.md

# 6.4.0

- New rule `jest/no-export` enabled (warnings resp. errors in strict mode). See: https://github.com/jest-community/eslint-plugin-jest/blob/3ee38742e0d235196619488a88fe679d1e8c0030/docs/rules/no-export.md

# 6.3.0

- Allow use of devDependencies in `**/*.stories.js` (Storybook story files), `**/webpack.config.js` and `**/metro.config.js`.

# 6.2.0

- Eslint runner now automatically checks your dependency tree and warns you when you are using multiple plugins with possibly incompatible versions (common source of `Definition for rule 'xyz' was not found` errors).

# 6.1.0

- New rule [`jest/no-duplicate-hooks`](https://github.com/jest-community/eslint-plugin-jest/blob/e292cb85fd19a9b561b7da0f3a4ded73a9842faa/docs/rules/no-duplicate-hooks.md) enabled (warnings resp. errors in strict mode).

# 6.0.0

- Breaking: default line width is now 100 to be compatible with other JavaScript projects. Migration is super simple if you use our Eslint Runner: just run it with option `--all` and it will fix the lines automatically. You will probably have to fix some additional failing tests/lint rules but it should not take you more than a few minutes. As always: first upgrade to previous versions and fix the warnings.

# 5.0.0

This is a major release with breaking changes. The main changes are major Eslint upgrade and bump of some warnings to errors (strict mode reset). Please upgrade all previous versions first and fix all the warnings before upgrading to version 5.0.

- Breaking: Eslint upgraded to version 6.0+ which is now required by peer dependencies. See: https://eslint.org/docs/6.0.0/user-guide/migrating-to-6.0.0
- The following rules are now errors instead of warnings (no change in strict mode):
  - `no-async-promise-executor`, `no-cond-assign`, `no-control-regex`, `no-duplicate-case`, `no-empty-character-class`, `no-ex-assign`, `no-extra-boolean-cast`, `no-irregular-whitespace`, `no-misleading-character-class`, `no-prototype-builtins`, `no-regex-spaces`, `no-template-curly-in-string`, `no-unsafe-finally`, `array-callback-return`, `dot-notation`, `eqeqeq`, `guard-for-in`, `no-empty-pattern`, `no-extra-label`, `no-iterator`, `no-lone-blocks`, `no-loop-func`, `no-octal`, `no-octal-escape`, `no-useless-catch`, `no-useless-concat`, `no-useless-escape`, `no-with`, `vars-on-top`, `no-shadow-restricted-names`, `no-undef-init`, `no-bitwise`, `no-nested-ternary`, `no-useless-computed-key`, `no-useless-constructor`, `no-var`, `prefer-template`, `require-yield`
  - `flowtype/require-inexact-type`
  - `react/button-has-type`, `react/forbid-dom-props`, `react/jsx-pascal-case`, `react/jsx-uses-vars`, `react/no-danger-with-children`, `react/no-deprecated`, `react/no-direct-mutation-state`, `react/no-find-dom-node`, `react/no-is-mounted`, `react/no-multi-comp`, `react/no-redundant-should-component-update`, `react/no-render-return-value`, `react/no-this-in-sfc`, `react/no-unescaped-entities`, `react/prefer-es6-class`, `react/require-render-return`, `react/self-closing-comp`, `react/sort-comp`, `react/void-dom-elements-no-children`
  - `jsx-a11y/anchor-is-valid`, `jsx-a11y/aria-proptypes`, `jsx-a11y/aria-role`, `jsx-a11y/html-has-lang`, `jsx-a11y/iframe-has-title`, `jsx-a11y/interactive-supports-focus`, `jsx-a11y/lang`, `jsx-a11y/no-access-key`, `jsx-a11y/no-autofocus`, `jsx-a11y/no-redundant-roles`, `jsx-a11y/role-has-required-aria-props`, `jsx-a11y/role-supports-aria-props`, `jsx-a11y/scope`, `jsx-a11y/tabindex-no-positive`
  - `import/export`, `import/extensions`, `import/first`, `import/no-amd`, `import/no-duplicates`, `import/no-named-default`, `import/no-webpack-loader-syntax`, `import/no-self-import`
  - `node/file-extension-in-import`
  - `relay-imports/no-values`, `relay-imports/type-must-exist`

There are no other behavioral changes so if you fixed all the warnings from previous versions then you should be good to go.

# 4.11.0

- Unmaintained plugin [`eslint-plugin-dependencies`](https://github.com/zertosh/eslint-plugin-dependencies) was removed. We already cover most of the cases with `import` plugin. This change is done in backward compatible manner: `dependencies/case-sensitive` doesn't have replacement and it's been removed, `dependencies/no-cycles` is replaced with `import/no-cycle` and `dependencies/require-json-ext` was replaced with `import/extensions`. Please, report any issues.

# 4.10.0

- React rule [`react/jsx-no-bind`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md) is now much more benevolent. Read more information about this change here: https://kiwi.wiki/incubator/universe/blog/2019/06/21/relaxing-react-jsx-no-bind-eslint-rule

# 4.9.0

- Internal dependency [`eslint-config-prettier`](https://github.com/prettier/eslint-config-prettier) upgraded to version 5.0 (potentially breaking) which effectively removes restrictions on React rule [`react/self-closing-comp`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/self-closing-comp.md). This release enables new warnings for this rule (errors in strict mode). This rule is automatically fixable so it's going to be autofixed when you use our Eslint runner. More details here: https://github.com/prettier/eslint-config-prettier/blob/master/CHANGELOG.md#version-500-2019-06-15
- Following rules now show warnings (errors in strict mode): [`guard-for-in`](https://eslint.org/docs/rules/guard-for-in), [`no-undef-init`](https://eslint.org/docs/rules/no-undef-init), [`require-yield`](https://eslint.org/docs/rules/require-yield), [`react/jsx-pascal-case`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-pascal-case.md)

# 4.8.0

- Preparation for future major Eslint version 6.0. The following rules show warnings (errors in strict mode): [`no-async-promise-executor`](https://eslint.org/docs/rules/no-async-promise-executor), [`no-prototype-builtins`](https://eslint.org/docs/rules/no-prototype-builtins), [`no-shadow-restricted-names`](https://eslint.org/docs/rules/no-shadow-restricted-names), [`no-useless-catch`](https://eslint.org/docs/rules/no-useless-catch) (some of them were already warnings, other rules from 6.0 are already implemented properly).
- Disabled rule `react/no-unused-state` because of this issue: https://github.com/yannickcr/eslint-plugin-react/issues/1910 (it caused many errors in real-world applications).

# 4.7.0

This release focuses on enabling more rules to match closer with Nitro config. It also shows new warnings for implicit inexact Flow types as a preparation for [exact objects by default](https://medium.com/flow-type/on-the-roadmap-exact-objects-by-default-16b72933c5cf). As always, please do not hesitate to upgrade, fix all your warnings and report any issues and misbehavior.

- New rule for checking inexact Flow types (warnings or errors in strict mode): [`flowtype/require-inexact-type`](https://github.com/gajus/eslint-plugin-flowtype#eslint-plugin-flowtype-rules-require-inexact-type)
- Following rules now show warnings (errors in strict mode): [`no-template-curly-in-string`](https://eslint.org/docs/rules/no-template-curly-in-string), [`array-callback-return`](https://eslint.org/docs/rules/array-callback-return), [`no-loop-func`](https://eslint.org/docs/rules/no-loop-func), [`vars-on-top`](https://eslint.org/docs/rules/vars-on-top), [`no-nested-ternary`](https://eslint.org/docs/rules/no-nested-ternary), [`prefer-template`](https://eslint.org/docs/rules/prefer-template)
- Following React-related rules now show warnings (errors in strict mode): [`react/button-has-type`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/button-has-type.md), [`react/no-danger-with-children`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-danger-with-children.md), [`react/no-find-dom-node`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-find-dom-node.md), [`react/no-is-mounted`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-is-mounted.md), [`react/no-multi-comp`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-multi-comp.md), [`react/no-render-return-value`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-render-return-value.md), [`react/jsx-uses-vars`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-uses-vars.md), [`react/no-this-in-sfc`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-this-in-sfc.md), [`react/void-dom-elements-no-children`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/void-dom-elements-no-children.md), [`react/prefer-es6-class`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-es6-class.md), [`react/no-unused-state`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unused-state.md), [`react/no-unescaped-entities`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unescaped-entities.md)

# 4.6.0

There are many non-breaking changes in this release but mostly covering edge cases. Please, report any issues so we can reconsider some of them. Also, do not hesitate to upgrade your codebase. We are currently trying to unify our config and Nitro config.

- Following rules now show warnings (errors in strict mode): [`import/export`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/export.md), [`import/first`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/first.md), [`import/no-webpack-loader-syntax`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-webpack-loader-syntax.md), [`import/no-amd`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-amd.md), [`import/no-named-default`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-named-default.md), [`import/no-self-import`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-self-import.md)
- Following rules now show warnings (errors in strict mode): [`jsx-a11y/aria-proptypes`](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-proptypes.md), [`jsx-a11y/html-has-lang`](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/html-has-lang.md), [`jsx-a11y/iframe-has-title`](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/iframe-has-title.md), [`jsx-a11y/interactive-supports-focus`](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/interactive-supports-focus.md), [`jsx-a11y/lang`](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/lang.md), [`jsx-a11y/no-access-key`](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-access-key.md), [`jsx-a11y/aria-role`](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-role.md), [`jsx-a11y/no-autofocus`](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-autofocus.md), [`jsx-a11y/no-redundant-roles`](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-redundant-roles.md), [`jsx-a11y/role-has-required-aria-props`](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/role-has-required-aria-props.md), [`jsx-a11y/role-supports-aria-props`](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/role-supports-aria-props.md), [`jsx-a11y/scope`](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/scope.md), [`jsx-a11y/tabindex-no-positive`](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/tabindex-no-positive.md), [`jsx-a11y/anchor-is-valid`](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md)
- Following rules were already warnings but are now errors in strict mode: [`import/no-duplicates`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-duplicates.md), [`dot-notation`](https://eslint.org/docs/rules/dot-notation), [`eqeqeq`](https://eslint.org/docs/rules/eqeqeq), [`no-empty-pattern`](https://eslint.org/docs/rules/no-empty-pattern), [`no-extra-label`](https://eslint.org/docs/rules/no-extra-label), [`no-iterator`](https://eslint.org/docs/rules/no-iterator), [`no-var`](https://eslint.org/docs/rules/no-var), [`no-lone-blocks`](https://eslint.org/docs/rules/no-lone-blocks), [`no-octal`](https://eslint.org/docs/rules/no-octal), [`no-octal-escape`](https://eslint.org/docs/rules/no-octal-escape), [`no-bitwise`](https://eslint.org/docs/rules/no-bitwise), [`no-useless-constructor`](https://eslint.org/docs/rules/no-useless-constructor), [`no-useless-computed-key`](https://eslint.org/docs/rules/no-useless-computed-key), [`no-useless-concat`](https://eslint.org/docs/rules/no-useless-concat), [`no-useless-escape`](https://eslint.org/docs/rules/no-useless-escape), [`no-with`](https://eslint.org/docs/rules/no-with)

# 4.5.0

- New warnings for our custom rule `relay-imports/no-values` and `relay-imports/type-must-exist` (errors in strict mode). These rules should help you to find mistakes while importing Flow types from generated Relay files.

# 4.4.0

- This release adds official support for exhaustive Flow type checking with empty type, more info: https://github.com/mrtnzlml/meta/blob/master/flow.md#exhaustive-checking-with-empty-type. Please report any issues and unexpected behavior.

# 4.3.0

- Added initial support for [`globalThis`](https://github.com/tc39/proposal-global).

# 4.2.0

- Plugin `eslint-plugin-node` upgraded to the [latest version 9.0.0](https://github.com/mysticatea/eslint-plugin-node/releases/tag/v9.0.0) which drops support for old Node.js and Eslint. There are also some updated rules but it should not be a big problem in our company. Therefore, this is not released as a major change from our Eslint config point of view. New rule [`node/file-extension-in-import`](https://github.com/mysticatea/eslint-plugin-node/blob/v9.0.0/docs/rules/file-extension-in-import.md) shows warnings (errors in strict mode).

# 4.1.0

- New warnings: [`react/forbid-component-props`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/forbid-dom-props.md), [`react/no-redundant-should-component-update`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-redundant-should-component-update.md), [`react/require-render-return`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/require-render-return.md)

# 4.0.1

- Rule [`react/sort-comp`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/sort-comp.md) now returns warnings (errors in the strict mode) to simplify the migration. Turned out this rule was not configured properly and it's not battle-tested yet. You can use [sort-comp React codemod](https://github.com/reactjs/react-codemod#sort-comp) to easily migrate your codebase. Please report any issues with this rule even if you just simply don't like the enforced result.

# 4.0.0

- Previous versions (all from 2.16.0) contained bug which caused that some rules were exported as warnings instead of errors. The same bug affected strict mode which caused that some rules returned error incorrectly. These rules are corrected as well so they return warnings instead as intended. Affected rules in normal mode which now correctly throw errors are:
  - [babel/camelcase](https://github.com/babel/eslint-plugin-babel)
  - [consistent-return](https://eslint.org/docs/rules/consistent-return)
  - [flowtype/newline-after-flow-annotation](https://github.com/gajus/eslint-plugin-flowtype#eslint-plugin-flowtype-rules-newline-after-flow-annotation)
  - [flowtype/require-valid-file-annotation](https://github.com/gajus/eslint-plugin-flowtype#eslint-plugin-flowtype-rules-require-valid-file-annotation)
  - [import/no-anonymous-default-export](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-anonymous-default-export.md)
  - [import/no-extraneous-dependencies](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md)
  - [import/no-unresolved](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-unresolved.md)
  - [import/order](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/order.md)
  - [jsx-a11y/no-distracting-elements](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-distracting-elements.md)
  - [no-global-assign](https://eslint.org/docs/rules/no-global-assign)
  - [no-labels](https://eslint.org/docs/rules/no-labels)
  - [no-unused-vars](https://eslint.org/docs/rules/no-unused-vars)
  - [prefer-const](https://eslint.org/docs/rules/prefer-const)
  - [spaced-comment](https://eslint.org/docs/rules/spaced-comment)
- These warnings (errors if you use strict mode) are now errors:
  - [eslint-comments/no-duplicate-disable](https://mysticatea.github.io/eslint-plugin-eslint-comments/rules/no-duplicate-disable.html)
  - [eslint-comments/no-unused-enable](https://mysticatea.github.io/eslint-plugin-eslint-comments/rules/no-unused-enable.html)
  - [flowtype/no-existential-type](https://github.com/gajus/eslint-plugin-flowtype#no-existential-type)
  - [flowtype/no-types-missing-file-annotation](https://github.com/gajus/eslint-plugin-flowtype#eslint-plugin-flowtype-rules-no-types-missing-file-annotation)
  - [flowtype/no-unused-expressions](https://github.com/gajus/eslint-plugin-flowtype#eslint-plugin-flowtype-rules-no-unused-expressions)
  - [jest/no-disabled-tests](https://github.com/jest-community/eslint-plugin-jest/blob/master/docs/rules/no-disabled-tests.md)
  - [jest/no-empty-title](https://github.com/jest-community/eslint-plugin-jest/blob/master/docs/rules/no-empty-title.md)
  - [jest/no-mocks-import](https://github.com/jest-community/eslint-plugin-jest/blob/master/docs/rules/no-mocks-import.md)
  - [jest/valid-expect](https://github.com/jest-community/eslint-plugin-jest/blob/master/docs/rules/valid-expect.md)
  - [jsx-a11y/alt-text](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/alt-text.md)
  - [no-invalid-regexp](https://eslint.org/docs/rules/no-invalid-regexp)
  - [node/no-deprecated-api](https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-deprecated-api.md)
  - [node/no-unpublished-bin](https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-unpublished-bin.md)
  - [node/prefer-global/buffer](https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/prefer-global/buffer.md)
  - [node/prefer-global/console](https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/prefer-global/console.md)
  - [node/prefer-global/process](https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/prefer-global/process.md)
  - [node/prefer-global/url](https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/prefer-global/url.md)
  - [node/shebang](https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/shebang.md)
  - [prefer-named-capture-group](https://eslint.org/docs/rules/prefer-named-capture-group)
  - [react-hooks/exhaustive-deps](https://reactjs.org/docs/hooks-rules.html#eslint-plugin)
  - [react/jsx-key](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-key.md)
  - [require-await](https://eslint.org/docs/rules/require-await)
- These rules from [Possible Errors](http://eslint.org/docs/rules/#possible-errors) Eslint group now show errors in the strict mode (normal mode not affected):
  - [no-cond-assign](https://eslint.org/docs/rules/no-cond-assign)
  - [no-control-regex](https://eslint.org/docs/rules/no-control-regex)
  - [no-duplicate-case](https://eslint.org/docs/rules/no-duplicate-case)
  - [no-empty-character-class](https://eslint.org/docs/rules/no-empty-character-class)
  - [no-ex-assign](https://eslint.org/docs/rules/no-ex-assign)
  - [no-extra-boolean-cast](https://eslint.org/docs/rules/no-extra-boolean-cast)
  - [no-irregular-whitespace](https://eslint.org/docs/rules/no-irregular-whitespace)
  - [no-misleading-character-class](https://eslint.org/docs/rules/no-misleading-character-class)
  - [no-regex-spaces](https://eslint.org/docs/rules/no-regex-spaces)
  - [no-unsafe-finally](https://eslint.org/docs/rules/no-unsafe-finally)

# 3.6.0

- Show warnings for new `jest/no-mocks-import` rule (see: https://github.com/jest-community/eslint-plugin-jest/blob/master/docs/rules/no-mocks-import.md)
- Add `__` into default globals - please remove it from your globals if possible

# 3.5.0

- Show warnings for these rules: `flowtype/no-existential-type`, `flowtype/no-types-missing-file-annotation`, `flowtype/no-unused-expressions` (see: https://github.com/gajus/eslint-plugin-flowtype)

# 3.4.0

- Show warnings for `prefer-named-capture-group` rule (see: https://eslint.org/docs/rules/prefer-named-capture-group)

# 3.3.0

- Show warnings for new `react-hooks/exhaustive-deps` rule (see: https://github.com/facebook/react/issues/14920)

# 3.2.0

- New rule `jest/no-empty-title` shows warnings
- Internal dependencies upgraded (no issues expected)

# 3.1.0

- Show new warnings for the following rules:
  - [node/no-unpublished-bin](https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-unpublished-bin.md)
  - [node/prefer-global/buffer](https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/prefer-global/buffer.md)
  - [node/prefer-global/console](https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/prefer-global/console.md)
  - [node/prefer-global/process](https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/prefer-global/process.md)
  - [node/prefer-global/url](https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/prefer-global/url.md)
  - [node/shebang](https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/shebang.md)

# 3.0.0

- Following rules now throw errors instead of warnings:

  - [curly](https://eslint.org/docs/rules/curly)
  - [no-label-var](https://eslint.org/docs/rules/no-label-var)
  - [no-unused-vars](https://eslint.org/docs/rules/no-unused-vars)
  - [linebreak-style](https://eslint.org/docs/rules/linebreak-style)
  - [babel/no-unused-expressions](https://eslint.org/docs/rules/no-unused-expressions)
  - [jest/no-identical-title](https://github.com/jest-community/eslint-plugin-jest/blob/master/docs/rules/no-identical-title.md)
  - [jest/no-jasmine-globals](https://github.com/jest-community/eslint-plugin-jest/blob/master/docs/rules/no-jasmine-globals.md)
  - [jest/no-jest-import](https://github.com/jest-community/eslint-plugin-jest/blob/master/docs/rules/no-jest-import.md)
  - [jest/no-test-return-statement](https://github.com/jest-community/eslint-plugin-jest/blob/master/docs/rules/no-test-return-statement.md)
  - [jest/prefer-to-be-null](https://github.com/jest-community/eslint-plugin-jest/blob/master/docs/rules/prefer-to-be-null.md)
  - [jest/prefer-to-be-undefined](https://github.com/jest-community/eslint-plugin-jest/blob/master/docs/rules/prefer-to-be-undefined.md)
  - [jest/prefer-to-contain](https://github.com/jest-community/eslint-plugin-jest/blob/master/docs/rules/prefer-to-contain.md)
  - [jest/prefer-to-have-length](https://github.com/jest-community/eslint-plugin-jest/blob/master/docs/rules/prefer-to-have-length.md)
  - [jest/valid-describe](https://github.com/jest-community/eslint-plugin-jest/blob/master/docs/rules/valid-describe.md)
  - [jest/valid-expect-in-promise](https://github.com/jest-community/eslint-plugin-jest/blob/master/docs/rules/valid-expect-in-promise.md)
  - [jest/prefer-todo](https://github.com/jest-community/eslint-plugin-jest/blob/master/docs/rules/prefer-todo.md)
  - [react/no-did-update-set-state](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-did-update-set-state.md)
  - [react/sort-comp](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/sort-comp.md)
  - [react-hooks/rules-of-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)
  - [jsx-a11y/accessible-emoji](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/accessible-emoji.md)
  - [jsx-a11y/aria-props](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-props.md)
  - [jsx-a11y/aria-unsupported-elements](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-unsupported-elements.md)
  - [jsx-a11y/no-distracting-elements](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-distracting-elements.md)
  - [import/no-anonymous-default-export](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-anonymous-default-export.md)
  - [node/no-missing-require](https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-missing-require.md)
  - [kiwicom-incubator/no-invalid-flow-annotations](https://www.npmjs.com/package/eslint-plugin-kiwicom-incubator)

# 2.16.0

- New `@kiwicom/eslint-config/strict` mode added - check docs for more info
- Rule `require-await` now shows warnings

# 2.15.0

- Some basic `jsx-a11y` added: should not cause many warnings

# 2.14.0

- Disable `no-duplicate-imports` rule
- Set `import/no-duplicates` to WARN. Which is more intelligent than `no-duplicate-imports` and can differentiate between `import` and `import type`

# 2.13.0

- Eslint now warns for unused function parameters

# 2.12.0

- Rule `import/no-anonymous-default-export` now complains only on exported functions and classes
- Show warnings for new Jest rule `jest/prefer-called-with` (see: https://github.com/jest-community/eslint-plugin-jest/blob/master/docs/rules/prefer-called-with.md)

# 2.11.0

- Eslint now warns when you use `@noflow` or `@flow weak` file annotations

# 2.10.0

- Throws warnings for `curly` rule
- Rule `import/no-anonymous-default-export` now throws warnings, see: https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-anonymous-default-export.md

# 2.9.0

- Disable rule `react/no-did-mount-set-state` by default

# 2.8.0

- Add `FormData` to the globals
- Rule `import/no-unresolved` now ignores Relay artifacts set by `artifactDirectory`
- Upgrade `eslint-plugin-react-hooks` to the latest stable version (^1.0.1)

# 2.7.0

- Enable warnings for `jest/prefer-todo` rule

# 2.6.0

- Enable warnings for `react/sort-comp` rule

# 2.5.0

- Detect React version automatically

# 2.4.0

- Disable rules from `eslint-plugin-babel` that are in conflict with Prettier
- Eslint dependencies upgraded to the latest versions

# 2.3.0

- Disable rule `eslint-comments/no-unlimited-disable` to make it more Relay friendly

# 2.2.0

- Rule `new-cap` now throws warnings for lower-cased class usages
- Add new `react-hooks/rules-of-hooks`
- Added support for `__DEV__` expression

# 2.1.0

- Show warnings for `no-unused-vars`, `jest/prefer-to-be-null`, `jest/prefer-to-be-undefined`, `jest/prefer-to-contain`, `jest/prefer-to-have-length` and `eslint-comments/no-unlimited-disable`

# 2.0.0

- Prettier is now in charge of styling issues

# 1.5.0

- Set `react/no-did-mount-set-state` and `react/no-did-update-set-state` to WARN
- Add support for RN and RNW file extensions (`*.ios.js`, `*.android.js`, ...)

# 1.4.0

- Added new `eslint-plugin-eslint-comments` to check Eslint comments
- Eslint now warns when using useless combination or `return await` (`no-return-await`)

# 1.3.0

- Added new `no-useless-catch` warning
- Replace Jasmine eslint rules with better Jest rules

# 1.2.0

- Fixed camelcase rule to work correctly with optional chaining (`a?.b`)

# 1.1.0

- Added new plugin for Node.js
- Eslint is now required as a peer dependency
```
