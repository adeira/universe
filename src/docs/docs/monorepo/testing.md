---
id: testing
title: Testing, Linting, Flowing, Formatting
sidebar_label: Test, Lint, Flow, Format
---

We do not run tests, lints and Flow checks per project but on a whole monorepo instead. It's because there are very often relations among our workspaces and one small change in single workspace can affect the whole monorepo (and potentially break it). You can execute each test like this (from the root):

```text
yarn run test-only [--all]
yarn run lint [--all]
yarn run typecheck
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

## Local testing vs. CI tests

Tests you run locally and tests on our CI server are slightly different. The biggest difference (apart from completely different machine) is that we run more complete test-suite on our CI server. It's because 1) our CI server is much more powerful with better parallelization compare to your machine 2) some tests are from our experience failing very rarely. There are two notable differences:

- We sometimes run additional tests on builded server which is ready to be deployed to production. Just to be sure we are not going to deploy completely broken code. For example: GraphQL containers are being pinged with some critical queries.
- We run all the tests you run locally also in different timezones (`Asia/Tokyo` and `America/Lima`). This means that we run 3x more tests on CI. Failure in these tests is quite rare but we already caught some nasty bugs thanks to this.

We basically traded good DX experience for rare failure on our CI server. This should speedup your local development in case of everything going well (and you still get a notification when things are broken because of timezones for example).

You can change the timezone via `TZ` environment variable to whatever value you want:

```text
yarn run test-only                      // this runs in UTC timezone, same as:
TZ=UTC yarn run test-only
TZ=America/Lima yarn run test-only
```

## Running tests using IDE (Web/PhpStorm)

It is quite easy to setup running all tests in IDE by using NPM/Yarn scripts. However, it is useful for us (developers) to run the test suit we are working on right now. Possibly directly from the IDE using its native possibilities. See the green "buttons" on the left:

![Web/PhpStorm test file](assets/storm-tests.png)

Running tests using these "buttons" creates a "Run configuration" in the IDE that is based on the Jest Template. It might work for some simple tests (e.g. uni test for a one function module which does not depend on anything). However, running more complicated test cases (e.g. end-to-end GraphQL query tests) requires configuration.

The default behavior is to use root directory where the closest `jest.config.js` file is located. Using the file as configuration for Jest. To make sure everything works correctly using the monorepo we need to use repository root configuration.

Updating Jest template for the project will allow you to use "buttons" mentioned above without the need to configure each Jest run configuration over and over again.

![Web/PhpStorm Jest template configuration](assets/storm-jest-template.png)
