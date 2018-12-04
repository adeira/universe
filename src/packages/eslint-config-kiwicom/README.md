Purpose of this package is to share common eslint configuration among other JS projects in our company.

# Usage

Install this package:

```
yarn add --dev @kiwicom/eslint-config
```

And use it in your `.eslintrc.js`:

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
