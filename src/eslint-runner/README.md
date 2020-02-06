```
yarn add jest @adeira/eslint-runner --dev
```

This package contains special runner for Jest to speedup Eslint checks. It executes Eslint in parallel thanks to Jest workers so it's much faster when you have many files with complicated rules. You have to create special Jest config in order to use this runner (`.jest-eslint.config.js`):

```js
module.exports = {
  displayName: 'lint',
  runner: '@adeira/eslint-runner',
  testMatch: ['<rootDir>/src/**/*.js', '<rootDir>/scripts/**/*.js'],
};
```

It is of course possible to run this lint as yet another Jest project (using `options.projects` configuration). To execute this runner you have to call Jest like this:

```json
{
  "scripts": {
    "lint": "yarn jest --config=.jest-eslint.config.js"
  }
}
```

It tries to detect files to lint because it's highly inefficient to test all the files everytime. However, you can do so by using `--all` flag like so: `yarn run lint --all`.

Please note: this Eslint runner not only runs all the tests much faster but it also performs automatic fixes. This is currently no-opt.

You can also suppress warnings in report by `--no-warnings` option. Usage of this option is generally discouraged, although it may be handy in certain scenarios - consider migration strategy to adopt a new rule on the legacy project when you get hundreds of reports:

1. You set severity to `error` for given rule in `eslintrc` file.
1. In every legacy file where rule is broken, you lower the severity to `warn`, e.g. by adding `/* eslint flowtype/no-weak-types: "warn" */` comment to the top of file or in `eslintrc` for specific subdirectory where rule is too much broken.
1. As warnings are turned on by default, all contributors to the project can see ongoing issues in files changed by them so they can easily fix problems on that part of codebase, helping with migration and eventually reducing no. of issues to zero.
1. When all files are checked or there are too many changes, it might be difficult to locate an error in long report full of warnings. This is the special case when it's handy to rerun the check with `--no-warnings` option to locate the issue.
