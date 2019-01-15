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

## `iterateWorkspaces`, `iterateWorkspacesInPath`

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

## `unstable_runTests`

TODO
