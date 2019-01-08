Purpose of this package is to share common eslint configuration among other JS projects in our company.

# Usage

Before you start you should **remove all Eslint plugins and Prettier** from your `package.json` files. This package takes care of all the plugins that are necessary. You should install additional plugins only when you need to add some extra rules. It's a good idea to contribute these rules back to this package so everyone can benefit from it.

Install this package (as well as Eslint):

```
yarn add eslint @kiwicom/eslint-config --dev [--ignore-workspace-root-check]
```

And use it in your `.eslintrc.js`:

```js
module.exports = {
  root: true,
  extends: ['@kiwicom/eslint-config'],
};
```

Or set your eslint as needed with `babel-eslint` parser for example (you need to install it separately):

```js
const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  root: true,

  extends: ['@kiwicom/eslint-config'],

  // adjust the rules as needed
  parser: 'babel-eslint',
  env: {
    jest: true,
    node: true,
  },
  rules: {
    eqeqeq: OFF,
  },
};
```

It is important to report any issues with the eslint configuration back so we can improve it **for everyone**. These rules should be related only to how we write JS code so it's perfectly fine if you have some additional rules closely related to your project (`no-restricted-imports` for example).
