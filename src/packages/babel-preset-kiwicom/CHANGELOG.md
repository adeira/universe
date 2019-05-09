# Unreleased
- Modules transformation is now determined automatically based on your Babel executor (see: https://babeljs.io/docs/en/babel-preset-env#modules). It should not break anything. They only difference is that previously we supported only CommonJS but now you can get even ES6 modules if your Babel executor supports it (`babel-loader` for example).

# 3.0.0
- Added support for dynamic `import()` syntax. This fits well with `@kiwicom/relay` version 1.0+ and allows you to use `@match`/`@module` directives for data-driven code splitting.
- Breaking: Relay plugin is no longer part of this preset. It was moved to `@kiwicom/relay`. Please, edit your Babel configuration files (example for Next.js applications):

```js
module.exports = {
  presets: ['@kiwicom/babel-preset-kiwicom', 'next/babel'],
  plugins: ['relay'],
};
```

# 2.8.0
- Upgrade Relay to version 4.0 (see: https://github.com/facebook/relay/releases/tag/v4.0.0)

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
