# Unreleased

Breaking changes ahead!

Note for all Flow users: all projects in [`adeira/universe`](https://github.com/adeira/universe) now use implicit exact Flow types (`{}` for strict objects and `{ ... }` for open objects, syntax `{||}` is deprecated). We do not expect any issues as long as you are using `exact_by_default=true` Flow option.

- Enabled experimental support for [Flow Enums](https://flow.org/en/docs/enums/). Please note: you still have to install [`flow-enums-runtime`](https://www.npmjs.com/package/flow-enums-runtime) explicitly if you want to use it.
- Added support for `@babel/eslint-parser` instead of the deprecated `babel-eslint`, see: https://babeljs.io/blog/2020/07/13/the-state-of-babel-eslint
- Enabled `allowDeclareFields` options for `@babel/plugin-transform-flow-strip-types`. This is the default in Babel 8. You should migrate all type only fields to use `declare` syntax like so:

  ```js
  class C {
    declare foo: string;
    bar: string;
  }

  // becomes
  class C {
    bar;
  }
  ```

  For more information visit the following links:

  - https://babeljs.io/docs/en/babel-plugin-transform-flow-strip-types#allowdeclarefields
  - https://github.com/babel/babel/pull/11178
  - https://github.com/facebook/flow/commit/11b7adbf85ea237cfc01d1b8dc6f6dcdbc299157

# 3.0.0

Support for Node.js 12 has been removed. This package might continue working on older Node.js versions, however, it's highly recommended upgrading to Node.js version 14 or newer. For more details, see: https://nodejs.org/en/about/releases/, or discuss here: https://github.com/adeira/universe/discussions/1588

# 2.0.0

- Set reactRuntime to `automatic` as default. This means that if you are not using the new JSX transform, see https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html, you need to set `reactRuntime: 'classic'` as an option to this package.

# 1.2.0

- Add support for new JSX transform, see https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html

# 1.1.0

- Upgraded babel dependencies

# 1.0.0

- Stable release (upgraded dependencies and some internal changes).

# 0.4.0

- Upgraded dependencies.
- Output in which file you are trying to redeclare `__DEV__`

# 0.3.7.0

- New error preventing abuse of `__DEV__` added. You cannot redeclare this virtual constant in your code!

# 0.3.6.0

- Babel dependencies upgraded to the latest versions (7.6), see: https://babeljs.io/blog/2019/09/05/7.6.0
- Babel bug preventing usage of `string.matchAll` was fixed, see: https://github.com/babel/babel/pull/10136
- Added parser support for `BigInt`.
- Added parser support for throw expressions.

# 0.3.5.0

- This release doesn't add any visible changes. However, there are many bugfixes from Babel side, upgraded dependencies as well as some internal changes usually around some new syntaxes which are now officially supported (see readme file). Please upgrade to this version and let us know about any issues.

# 0.3.4.0

- Now it's possible to configure not only transpilation targets but also different environments via `environments` option. Check readme file to see how to.

# 0.3.3.0

- Flow comments are now being transpiled to normal Flow types when you use `target:flow`. We changed it so that Babel understands them correctly ([see this reported issue](https://github.com/babel/babel/issues/9810)). Please report any issues related to this change.
- Parsing of private class properties is now officially supported.
- Numeric separators are now officially supported. Read more in this proposal: https://github.com/tc39/proposal-numeric-separator

# 0.3.2.0

- Added support for new transpilation target `js-esm`. This target works the same as `js` except it supports ES6 modules.

# 0.3.1.1

- This version just reverts previous changes from version 3.1.0. We discovered unexpected behavior in some specific cases which forces us to revert it. Better strategy will follow.

# 0.3.1.0

- Modules transformation is now determined automatically based on your Babel executor (see: https://babeljs.io/docs/en/babel-preset-env#modules). It should not break anything. They only difference is that previously we supported only CommonJS but now you can get even ES6 modules if your Babel executor supports it (`babel-loader` for example).

# 0.3.0.0

- Added support for dynamic `import()` syntax. This fits well with `@adeira/relay` version 1.0+ and allows you to use `@match`/`@module` directives for data-driven code splitting.
- Breaking: Relay plugin is no longer part of this preset. It was moved to `@adeira/relay`. Please, edit your Babel configuration files (example for Next.js applications):

```js
module.exports = {
  presets: ['@adeira/babel-preset-adeira', 'next/babel'],
  plugins: ['relay'],
};
```

# 0.2.8.0

- Upgrade Relay to version 4.0 (see: https://github.com/facebook/relay/releases/tag/v4.0.0)

# 0.2.7.0

- Browser environment is now supported correctly (last 2 versions, ie >= 11). We are now distributing `@babel/runtime` as a dependency so you may want to remove it from your project. Please report any issues with your environment.

# 0.2.6.0

- Add support for Relay 3.0 (no breaking changes expected, should be backward compatible)

# 0.2.5.0

- Added support for `invariant` transpilation (from `@kiwicom/js`)
- Fixed `warning` transpilation for require

# 0.2.4.0

- Added support for `warning` transpilation (from `@kiwicom/js`)

# 0.2.3.0

- Added `@kiwicom/babel-plugin-orbit-components`

# 0.2.2.0

- Target `flow` now doesn't perform transpilation but only parsing and `__DEV__` declaration instead

# 0.2.1.0

- Add transpilation targets: JS and Flow

# 0.2.0.0

- Upgrade `babel-plugin-relay` to the version 2.0 (potentially breaking change)

# 0.1.4.0

- Add `@babel/preset-react` into default presets

# 0.1.3.0

- Add `babel-plugin-relay` into default plugins

# 0.1.2.0

- Babel dependencies upgraded to the latest versions

# 0.1.1.0

- Added support for `__DEV__` expression
