# Unreleased

# 0.4.0

- Upgraded dependencies

---

Changelog before our fork:

<pre><code>
# Unreleased

- Output in which file you are trying to redeclare `__DEV__`

# 3.7.0

- New error preventing abuse of `__DEV__` added. You cannot redeclare this virtual constant in your code!

# 3.6.0

- Babel dependencies upgraded to the latest versions (7.6), see: https://babeljs.io/blog/2019/09/05/7.6.0
- Babel bug preventing usage of `string.matchAll` was fixed, see: https://github.com/babel/babel/pull/10136
- Added parser support for `BigInt`.
- Added parser support for throw expressions.

# 3.5.0

- This release doesn't add any visible changes. However, there are many bugfixes from Babel side, upgraded dependencies as well as some internal changes usually around some new syntaxes which are now officially supported (see readme file). Please upgrade to this version and let us know about any issues.

# 3.4.0

- Now it's possible to configure not only transpilation targets but also different environments via `environments` option. Check readme file to see how to.

# 3.3.0

- Flow comments are now being transpiled to normal Flow types when you use `target:flow`. We changed it so that Babel understands them correctly ([see this reported issue](https://github.com/babel/babel/issues/9810)). Please report any issues related to this change.
- Parsing of private class properties is now officially supported.
- Numeric separators are now officially supported. Read more in this proposal: https://github.com/tc39/proposal-numeric-separator

# 3.2.0

- Added support for new transpilation target `js-esm`. This target works the same as `js` except it supports ES6 modules.

# 3.1.1

- This version just reverts previous changes from version 3.1.0. We discovered unexpected behavior in some specific cases which forces us to revert it. Better strategy will follow.

# 3.1.0

- Modules transformation is now determined automatically based on your Babel executor (see: https://babeljs.io/docs/en/babel-preset-env#modules). It should not break anything. They only difference is that previously we supported only CommonJS but now you can get even ES6 modules if your Babel executor supports it (`babel-loader` for example).

# 3.0.0

- Added support for dynamic `import()` syntax. This fits well with `@adeira/relay` version 1.0+ and allows you to use `@match`/`@module` directives for data-driven code splitting.
- Breaking: Relay plugin is no longer part of this preset. It was moved to `@adeira/relay`. Please, edit your Babel configuration files (example for Next.js applications):

```js
module.exports = {
  presets: ['@adeira/babel-preset-adeira', 'next/babel'],
  plugins: ['relay'],
};
```

# 2.8.0

- Upgrade Relay to version 4.0 (see: https://github.com/facebook/relay/releases/tag/v4.0.0)

# 2.7.0

- Browser environment is now supported correctly (last 2 versions, ie >= 11). We are now distributing `@babel/runtime` as a dependency so you may want to remove it from your project. Please report any issues with your environment.

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
</code></pre>
