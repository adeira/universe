---
id: testing
title: Testing, Linting, Flowing
sidebar_label: Test, Lint, Flow
---

We do not run tests, lints and Flow checks per project but on a whole monorepo instead. It's because there are very often relations among our workspaces and one small change in single workspace can affect the whole monorepo (and potentially break it). You can execute each test like this (from the root):

```text
yarn run test [--all]
yarn run lint [--all]
yarn run flow
```

Or all at once:

```text
yarn run test-ci
```

Don't worry about running these scripts on the whole monorepo. Each task tries to automatically figure out what to test (or lint) based on the latest changes.

## Custom test config per workspace

Script `yarn run test` prepares environment for every workspace with our default configuration. However, sometimes it's necessary to add additional configuration for the workspace. You can create file `jest.config.js` in every workspace for this purpose. Tests runner will load this configuration **and merge it** with our default one. Here are some example configurations:

<!--DOCUSAURUS_CODE_TABS-->
<!--GraphQL-->

```js
module.exports = {
  rootDir: __dirname,
  setupFiles: ['<rootDir>/scripts/jest/setupTestFiles.js'],
};
```

<!--React Native-->

```js
module.exports = {
  rootDir: __dirname,
  preset: 'react-native',
};
```

<!--END_DOCUSAURUS_CODE_TABS-->

It will overwrite default config so use it wisely.
