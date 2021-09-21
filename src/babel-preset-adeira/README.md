**This package currently doesn't support React Native**

This preset simplifies Babel configuration for modern JavaScript we use at Adeira.

- [Installation and Usage](#installation-and-usage)
- [Configuration](#configuration)
  - [Transpilation targets](#transpilation-targets)
  - [Different environments](#different-environments)
  - [New JSX transform](#new-jsx-transform)
- [Transpilation features explained](#transpilation-features-explained)
  - [`__DEV__` expression](#__dev__-expression)
  - [`invariant` and `warning` functions](#invariant-and-warning-functions)

# Installation and Usage

Install this package:

```
yarn add --dev @babel/core @adeira/babel-preset-adeira
```

And use it in your `babel.config.js`:

```js
module.exports = function (api) {
  api.assertVersion(7);
  api.cache.forever();

  const presets = ['@adeira/babel-preset-adeira'];
  const extraPlugins = []; // add whatever you want extra

  return {
    presets,
    plugins: extraPlugins,
  };
};
```

# Configuration

This preset tries to be opinionated to shield you from the difficult configuration stuff, but it offers some configuration options, so you can target different environments and situations (modern browsers vs. Node.js vs. Flow-only envs and so on). Current default configuration is:

```js
const config = {
  target: 'js',
  environments: {
    node: 'current',
    browsers: ['defaults'], // See:  npx browserslist 'defaults'
  },
};
```

This should be okay for the majority of the use-cases. However, you can tweak these options as needed (continue below).

## Transpilation targets

There are three transpilation targets available: `js` (default), `js-esm` and `flow`. JavaScript transpilation target adds these features:

- Flow basic support `(a: string)`
- Flow enums [`enum Status { … }`](https://flow.org/en/docs/enums/)
- JSX support `<Component />`
- [`__DEV__` expression](#__dev__-expression)
- [transforms `invariant` and `warning` from `@adeira/js`](#invariant-and-warning-functions)
- [generator functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*) `function*` (we do _NOT_ support [async generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of) at this moment)
- [exponentiation operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Exponentiation) `a ** 2`
- _and many more depending on your environment, see section [different environments](#different-environments)…_

On top of that these [proposals](https://github.com/tc39/proposals) are enabled by default:

- optional chaining `a?.b` ([stage 4 proposal ✅](https://github.com/tc39/proposal-optional-chaining))
- nullish coalescing operator `a ?? b` ([stage 4 proposal ✅](https://github.com/tc39/proposal-nullish-coalescing))
- class fields `class A { b = 1; #c = 2 }` ([stage 3 proposal](https://github.com/tc39/proposal-class-fields))
- dynamic `import()` ([stage 4 proposal ✅](https://github.com/tc39/proposal-dynamic-import))
- numeric separators `1_000_000` ([stage 4 proposal ✅](https://github.com/tc39/proposal-numeric-separator))
- object rest spread `{...a}` ([stage 4 proposal ✅](https://github.com/tc39/proposal-object-rest-spread))
- capturing groups in RegExp `/(?<year>[0-9]{4})/` ([stage 4 proposal ✅](https://github.com/tc39/proposal-regexp-named-groups))
- _and many more are being added automatically as JS ecosystem evolves, see: https://babeljs.io/docs/en/babel-parser#latest-ecmascript-features_

JS-ESM variant is doing the same except it's targeting modern JS environments which support ES6 modules (`import`/`export`).

This preset uses `env` preset behind the scenes which means that by default it transpiles JS to the current Node.js version you are running. Therefore, it's recommended to do the transpilation in your Docker container that is identical to your production version. On top of that it transpiles code based on the [Browserlist Best Practices](https://github.com/browserslist/browserslist#best-practices) (can be changed via `environments` option). You can also choose Flow as a transpilation target. Flow target uses _only_ these features:

- declares `__DEV__` expression when used
- transpiles Flow comments into Flow types (`/*:: type Example = number; */` -> `type Example = number;`)

Use option `target` to enable Flow-only transpilations:

```js
module.exports = function (api) {
  api.assertVersion(7);
  api.cache.forever();

  return {
    presets: [
      [
        '@adeira/babel-preset-adeira',
        {
          target: 'flow', // or 'js' (default) or 'js-esm'
        },
      ],
    ],
  };
};
```

What is the difference between these transpilation targets? JavaScript target transpiles your code, so it can run in any Node.js and browsers environment with the modern JS features whereas Flow only tweaks the exported types, so they can be used in different projects (but leaves JS code as is, think better [flow-copy-source](https://github.com/Macil/flow-copy-source)).

It's also easily possible to change your target based on your Babel runner. It's handy when you need to support SSR with CommonJS as well as ESM:

```js
function isWebpack(caller) {
  return !!(caller && caller.name === 'babel-loader'); // See: https://github.com/babel/babel-loader
}

module.exports = function (api) {
  api.assertVersion(7);

  return {
    presets: [
      [
        '@adeira/babel-preset-adeira',
        {
          target: api.caller(isWebpack) ? 'js-esm' : 'js',
        },
      ],
    ],
  };
};
```

Note that the above-mentioned is also necessary to enable code-splitting with `import(…)`. The default (if no target is set), will be `commonjs`, and it will not code split your dynamic imports.

## Different environments

While transpilation targets are targeting different JavaScript systems (ES6, Flow), you can also change environments (Browsers, Node.js, Electron). To do so you can use `environments` configuration:

```js
module.exports = {
  presets: [
    [
      '@adeira/babel-preset-adeira',
      {
        environments: {
          node: 'current', // targeting only current Node.js version (no browsers)
        },
      },
    ],
  ],
};
```

Please note: environments and transpilation targets are 2 distinct features. Transpilation targets allow you to modify what kind of code you want to get as a result of compilation (JS, JS with modules, Flow types) while environments allow you to enable/disable tranpilation features based on your environment. For example: common use-case it to use `js-esm` tranpilation target so that Webpack can perform tree-shaking but environment is set to old browsers only. This means that Webpack can do the magic thanks to `import/export` however, final code will work in old browsers because Webpack is going to merge everything together and effectively remove these ES6 imports. Few more examples to understand the difference between transpilation targets and environments:

- give me JavaScript (_`js` target_) with features for Internet Explorer 10 (_environment_)
- give me JavaScript with ES6 modules (_`js-esm` target_) with features for my Node.js version (_environment_)
- give me Flow code (_`flow` target_) with features for all modern browsers (_environment_)

You can easily debug what environments and plugins are being used when you pass `debug:true` option to our Babel preset options:

```js
module.exports = {
  presets: [
    [
      '@adeira/babel-preset-adeira',
      {
        debug: true,
      },
    ],
  ],
};
```

You should be able to see similar output (default values to this date for [`adeira/universe`](https://github.com/adeira/universe)):

```text
Using targets:
{
  "android": "90",
  "chrome": "89",
  "edge": "90",
  "firefox": "78",
  "ie": "11",
  "ios": "13.4",
  "node": "16.8",
  "opera": "75",
  "safari": "14",
  "samsung": "13"
}

Using modules transform: commonjs

Using plugins:
  proposal-private-property-in-object { android, chrome < 91, edge, firefox < 90, ie, ios, node, opera, safari, samsung }
  proposal-class-properties { firefox < 90, ie, ios, safari < 15, samsung }
  proposal-private-methods { firefox < 90, ie, ios, safari < 15, samsung }
  proposal-numeric-separator { ie }
  proposal-logical-assignment-operators { firefox < 79, ie, ios < 14, samsung }
  proposal-nullish-coalescing-operator { ie }
  proposal-optional-chaining { ie }
  proposal-json-strings { ie }
  proposal-optional-catch-binding { ie }
  transform-parameters { ie }
  proposal-async-generator-functions { ie }
  proposal-object-rest-spread { ie }
  transform-dotall-regex { ie }
  proposal-unicode-property-regex { ie }
  transform-named-capturing-groups-regex { ie }
  transform-async-to-generator { ie }
  transform-exponentiation-operator { ie }
  transform-template-literals { ie }
  transform-literals { ie }
  transform-function-name { ie }
  transform-arrow-functions { ie }
  transform-classes { ie }
  transform-object-super { ie }
  transform-shorthand-properties { ie }
  transform-duplicate-keys { ie }
  transform-computed-properties { ie }
  transform-for-of { ie }
  transform-sticky-regex { ie }
  transform-unicode-escapes { ie }
  transform-unicode-regex { ie }
  transform-spread { ie }
  transform-destructuring { ie }
  transform-block-scoping { ie }
  transform-typeof-symbol { ie }
  transform-new-target { ie }
  transform-regenerator { ie }
  proposal-export-namespace-from { firefox < 80, ie, ios, safari }
  transform-modules-commonjs
  proposal-dynamic-import

Using polyfills: No polyfills were added, since the `useBuiltIns` option was not set.
```

## New JSX transform

This packages uses the new JSX transform as default from `2.0.0` (see https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html). Optional support for the new JSX transform was added in `1.2.0`.

If you want to use the classical version with this package from `2.0.0` (having `import React from 'react';` in all files) you can use it like this:

```js
module.exports = {
  presets: [
    [
      '@adeira/babel-preset-adeira',
      {
        reactRuntime: 'classic',
      },
    ],
  ],
};
```

If you want to use the new JSX transform, you don't need to explicitly set `reactRuntime: 'automatic'`.

# Transpilation features explained

We want to make our life easier by writing modern JS and this Babel preset helps us with that. It's tailored for needs of Adeira, and it brings mostly syntactic sugar into our JS code. However, there are some additional features which are not related to JS syntax:

## `__DEV__` expression

Expression `__DEV__` is a great way how to detect development environment while keeping this check multiplatform (`process.env` doesn't exist in React Native for example). It's a boolean value and it is set to `true` in dev (and test) environments, but it's `false` in production. It's useful when you want to call something only for development:

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

process.env.NODE_ENV !== 'production' = true; // ??? 🧐
```

Our [Eslint config](https://github.com/adeira/universe/blob/master/src/eslint-config-adeira) can help you to catch such mistakes. You'll get an error in newer versions of this preset:

```text
Error: You are trying to re-declare __DEV__ virtual constant but that's illegal.
This constant is being defined by our Babel preset.
```

Read more: [How Does the Development Mode Work?](https://overreacted.io/how-does-the-development-mode-work/)

## `invariant` and `warning` functions

Functions [`invariant` and `warning`](https://www.npmjs.com/package/@adeira/js#invariant--warning) are useful when you want to express some unexpected application state or show warnings with helpful messages. They work without any presets because they are normal functions (using the `__DEV__` expression behind the scenes) however, they add unnecessary code to the production build. This preset adds additional transformation which can remove this unnecessary code:

```js
import { invariant } from '@adeira/js';
invariant(condition, argument, argument);

//     ↓ ↓ ↓ ↓ ↓ ↓

import { invariant } from '@adeira/js';
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
import { warning } from '@adeira/js';
warning(condition, argument, argument);

//     ↓ ↓ ↓ ↓ ↓ ↓

import { warning } from '@adeira/js';
// __DEV__ (vv)
if (process.env.NODE_ENV !== 'production') {
  warning(condition, argument, argument);
}
```

# Prior art

- https://github.com/facebook/fbjs/tree/master/packages/babel-preset-fbjs
- https://github.com/github/babel-preset-github
- https://github.com/airbnb/babel-preset-airbnb
