This package prepares our public NPM packages to be published. It can automatically find these packages, transpile them based on our Babel configuration, copy Flow versions of the files and automatically publish it to NPM (in CI). It publishes only packages with new version and it ignores old or current versions.

# Usage

You have to set `NPM_AUTH_TOKEN` environment variable first to be able to use this package.

```
import path from 'path';
import publish from '@kiwicom/npm-publisher';

publish({
  buildCache: path.join(os.tmpdir(), 'PROJECT_ID', '.build'),
  packages: '../packages', // path to your NPM packages
  dryRun: true,
});
```

This package is intended to be run by CI server.
