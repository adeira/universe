This package contains many useful utilities to work with monorepo.

<!-- AUTOMATOR:HIRING_BANNER --><!-- /AUTOMATOR:HIRING_BANNER -->

# Installation

```
yarn add --dev @kiwicom/monorepo
```

# Usage

## `findRootPackageJson`, `findRootPackageJsonPath`

It finds the root `package.json` file in the monorepo (must contain Yarn Workspaces).

```js
const rootPackageJSON = findRootPackageJson();
```

It memoizes the result internally so when you call it for the second time you'll get the result instantly. Function `findRootPackageJson` returns the file content (object) but function `findRootPackageJsonPath` returns only the path.

## `iterateWorkspaces`, `iterateWorkspacesInPath` (deprecated)

This function iterates all the workspaces or workspaces only in one path respectively. Example:

```js
import { iterateWorkspaces } from '@kiwicom/monorepo';

iterateWorkspaces(packageJSONLocation => {
  test(packageJSONLocation, () => {
    // $FlowAllowDynamicImport
    const packageJson = require(packageJSONLocation);
    expect(packageJson.private).not.toBeUndefined();
  });
});
```

## `getWorkspacesSync`

```js
const packageJSONLocations = getWorkspacesSync();
console.warn(packageJSONLocations);
```

Returns locations of all `package.json` files in your monorepo:

```text
[ '/absolute/path/src/packages/js/package.json',
  '/absolute/path/src/packages/monorepo/package.json' ]
```

## `monorepo-run-tests`

This binary script is our tests executor for monorepo environments. It tries to find relevant changes to test based on Git history and Yarn Workspaces. It currently expects `.jest.config.js` in the project root. Usage (`package.json`):

```json
{
  "scripts": {
    "test": "monorepo-run-tests"
  }
}
```

And just run it as usual (`yarn run test`). You should see something like this:

```text
$ universe [master] yarn run test
yarn run v1.13.0
$ monorepo-run-tests
DIRTY WORKSPACES:  Set { '_components' }
PATHS TO TEST:  Set { 'src/components', 'src/apps', 'src/relay', 'src/translations' }
Running tests in timezone: UTC
 PASS  src/components/stylesheet/__tests__/PlatformStyleSheet-test.js
 PASS  src/translations/__tests__/Translation-test.js
 ...
 PASS  src/components/__tests__/Price-test.js (5.494s)

Test Suites: 10 passed, 10 total
Tests:       25 passed, 25 total
Snapshots:   20 passed, 20 total
Time:        6.582s, estimated 12s
Ran all test suites matching /src\/components|src\/apps|src\/relay|src\/translations|src\/components\/Icon.js/i.
✨  Done in 7.99s.
```

As you can see it detected some changes in `_components` workspace and it tries to resolve any other affected workspace (seems like for example `src/relay` is using `_components` workspace so it must be tested as well). It can happen that there are no changes to run.

## `Git.*` utility

TODO

## `ChildProcess`

TODO (expose it first)

## `monorepo-babel-node` binary

This binary allows you to run scripts just like with `babel-node` except it takes into account correct Babel configuration (`upward` mode by default) and it doesn't ignore our own Yarn Workspace dependencies while transpiling (`node_modules/@kiwicom/*`). Usage (`package.json`):

```json
{
  "scripts": {
    "test-bc": "monorepo-babel-node ./scripts/test-bc.js"
  }
}
```

Where `scripts/test-bc.js` is normal JS file with all the modern JS features.

There are currently two Node.js flags enabled: `--inspect` and `--inspect-brk`. Rest of the flags are forwarded to the executed script.
