This package prepares our public NPM packages to be published. It can automatically find these packages, transpile them based on our Babel configuration, copy Flow versions of the files and automatically publish it to NPM (in CI). It publishes only packages with new version and it ignores old or current versions.

This publisher uses [@kiwicom/babel-preset-kiwicom](https://www.npmjs.com/package/@kiwicom/babel-preset-kiwicom) behind the scenes to transpile JS and Flow files.

# Usage

You have to set `NPM_AUTH_TOKEN` environment variable first to be able to use this package.

```js
import path from 'path';
import publish from '@kiwicom/npm-publisher';

publish({
  // Where to store transpiled code before it's being published.
  buildCache: path.join(os.tmpdir(), 'PROJECT_ID', '.build'),

  // Folder where to look for NPM packages. These packages must be
  // public and version >=1.0.0.
  packages: '../packages',

  // Run in a "dry" mode (without publishing to NPM)?
  dryRun: true,
});
```

This package is intended to be run by CI server.
