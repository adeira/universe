This package contains many useful utilities to work with JavaScript monorepo.

This package is opinionated in many ways and it expects similar monorepo setup to Universe. This monorepo is not just several projects next to each other. It shares common executors for Flow, Eslint and Tests. This means that individual projects do not have their own scripts for running these tools (can change in the future). It also relies on Yarn Workspaces and git.

# Installation

```
yarn add --dev @adeira/monorepo-utils
```

# Usage

## `findRootPackageJson`, `findRootPackageJsonPath`

It finds the root `package.json` file in the monorepo (must contain Yarn Workspaces). It is useful if you need to know where is the root or you need to access root `package.json` because of workspaces definition for example.

```js
const rootPackageJSON = findRootPackageJson();
```

It memoizes the result internally so when you call it for the second time you'll get the result instantly. Function `findRootPackageJson` returns the file content (object) but function `findRootPackageJsonPath` returns only the path.

## Working with `Workspaces`

`Workspaces` utility allows you to access information about workspaces anywhere in the monorepo. You can for example iterate all workspaces:

```js
import { Workspaces } from '@adeira/monorepo-utils';

Workspaces.iterateWorkspaces((packageJSONLocation) => {
  test(packageJSONLocation, () => {
    const packageJson = require(packageJSONLocation);
    expect(packageJson.private).not.toBeUndefined();
  });
});
```

There is also (a)synchronous version without callbacks:

```js
import { Workspaces } from '@adeira/monorepo-utils';

const packageJSONLocations = Workspaces.getWorkspacesSync(); // OR: getWorkspacesAsync

// [ '/absolute/path/src/packages/js/package.json',
//   '/absolute/path/src/packages/monorepo/package.json' ]
console.warn(packageJSONLocations);
```

## Working with changes (`Git`)

```js
import { Git } from '@adeira/monorepo-utils';

// All files with committed changes on current branch in comparison to origin/master
Git.getChangedFiles();

// Files with changes staged for the next commit (via "git add")
// Example usage: custom pre-commit hook
Git.getStagedChangedFiles();

// BOTH changed files staged for commit and not staged files changed since last commit
Git.getWorktreeChangedFiles();

// All changed or not tracked files OR changes in last commit if current branch is origin/master
// Example usage: CI script to validate changed files
Git.getChangesToTest();

// and more ...
```

**Read carefully!** We assume that default branch is `origin/master` as it's common convention in Git. This is important to know because it may behave unpredictably, e.g. when you call `Git.getChangesToTest()` and your default branch is _not_ master and/or your remote repository is not named `origin`. This is currently not configurable.

### `getChangedFiles`

Besides usual methods on `Git`, there is also utility function `getChangedFiles`. How does that differ from `Git.getChangedFiles`? `getChangedFiles` fails if CI environment is detected and there are any uncommitted changes. So in most cases you should rather prefer this to fail CI pipeline when some files are accidentally touched or created.

## Glob

Glob is our wrapper around [Node.js glob library](https://github.com/isaacs/node-glob) which adds additional default configuration (ignores `node_modules` by default), correct Flow types and validation of invalid usages. The API is very similar to the original Glob:

```js
import { globSync } from '@adeira/monorepo-utils';

const filenames = globSync('/**/*.js', {
  root: path.join(__dirname, 'fixtures'),
});

// ...
```

Alternatively, you can use the async variant:

```js
import { globAsync } from '@adeira/monorepo-utils';

(async function () {
  const filenames = await globAsync('/**/*.js', {
    root: path.join(__dirname, 'fixtures'),
  });

  // ...
})();
```

Option `root` is required when your pattern starts from the root `/`. You don't have to worry about it too much - this glob will tell you when you use it wrong. Please note: **do not** use `path` to construct glob patterns!

## Binary `monorepo-babel-node`

**Do not use this in production!** ([more details](https://babeljs.io/docs/en/babel-node#not-meant-for-production-use))

This binary allows you to run scripts just like with `babel-node` except it takes into account correct Babel configuration (`upward` mode by default) and it doesn't ignore our own Yarn Workspace dependencies while transpiling (`node_modules/@adeira/*`). Usage (`package.json`):

```json
{
  "scripts": {
    "test-bc": "monorepo-babel-node ./scripts/test-bc.js"
  }
}
```

Where `scripts/test-bc.js` is normal JS file with all the modern JS features.

It takes into account all [allowed Node.js environment flags](https://nodejs.org/api/process.html#process_process_allowednodeenvironmentflags) which means you can for example debug your scripts with `--inspect` and `--inspect-brk`. Rest of the flags are forwarded to the executed script.
