**This package doesn't support React Native**

This preset simplifies Babel configuration for modern JavaScript we use at Kiwi.com.

- [Installation and Usage](#installation-and-usage)
- [Configuration](#configuration)
  - [Transpilation targets](#transpilation-targets)
  - [Different environments](#different-environments)
- [Transpilation features explained](#transpilation-features-explained)
  - [`__DEV__` expression](#__dev__-expression)
  - [`invariant` and `warning` functions](#invariant-and-warning-functions)

# Installation and Usage

Install this package:

```
yarn add --dev @babel/core @kiwicom/babel-preset-kiwicom
```

And use it in your `babel.config.js`:

```js
// @flow strict

/*::

type ApiType = {|
  +cache: {|
    forever: () => void,
  |},
|};

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

<!-- AUTOMATOR:HIRING_BANNER -->

> Do you like our open source? We are looking for skilled JavaScript developers to help us build it. Check our open positions at https://jobs.kiwi.com/ or get some new skills during our annual Summer Camp: https://summercamp.cz/

<!-- /AUTOMATOR:HIRING_BANNER -->

# Configuration

This preset tries to be opinionated to shield you from the difficult configuration stuff but it offers some configuration options so you can target different environments and situations (modern browsers vs. Node.js vs. Flow-only envs and so on). Current default configuration is:

```js
const config = {
  target: 'js',
  environments: {
    node: 'current',
    browsers: [
      // See: https://browserl.ist/?q=last+2+versions%2C+ie+%3E%3D+11
      // Or:  npx browserslist 'last 2 versions, ie >= 11'
      'last 2 versions',
      'ie >= 11',
    ],
  },
};
```

This should be OK for majority of the use-cases. However, you can tweak these options as needed (continue bellow).

## Transpilation targets

There are three transpilation targets available: `js` (default), `js-esm` and `flow`. JavaScript transpilation target adds these features:

- Flow support `(a: string)`
- JSX support `<Component />`
- [`__DEV__` expression](#__dev__-expression)
- [granular imports of Orbit components](https://www.npmjs.com/package/@kiwicom/babel-plugin-orbit-components)
- [transforms `invariant` and `warning` from `@kiwicom/js`](#invariant-and-warning-functions)
- _and many more depending on your environment, see section [different environments](#different-environments)..._

On top of that these [proposals](https://github.com/tc39/proposals) are enabled by default:

- optional chaining `a?.b` ([stage 2 proposal](https://github.com/tc39/proposal-optional-chaining))
- nullish coalescing operator `a ?? b` ([stage 2 proposal](https://github.com/tc39/proposal-nullish-coalescing))
- class fields `class A { b = 1; #c = 2 }` ([stage 3 proposal](https://github.com/tc39/proposal-class-fields))
- dynamic `import()` ([stage 3 proposal](https://github.com/tc39/proposal-dynamic-import))
- numeric separators `1_000_000` ([stage 3 proposal](https://github.com/tc39/proposal-numeric-separator))
- object rest spread `{...a}` ([stage 4 proposal ✅](https://github.com/tc39/proposal-object-rest-spread))
- capturing groups in RegExp `/(?<year>[0-9]{4})/` ([stage 4 proposal ✅](https://github.com/tc39/proposal-regexp-named-groups))

JS-ESM variant is doing the same except it's targeting modern JS environments which support ES6 modules (`import`/`export`).

This preset uses `env` preset behind the scenes which means that by default it transpiles JS to the current Node.js version you are running. Therefore it's recommended to do the transpilation in your Docker container that is identical to your production version. On top of that it transpiles code to be compatible with our front-end [Browserlist](https://github.com/browserslist/browserslist) requirements (can be changed via `environment` option). You can also choose Flow as a transpilation target. Flow target uses _only_ these features:

- declares `__DEV__` expression when used
- transpiles Flow comments into Flow types (`/*:: type Example = number; */` -> `type Example = number;`)

Use option `target` to enable Flow-only transpilations:

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

What is the difference between these transpilation targets? JavaScript target transpiles your code so it can run in any Node.js and browsers environment with the modern JS features whereas Flow only tweaks the exported types so they can be used in different projects (but leaves JS code as is, think better [flow-copy-source](https://github.com/Macil/flow-copy-source)).

It's also easily possible to change your target based on your Babel runner. It's handy when you need to support SSR as well as ESM:

```js
function isWebpack(caller) /*: boolean %checks */ {
  // see: https://github.com/babel/babel-loader
  return !!(caller && caller.name === 'babel-loader');
}

module.exports = function(api /*: ApiType */) {
  api.assertVersion(7);

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

## Different environments

While transpilation targets are targeting different JavaScript systems (ES6, Flow), you can also change environments (Browsers, Node.js, Electron). To do so you can use `environments` configuration:

```js
module.exports = {
  presets: [
    [
      '@kiwicom/babel-preset-kiwicom',
      {
        environments: {
          node: 'current', // targeting only current Node.js version (no browsers)
        },
      },
    ],
  ],
};
```

Please note: environments and transpilation targets are 2 distinct features. Transpilation targets allow you to modify what kind of code you want to get (JS, JS with modules, Flow types) while environments allow you to enable/disable tranpilation features based on your environment. For example: common use-case it to use `js-esm` tranpilation target so that Webpack can perform tree-shaking but environment is set to old browsers only. This means that Webpack can do the magic thanks to `import/export` however, final code will work in old browsers because Webpack is going to merge everything together and effectively remove these ES6 imports. Few more examples to understand the difference between transpilation targets and environments:

- give me JavaScript (_`js` target_) with features for Internet Explorer 10 (_environment_)
- give me JavaScript with ES6 modules (_`js-esm` target_) with features for Node.js (_environment_)
- give me Flow code (_`flow` target_) with features for all modern browsers (_environment_)

You can easily debug what environments and plugins are being used when you pass `debug:true` option to our Babel preset options:

```js
module.exports = {
  presets: [
    [
      '@kiwicom/babel-preset-kiwicom',
      {
        debug: true,
      },
    ],
  ],
};
```

You should be able to see similar output (default values to this date for [`example-relay`](https://github.com/kiwicom/relay-example)):

```text
@babel/preset-env: `DEBUG` option

Using targets:
{
  "android": "4.4.3",
  "chrome": "72",
  "edge": "17",
  "firefox": "65",
  "ie": "10",
  "ios": "12",
  "node": "12.1",
  "opera": "57",
  "safari": "12",
  "samsung": "8.2"
}

Using modules transform: commonjs

Using plugins:
  transform-template-literals { "android":"4.4.3", "ie":"10", "ios":"12", "safari":"12" }
  transform-literals { "android":"4.4.3", "ie":"10" }
  transform-function-name { "android":"4.4.3", "edge":"17", "ie":"10" }
  transform-arrow-functions { "android":"4.4.3", "ie":"10" }
  transform-block-scoped-functions { "android":"4.4.3", "ie":"10" }
  transform-classes { "android":"4.4.3", "ie":"10" }
  transform-object-super { "android":"4.4.3", "ie":"10" }
  transform-shorthand-properties { "android":"4.4.3", "ie":"10" }
  transform-duplicate-keys { "android":"4.4.3", "ie":"10" }
  transform-computed-properties { "android":"4.4.3", "ie":"10" }
  transform-for-of { "android":"4.4.3", "ie":"10" }
  transform-sticky-regex { "android":"4.4.3", "ie":"10" }
  transform-dotall-regex { "android":"4.4.3", "edge":"17", "firefox":"65", "ie":"10" }
  transform-unicode-regex { "android":"4.4.3", "ie":"10" }
  transform-spread { "android":"4.4.3", "ie":"10" }
  transform-parameters { "android":"4.4.3", "edge":"17", "ie":"10" }
  transform-destructuring { "android":"4.4.3", "edge":"17", "ie":"10" }
  transform-block-scoping { "android":"4.4.3", "ie":"10" }
  transform-typeof-symbol { "android":"4.4.3", "ie":"10" }
  transform-new-target { "android":"4.4.3", "ie":"10" }
  transform-regenerator { "android":"4.4.3", "ie":"10" }
  transform-exponentiation-operator { "android":"4.4.3", "ie":"10" }
  transform-async-to-generator { "android":"4.4.3", "ie":"10" }
  proposal-async-generator-functions { "android":"4.4.3", "edge":"17", "ie":"10" }
  proposal-object-rest-spread { "android":"4.4.3", "edge":"17", "ie":"10" }
  proposal-unicode-property-regex { "android":"4.4.3", "edge":"17", "firefox":"65", "ie":"10", "samsung":"8.2" }
  proposal-json-strings { "android":"4.4.3", "edge":"17", "ie":"10", "samsung":"8.2" }
  proposal-optional-catch-binding { "android":"4.4.3", "edge":"17", "ie":"10", "samsung":"8.2" }
  transform-named-capturing-groups-regex { "android":"4.4.3", "edge":"17", "firefox":"65", "ie":"10", "samsung":"8.2" }

Using polyfills: No polyfills were added, since the `useBuiltIns` option was not set.
```

# Transpilation features explained

We want to make our life easier by writing modern JS and this Babel preset helps us with that. It's tailored for needs of Kiwi.com and it brings mostly syntactic sugar into our JS code. However, there are some additional features which are not related to JS syntax:

## `__DEV__` expression

Expression `__DEV__` is a great way how to detect development environment while keeping this check multiplatform (`process.env` doesn't exist in React Native for example). It's a boolean value and it is set to `true` in dev (and test) environments but it's `false` in production. It's useful when you want to call something only for development:

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
- https://github.com/airbnb/babel-preset-airbnb
