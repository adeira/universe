# Unreleased

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
