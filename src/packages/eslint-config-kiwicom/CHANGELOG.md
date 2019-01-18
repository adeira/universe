# Unreleased

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
