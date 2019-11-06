This package prepares our public NPM packages to be published. It can automatically find these packages, transpile them based on our Babel configuration, copy Flow versions of the files and automatically publish it to NPM (in CI). It publishes only packages with new version and it ignores old or current versions.

This publisher uses [@adeira/babel-preset-adeira](https://www.npmjs.com/package/@adeira/babel-preset-adeira) behind the scenes to transpile JS (and JS-ESM) and Flow files.

Please note: changelogs are not responsibility of this package. You should write them manually for your users.

# Installation

```text
yarn add --dev @kiwicom/monorepo-npm-publisher
```

This package is intended to be run by CI server.

# Usage

```js
import path from 'path';
import publish from '@kiwicom/npm-publisher';

(async () => {
  await publish({
    // Run in a "dry" mode (without publishing to NPM)?
    dryRun: true,

    // Where to store transpiled code before it's being published.
    buildCache: path.join(
      os.tmpdir(),
      'com.kiwi.TODO_YOUR_PROJECT.npm', // change please
      '.build',
    ),

    // Workspaces to publish on NPM. It takes into account only
    // packages with public visibility set in `package.json`.
    workspaces: new Set([
      '@adeira/js',
      '@adeira/fetch',
      '@adeira/relay',
      '@adeira/eslint-config',
    ]),

    npmAuthToken: '*** TODO ***', // see: https://www.npmjs.com/settings/<USERNAME>/tokens
  });
})();
```

This NPM publisher automatically takes `.npmignore` (or `.gitignore`) files into account. Read this info for more details: https://docs.npmjs.com/misc/developers#keeping-files-out-of-your-package

# Behind the scenes explanation

Let's have a look at our [JS project](https://github.com/kiwicom/js) and what happens when you run this publisher. Before:

```text
src/packages/js
├── LICENSE
├── README.md
├── package.json
└── src
    ├── __tests__
    │   ├── invariant.test.js
    │   ├── isObject.test.js
    │   ├── sprintf.test.js
    │   └── warning.test.js
    ├── index.js
    ├── invariant.js
    ├── isObject.js
    ├── sprintf.js
    └── warning.js

2 directories, 12 files
```

After:

```text
com.kiwi.universe.npm/.build/js
├── LICENSE
├── README.md
├── package.json
└── src
    ├── index.js
    ├── index.js.flow
    ├── index.mjs
    ├── invariant.js
    ├── invariant.js.flow
    ├── invariant.mjs
    ├── isObject.js
    ├── isObject.js.flow
    ├── isObject.mjs
    ├── sprintf.js
    ├── sprintf.js.flow
    ├── sprintf.mjs
    ├── warning.js
    ├── warning.js.flow
    └── warning.mjs

1 directory, 18 files
```

As you can see all the important files are still in the final bundle but tests are missing. It's because they are excluded in `.npmignore` file. Every JS file is distributed in multiple variants. JS files are transpiled so they can be used basically everywhere:

```js
'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = isObject;

var _typeof2 = _interopRequireDefault(require('@babel/runtime/helpers/typeof'));

function isObject(value) {
  return (0, _typeof2.default)(value) === 'object' && value !== null && !Array.isArray(value);
}
```

Flow files contain more or less raw code with Flow definitions (it's not 1:1 to original, we also apply some transformations):

```js
// @flow strict

export default function isObject(value: mixed): boolean %checks {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
```

You can read more about [Flow Declaration Files here](https://flow.org/en/docs/declarations/). And MJS files contain JS version for modern environments (essentially JS version but with ES6 modules support):

```js
import _typeof from '@babel/runtime/helpers/esm/typeof';
export default function isObject(value) {
  return _typeof(value) === 'object' && value !== null && !Array.isArray(value);
}
```

One last change is happening: NPM publisher modifies `package.json` file so it contains correct `module` field pointing to MJS file variants. Please note: ES6 modules can be disabled completely when you specify `"module": false` in your package.json:

```json
{
  "name": "withDisabledES6",
  "version": "0.0.0",
  "main": "src/index.js",
  "module": false,
  "dependencies": {
    "//": "none"
  }
}
```

This is handy when your code is not ready for ES6 modules yet.

# Note on ES6 modules

_The following text describes the current situation up to this date. Seems like some parts of the JS ecosystem are not well documented and they may change in future._

Usually tools use CJS requires but some of them also support ES6 imports. This is how it works in Next.js for example:

```js
const webpackResolveConfig = {
  // Disable .mjs for node_modules bundling
  extensions: isServer
    ? ['.js', '.mjs', '.jsx', '.json', '.wasm']
    : ['.mjs', '.js', '.jsx', '.json', '.wasm'],
  mainFields: isServer ? ['main', 'module'] : ['browser', 'module', 'main'],
  // ...
};
```

Notice the ordering of supported extensions. Therefore Next.js actually uses different systems for FE and BE. We distribute both versions: JS and MJS files. Different situation is when package uses MJS and this package has dependency on different package which also uses MJS. This subpackage must be configured properly in `package.json`. The only possible solution is currently this:

```json
{
  "name": "@adeira/js",
  "module": "src/index.mjs",
  "main": "src/index"
}
```

Notice that field `main` **cannot** have file extension! There is currently not many resources explaining why but it's further explained in [this Babel issue](https://github.com/babel/babel/issues/7294). This extension cannot be present even when you don't have `module` field but you are distributing MJS files anyway.

More resources:

- https://github.com/graphql/graphql-js/issues/1217
- https://nodejs.org/api/esm.html#esm_package_entry_points
- https://nodejs.org/api/modules.html#modules_addenda_the_mjs_extension
- https://webpack.js.org/concepts/module-resolution/
- https://github.com/webpack/webpack/issues/7482
