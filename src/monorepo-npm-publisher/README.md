This package prepares our public NPM packages to be published. It can automatically find these packages, transpile them based on our Babel configuration, copy Flow versions of the files and automatically publish it to NPM (only when running on CI server). It publishes only packages with new version and it ignores old or current versions.

This publisher uses [@adeira/babel-preset-adeira](https://www.npmjs.com/package/@adeira/babel-preset-adeira) behind the scenes to transpile JS and Flow files.

_Please note: changelogs are not responsibility of this package. You should write them manually for your users._

# Installation

```text
yarn add --dev @adeira/monorepo-npm-publisher
```

This package is intended to be run by CI server.

# Usage

```js
import path from 'path';
import os from 'os';
import publish from '@adeira/monorepo-npm-publisher';

(async () => {
  await publish({
    // Run in a "dry" mode (without publishing to NPM)?
    dryRun: true,

    // Where to store transpiled code before it's being published.
    buildCache: path.join(
      os.tmpdir(),
      'com.adeira.TODO_YOUR_PROJECT.npm', // please change
      '.build',
    ),

    // Workspaces to publish on NPM. It takes into account only
    // packages with public visibility set in `package.json`.
    workspaces: new Set(['@adeira/js', '@adeira/fetch', '@adeira/relay', '@adeira/eslint-config']),

    // See: https://www.npmjs.com/settings/<USERNAME>/tokens
    npmAuthToken: '*** TODO ***',

    // React runtime `classic` or `automatic` if you want to use the new JSX transform.
    // Runtime `automatic` is the default option. See: https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html
    reactRuntime: 'classic',
  });
})();
```

This NPM publisher automatically takes `.npmignore` (or `.gitignore`) files into account. Read this info for more details: https://docs.npmjs.com/misc/developers#keeping-files-out-of-your-package

# Behind the scenes explanation

Let's have a look at our [JS project](https://github.com/adeira/universe/tree/master/src/js) and what happens when you run this publisher. Before:

```text
src/js
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
com.adeira.universe.npm/.build/js
├── LICENSE
├── README.md
├── package.json
└── src
    ├── index.js
    ├── index.js.flow
    ├── invariant.js
    ├── invariant.js.flow
    ├── isObject.js
    ├── isObject.js.flow
    ├── sprintf.js
    ├── sprintf.js.flow
    ├── warning.js
    ├── warning.js.flow

1 directory, 13 files
```

As you can see all the important files are still in the final bundle but tests are missing. It's because they are excluded in `.npmignore` file. JS files are transpiled so they can be used basically everywhere:

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

You can read more about [Flow Declaration Files here](https://flow.org/en/docs/declarations/).
