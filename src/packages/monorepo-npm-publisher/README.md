This package prepares our public NPM packages to be published. It can automatically find these packages, transpile them based on our Babel configuration, copy Flow versions of the files and automatically publish it to NPM (in CI). It publishes only packages with new version and it ignores old or current versions.

This publisher uses [@kiwicom/babel-preset-kiwicom](https://www.npmjs.com/package/@kiwicom/babel-preset-kiwicom) behind the scenes to transpile JS and Flow files.

Please note: changelogs are not responsibility of this package. You should write them manually for your users.

# Installation

```text
yarn add --dev @kiwicom/monorepo-npm-publisher
```

This package is intended to be run by CI server.

<!-- AUTOMATOR:HIRING_BANNER -->

> Do you like our open source? We are looking for skilled JavaScript developers to help us build it. Check our open positions: https://jobs.kiwi.com/

<!-- /AUTOMATOR:HIRING_BANNER -->

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
      'com.kiwi.YOUR_PROJECT.npm', // change please
      '.build',
    ),

    // Folder where to look for NPM packages. It takes into account
    // only packages with public visibility set in `package.json`.
    packages: path.join(__dirname, '..', 'packages'),

    npmAuthToken: 'TODO!', // see: https://www.npmjs.com/settings/<USERNAME>/tokens
  });
})();
```

This NPM publisher automatically takes `.npmignore` (or `.gitignore`) files into account. Read this info for more details: https://docs.npmjs.com/misc/developers#keeping-files-out-of-your-package
