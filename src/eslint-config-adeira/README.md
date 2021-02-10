Purpose of this package is to share common eslint configuration among other JS projects in our company. It should not be annoying but rather helpful when you understand _"why"_ of each rule (please give us feedback if you disagree with some rules).

# Usage

Before you start you should **remove all Eslint plugins and Prettier** from your `package.json` files. This package takes care of all the plugins that are necessary. You should install additional plugins only when you need to add some extra rules. It's a good idea to contribute these rules back to this package so everyone can benefit from it.

Install this package (as well as Eslint):

```
yarn add eslint @adeira/eslint-config --dev [--ignore-workspace-root-check]
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

Strict version of the config turns _some_ warnings into errors. We use warnings as a migration strategy for the future breaking release but you can make the config more strict even today (so your CI will fail). Not all warnings are turned into errors - only the ones considered to be errors in the future version. Please be aware that strict mode is like living on the edge: minor upgrade can break your CI (while others will get only warnings). You will be ready for the future major version though.

You can also set your eslint as needed with `babel-eslint` parser for example (you need to install it separately):

```js
const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  root: true,

  extends: ['@adeira/eslint-config'],

  // adjust the rules as needed
  parser: 'babel-eslint',
  env: {
    jest: true,
    node: true,
  },
  rules: {
    eqeqeq: [ERROR, 'smart'],
  },
};
```

It is important to report any issues with the eslint configuration back so we can improve it **for everyone**. These rules should be related only to how we write JS code so it's perfectly fine if you have some additional rules closely related to your project (`no-restricted-imports` for example).

Also please note that **you should not ignore Eslint warnings**! These warnings are helping you to migrate to the future major version. Some of them will turn into errors in the next major version bump.

# Prior art

- https://github.com/facebook/fbjs
- https://github.com/github/eslint-plugin-github
