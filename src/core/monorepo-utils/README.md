This package contains many useful utilities to work with JavaScript monorepo.

This package is opinionated in many ways and it expects similar monorepo setup to how Universe works in Incubator tribe (see: https://gitlab.skypicker.com/incubator/universe 🔐). This monorepo is not just several projects next to each other. It shares common executors for Flow, Eslint and Tests. This means that individual projects do not have their own scripts for running these tools (can change in the future). It also relies on Yarn Workspaces.

<!-- AUTOMATOR:HIRING_BANNER -->

> Do you like our open source? We are looking for skilled JavaScript developers to help us build it. Check our open positions at https://jobs.kiwi.com/

<!-- /AUTOMATOR:HIRING_BANNER -->

# Installation

```
yarn add --dev @kiwicom/monorepo-utils
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
import { Workspaces } from '@kiwicom/monorepo-utils';

Workspaces.iterateWorkspaces(packageJSONLocation => {
  test(packageJSONLocation, () => {
    // $FlowAllowDynamicImport
    const packageJson = require(packageJSONLocation);
    expect(packageJson.private).not.toBeUndefined();
  });
});
```

There is also (a)synchronous version without callbacks:

```js
import { Workspaces } from '@kiwicom/monorepo-utils';

const packageJSONLocations = Workspaces.getWorkspacesSync(); // OR: getWorkspacesAsync

// [ '/absolute/path/src/packages/js/package.json',
//   '/absolute/path/src/packages/monorepo/package.json' ]
console.warn(packageJSONLocations);
```

### `getTouchedWorkspaces`

This function will give you all the workspaces that has been touched by your latest chages. Directly changed an also those workspaces who depend on the changed workspaces

```js
import { getTouchedWorkspaces } from '@kiwicom/monorepo-utils';

const workspaces = getTouchedWorkspaces();
console.log(Array.from(workspaces)); // -> ['@kiwicom/workspace1', '@kiwicom/workspace2']
```

## Working with changes (`Git`) _(unstable)_

TODO

## Glob

Glob is our wrapper around [Node.js glob library](https://github.com/isaacs/node-glob) which adds additional default configuration (ignores `node_modules` by default), correct Flow types and validation of invalid usages. The API is very similar to the original Glob:

```js
import { glob } from '@kiwicom/js';

glob('/**/*.js', { root: path.join(__dirname, 'fixtures') }, (error, filenames) => {
  // ...
});
```

Alternatively, you can use the sync variant:

```js
import { globSync } from '@kiwicom/js';

const filenames = globSync('/**/*.js', {
  root: path.join(__dirname, 'fixtures'),
});

// ...
```

Or async variant:

```js
import { globAsync } from '@kiwicom/js';

(async function() {
  const filenames = await globAsync('/**/*.js', {
    root: path.join(__dirname, 'fixtures'),
  });

  // ...
})();
```

These last two options, sync and async, will probably make the callback version obsolete.

Option `root` is required when your pattern starts from the root `/`. You don't have to worry about it too much - this glob will tell you when you use it wrong. Please note: **do not** use `path` to construct glob patterns!

## Working with shell commands (`ShellCommand`)

Shell command utility gives you the ability to work with shell while using friendly API and Flow types. Moreover it throws exceptions when the underlying child process fails for whatever reason so you can react easily. Basic usage:

```js
import { ShellCommand } from '@kiwicom/monorepo-utils';

new ShellCommand(
  null, // optional current working directory (defaults to `process.cwd`)
  'git',
  'status',
).runSynchronously();
```

You can optionally set additional command properties:

```js
new ShellCommand(null, 'git', 'am')
  .setOutputToScreen() // prints on screen instead of returning the value
  .setStdin('input value')
  .setNoExceptions() // hides all errors - potentially dangerous!
  .runSynchronously();
```

This command currently supports only synchronous execution and therefore it's recommended to use it only for simple scripts and tools (not for production traffic). Please note that many system commands technically support parallel execution but there can be some hidden limitations. For example Git uses single file `.git/index.lock` for locks and you may run into issues when executing some operations in parallel:

```text
Another git process seems to be running in this repository, e.g.
an editor opened by 'git commit'. Please make sure all processes
are terminated then try again.
```

## Binary `monorepo-run-tests`

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

This runner works especially well in GitLab CI. It supports additional testing of timezones when you run your test job in parallel (it tests UTC timezone only by default):

```yml
test:
  stage: test
  image: node:$NODEJS_VERSION
  parallel: 3
  script:
    - yarn run monorepo-run-tests
```

This way, tests runner will execute the same test-suite in `UTC`, `America/Lima` (-5) and `Asia/Tokyo` (+9) timezones. It's not unusual that some tests can fail only in one of these timezones.

It is also possible to enforce one specific timezone with `TZ` environment variable:

```text
TZ=Africa/Addis_Ababa monorepo-run-tests
```

## Binary `monorepo-babel-node`

**Do not use this in production!** ([more details](https://babeljs.io/docs/en/babel-node#not-meant-for-production-use))

This binary allows you to run scripts just like with `babel-node` except it takes into account correct Babel configuration (`upward` mode by default) and it doesn't ignore our own Yarn Workspace dependencies while transpiling (`node_modules/@kiwicom/*`). Usage (`package.json`):

```json
{
  "scripts": {
    "test-bc": "monorepo-babel-node ./scripts/test-bc.js"
  }
}
```

Where `scripts/test-bc.js` is normal JS file with all the modern JS features.

It takes into account all [allowed Node.js environment flags](https://nodejs.org/api/process.html#process_process_allowednodeenvironmentflags) which means you can for example debug your scripts with `--inspect` and `--inspect-brk`. Rest of the flags are forwarded to the executed script.
