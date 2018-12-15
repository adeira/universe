This preset simplifies Babel configuration for modern JavaScript we use at Kiwi.com. It adds:

- Flow support `(a: string)`
- object spread `{...a}`
- class properties
- optional chaining `a?.b`
- nullish coalescing operator `a ?? b`

_(more features will follow in future versions as needed)_

This preset uses `env` preset behind the scenes which means it transpiles JS to the current Node.js version you are running. Therefore it's recommended to do the transpilation in your container that is identical to your production version.

# Usage

Install this package:

```
yarn add --dev @babel/core @kiwicom/babel-preset-kiwicom
```

And use it in your `babel.config.js`:

```js
// @flow

/*::

type ApiType = {|
  +cache: {|
    forever: () => void
  |}
|}

*/

module.exports = function(api /*: ApiType */) {
  api.cache.forever();

  const presets = ['@kiwicom/babel-preset-kiwicom'];
  const extraPlugins = [];

  return {
    presets,
    plugins: extraPlugins,
  };
};
```
