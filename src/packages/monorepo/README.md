This package contains many useful utilities to work with monorepo.

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

TODO

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
