**This package doesn't support React Native**

This preset simplifies Babel configuration for modern JavaScript we use at Kiwi.com. There are two transpilation targets available: JS (default) and Flow. JavaScript transpilation target adds these features:

- Flow support `(a: string)`
- JSX support `<Component />`
- class properties `class A { b = 1; }`
- nullish coalescing operator `a ?? b`
- object rest spread `{...a}`
- optional chaining `a?.b`
- dev expression `__DEV__`
- support for Relay fragments `graphql ...`
- granular imports of Orbit components (see: https://www.npmjs.com/package/@kiwicom/babel-plugin-orbit-components)
- transforms `invariant` from `@kiwicom/js`
- transforms `warning` from `@kiwicom/js`

This preset uses `env` preset behind the scenes which means it transpiles JS to the current Node.js version you are running. Therefore it's recommended to do the transpilation in your Docker container that is identical to your production version. You can also choose Flow as a transpilation target (see bellow). This mode adds these features:

- declares `__DEV__` expression when used

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

Alternatively, you can specify the transpilation target:

```js
module.exports = function(api /*: ApiType */) {
  api.cache.forever();

  return {
    presets: [
      [
        '@kiwicom/babel-preset-kiwicom',
        {
          target: 'flow', // or 'js' (default)
        },
      ],
    ],
  };
};
```

What is the difference between these transpilation targets? JavaScript target transpiles your code so it can run in any Node.js environment with the modern JS features whereas Flow only tweaks the exported types so they can be used in different projects (but leaves JS code as is).

# Prior art

- https://github.com/facebook/fbjs/tree/master/packages/babel-preset-fbjs
- https://github.com/github/babel-preset-github
