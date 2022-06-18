Eslint config designed to work well for [Adeira](https://github.com/adeira) projects. It's especially powerful in combination with [Flow](https://flow.org/) and [`hermes-eslint`](https://www.npmjs.com/package/hermes-eslint).

# Usage

Before you start you should **remove all Eslint plugins and Prettier** from your `package.json` files. This package takes care of all the plugins that are necessary. You should install additional plugins only when you need to add some extra rules. It's a good idea to contribute these rules back to this package so everyone can benefit from it.

Install this package (as well as Eslint):

```
yarn add eslint @adeira/eslint-config --dev
```

And use it in your `.eslintrc.js`:

```js
module.exports = {
  root: true,
  extends: [
    '@adeira/eslint-config',

    // - OR -
    // '@adeira/eslint-config/strict',
  ],
};
```

Strict version of the config turns _some_ warnings into errors. We use warnings as a migration strategy for the future breaking release, however, you can make the config more strict even today (so your CI will fail). Not all warnings are turned into errors - only the ones considered to be errors in the future version. Please be aware that strict mode is like living on the edge: minor upgrade can break your CI (while others will get only warnings). You will be ready for the future major version though.

It's recommended using `hermes-eslint` parser with this config (you need to install it separately):

```js
const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  root: true,

  extends: ['@adeira/eslint-config/strict'],

  parser: 'hermes-eslint',
  parserOptions: {
    sourceType: 'module',
  },

  env: {
    es6: true,
    jest: true,
    node: true,
  },
};
```

Please note that **you should not ignore Eslint warnings**! These warnings are helping you to migrate to the future major version. Some of them will turn into errors in the next major version bump.

# Config subsets

The standard config contains a large number of rules, which may not always work for specific projects. There is no need to use the full package only, smaller configs are also available:

- `@adeira/eslint-config/base` - only the basic and most important JavaScript rules
- `@adeira/eslint-config/fbt`¹ - [FBT](https://github.com/facebook/fbt) related rules
- `@adeira/eslint-config/flowtype` - [Flow](https://flow.org/) related rules
- `@adeira/eslint-config/jest` - [Jest](https://jestjs.io/) related rules
- `@adeira/eslint-config/next`¹ - [Next.js](https://nextjs.org/) related rules
- `@adeira/eslint-config/react` - [React](https://reactjs.org/) related rules (React, RN, Hooks, accessibility)
- `@adeira/eslint-config/relay` - [Relay](https://relay.dev/) related rules

<sub>
¹ subset not included in the default `@adeira/eslint-config` or `@adeira/eslint-config/strict`
</sub>

Use them in your `.eslintrc.js`:

```js
module.exports = {
  root: true,
  extends: [
    '@adeira/eslint-config/base',
    '@adeira/eslint-config/react',
    '@adeira/eslint-config/jest',
  ],
};
```

Alternatively, you can extend the default preset with additional optional rules:

```js
module.exports = {
  extends: [
    '@adeira/eslint-config',
    '@adeira/eslint-config/next', // optional Next.js rules not included by default
  ],

  // The following settings might be needed in case you are trying to apply Next.js preset inside
  // monorepo subdirectory, see: https://nextjs.org/docs/basic-features/eslint#rootdir
  settings: {
    next: { rootDir: __dirname },
  },
};
```

# Prior art

- https://github.com/facebook/fbjs
- https://github.com/github/eslint-plugin-github
