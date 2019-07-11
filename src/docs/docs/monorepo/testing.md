---
id: testing
title: Testing, Linting, Flowing, Formatting
sidebar_label: Test, Lint, Flow, Format
---

We do not run tests, lints and Flow checks per project but on a whole monorepo instead. It's because there are very often relations among our workspaces and one small change in single workspace can affect the whole monorepo (and potentially break it). You can execute each test like this (from the root):

```text
yarn run test-only [--all]
yarn run lint [--all]
yarn run flow
```

Or all at once:

```text
yarn run test
```

Don't worry about running these scripts on the whole monorepo. Each task tries to automatically figure out what to test (or lint) based on the latest changes. You can also scope the tests only to some specific subfolder or even single file when you are working on something:

```text
yarn test-only src/core/monorepo-shipit/config --watch
yarn test-only src/core/monorepo-shipit/config/__tests__/fetch.test.js --watch
```

## Formatting

We use opinionated formatter [Prettier](https://prettier.io/). It allows you to stop thinking about the formatting and focus on the actual problem. There rules are also enforced by Eslint so it's easier to follow them and be happy. Our lint can locally fix these stylistic issues, just run:

```text
yarn run lint
```

It fixes the errors locally, it throws errors on CI. Prettier is also supported in many editors so you can choose your favorite one and enable it even closer to your normal workflow: https://prettier.io/docs/en/editors.html

Please read the rationale to understand what is Prettier concerned about and what not: https://prettier.io/docs/en/rationale.html

## Custom test config per workspace

Script `yarn run test` prepares environment for every workspace with our default configuration. However, sometimes it's necessary to add additional configuration for the workspace. You can create file `jest.config.js` in every workspace for this purpose. Tests runner will load this configuration **and merge it** with our default one. Here are some example configurations:

<!--DOCUSAURUS_CODE_TABS-->
<!--GraphQL-->

```js
module.exports = {
  rootDir: __dirname,
  setupFiles: ['<rootDir>/scripts/jest/setupTestFiles.js'],
  globalTeardown: '<rootDir>/scripts/test-backward-compatibility.js', // runs after all the tests
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

It will overwrite default config so use it wisely. You can use async [global teardown](https://jestjs.io/docs/en/configuration#globalteardown-string) which will run after all tests (in case you touched the workspace). It's a good idea to skip it during watch mode:

```js
export default async function testBC(config: JestConfig) {
  if (config.watch || config.watchAll) {
    return;
  }
  // ...
}
```
