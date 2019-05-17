**This package doesn't support React Native**

This preset simplifies Babel configuration for modern JavaScript we use at Kiwi.com. There are three transpilation targets available: `js` (default), `js-esm` and `flow`. JavaScript transpilation target adds these features:

- Flow support `(a: string)`
- JSX support `<Component />`
- [`__DEV__` expression](#__dev__-expression)
- [granular imports of Orbit components](https://www.npmjs.com/package/@kiwicom/babel-plugin-orbit-components)
- [transforms `invariant` and `warning` from `@kiwicom/js`](#invariant-and-warning-functions)
- _and many more depending on your environment..._

On top of that these [proposals](https://github.com/tc39/proposals) are enabled by default:

- optional chaining `a?.b` ([stage 1 proposal ⚠️](https://github.com/tc39/proposal-optional-chaining))
- nullish coalescing operator `a ?? b` ([stage 1 proposal ⚠️](https://github.com/babel/proposals/issues/14))
- class fields `class A { b = 1; }` ([stage 3 proposal](https://github.com/tc39/proposal-class-fields))
- dynamic `import()` ([stage 3 proposal](https://github.com/tc39/proposal-dynamic-import))
- object rest spread `{...a}` ([stage 4 proposal ✅](https://github.com/tc39/proposal-object-rest-spread))
- capturing groups in RegExp `/(?<year>[0-9]{4})/` ([stage 4 proposal ✅](https://github.com/tc39/proposal-regexp-named-groups))

JS-ESM variant is doing the same except it's targeting modern JS environments which support ES6 modules (`import`/`export`).

This preset uses `env` preset behind the scenes which means it transpiles JS to the current Node.js version you are running. Therefore it's recommended to do the transpilation in your Docker container that is identical to your production version. On top of that it transpiles code to be compatible with our front-end requirements (last 2 versions, ie >= 11). You can also choose Flow as a transpilation target (see bellow). This mode uses _only_ these features:

- declares `__DEV__` expression when used
- transpiles Flow comments into Flow types (`/*:: type Example = number; */` -> `type Example = number;`)

<!-- AUTOMATOR:HIRING_BANNER -->

> Do you like our open source? We are looking for skilled JavaScript developers to help us build it. Check our open positions: https://jobs.kiwi.com/

<!-- /AUTOMATOR:HIRING_BANNER -->

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
  api.assertVersion(7);
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
  api.assertVersion(7);
  api.cache.forever();

  return {
    presets: [
      [
        '@kiwicom/babel-preset-kiwicom',
        {
          target: 'flow', // or 'js' (default) or 'js-esm'
        },
      ],
    ],
  };
};
```

What is the difference between these transpilation targets? JavaScript target transpiles your code so it can run in any Node.js and browsers environment with the modern JS features whereas Flow only tweaks the exported types so they can be used in different projects (but leaves JS code as is).

It's also easily possible to change your target based on your Babel runner. It's handy when you need to support SSR as well as ESM:

```js
function isWebpack(caller) /*: boolean %checks */ {
  // https://github.com/babel/babel-loader
  return !!(caller && caller.name === 'babel-loader');
}

module.exports = function(api /*: ApiType */) {
  api.assertVersion(7);
  api.cache.forever();

  return {
    presets: [
      [
        '@kiwicom/babel-preset-kiwicom',
        {
          target: api.caller(isWebpack) ? 'js-esm' : 'js',
        },
      ],
    ],
  };
};
```

# Features

We want to make our life easier by writing modern JS and this Babel preset helps us with that. It's tailored for needs of Kiwi.com (except React Native) and it brings mostly syntactic sugar into our JS code. However, there are some additional features which are not related to JS syntax:

## `__DEV__` expression

Expression `__DEV__` is a boolean value and it is set to `true` in dev (and test) environments but it's `false` in production. It's useful when you want to call something only for development:

```js
if (__DEV__) {
  console.log('This is relevant only when developing the application.');
}
```

These expressions should be stripped out with dead-code elimination when building your application for production.

Please note: it's invalid to redeclare this expression with a custom value just like it's invalid to redeclare `true` or `false`. It's because it transpiles to `process.env` call and it would result in invalid JS code:

```js
__DEV__ = true;

//   ↓ ↓ ↓

process.env.NODE_ENV !== 'production' = true;  // ??? 🧐
```

Our [Eslint config](https://github.com/kiwicom/eslint-config-kiwicom) can help you to catch such mistakes.

## `invariant` and `warning` functions

Functions [`invariant` and `warning`](https://www.npmjs.com/package/@kiwicom/js#invariant--warning) are useful when you want to express some unexpected application state or show warnings with helpful messages. They work without any presets because they are normal functions (using the `__DEV__` expression behind the scenes) however, they add unnecessary code to the production build. This preset adds additional transformation which can remove this unnecessary code:

```js
import { invariant } from '@kiwicom/js';
invariant(condition, argument, argument);

//     ↓ ↓ ↓ ↓ ↓ ↓

import { invariant } from '@kiwicom/js';
if (!condition) {
  // this is essentially __DEV__ (vv)
  if (process.env.NODE_ENV !== 'production') {
    invariant(false, argument, argument);
  } else {
    invariant(false);
  }
}
```

Technically, it looks like this final code is larger than the input. We expect that you use dead-code elimination so the final build is actually reduced to minimum. The same applies to `warning` except in this case the final output can be eliminated completely:

```js
import { warning } from '@kiwicom/js';
warning(condition, argument, argument);

//     ↓ ↓ ↓ ↓ ↓ ↓

import { warning } from '@kiwicom/js';
// __DEV__ (vv)
if (process.env.NODE_ENV !== 'production') {
  warning(condition, argument, argument);
}
```

# Prior art

- https://github.com/facebook/fbjs/tree/master/packages/babel-preset-fbjs
- https://github.com/github/babel-preset-github
