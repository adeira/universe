Install (via Yarn or NPM):

```text
yarn add @adeira/fixtures-tester
```

## `generateTestsFromFixtures`

This function loads all the fixture files (their file content) from your folder and snapshots the result of your callback operation. This is handy when you have several example files, you want to perform some operation on top of them and snapshot the results.

```js
import { generateTestsFromFixtures } from '@adeira/fixtures-tester';

generateTestsFromFixtures(
  `${__dirname}/__fixtures__`,
  (input: string): string => {
    return doSomethingWithTheInput(input); // this result will be saved in a Jest snapshot
  },
  // optionally a snapshot name
);
```

There are two additional modes which allow you to control the fixtures behavior more precisely. There are based on the fixture name:

- `simpleExample.graphql` - fixture will snapshot as expected
- `simpleExample.only.graphql` - only these snapshots will run (for debug only)
- `simpleExample.error.graphql` - it's expected that fixture will throw an error (expected to fail tests)

The error file convention is required to prevent unintentional snapshots of exceptions.

## `verifyTestsFromFixtures`

This function simply verifies that the callback returns `true` but it doesn't snapshot anything:

```js
import { verifyTestsFromFixtures } from '@adeira/fixtures-tester';

verifyTestsFromFixtures(`${__dirname}/__fixtures__`, (input: string): boolean => {
  return isInputValid(input) === true;
});
```

This is handy when the snapshot from `generateTestsFromFixtures` would be meaningless but you still want to check all available fixtures.
