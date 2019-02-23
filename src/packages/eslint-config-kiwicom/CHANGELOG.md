# Unreleased

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
