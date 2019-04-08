# Unreleased

# 2.7.0
- Browser environment is now supported correctly (last 2 versions, ie >= 11). We are now distributing `@babel/runtime` as a dependency so you  may want to remove it from your project. Please report any issues with your environment.

# 2.6.0
- Add support for Relay 3.0 (no breaking changes expected, should be backward compatible)

# 2.5.0
- Added support for `invariant` transpilation (from `@kiwicom/js`)
- Fixed `warning` transpilation for require

# 2.4.0
- Added support for `warning` transpilation (from `@kiwicom/js`)

# 2.3.0
- Added `@kiwicom/babel-plugin-orbit-components`

# 2.2.0
- Target `flow` now doesn't perform transpilation but only parsing and `__DEV__` declaration instead

# 2.1.0
- Add transpilation targets: JS and Flow

# 2.0.0
- Upgrade `babel-plugin-relay` to the version 2.0 (potentially breaking change) 

# 1.4.0
- Add `@babel/preset-react` into default presets

# 1.3.0
- Add `babel-plugin-relay` into default plugins

# 1.2.0
- Babel dependencies upgraded to the latest versions

# 1.1.0
- Added support for `__DEV__` expression
