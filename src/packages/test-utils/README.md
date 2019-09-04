# `generateTestsFromFixtures`

This function loads all the fixtures (their file content) from your folder and it snapshots the result of your callback operation. This is handy when you have several example files, you want to perform some operation on top of them and snapshot the results.

```js
import { generateTestsFromFixtures } from '@kiwicom/test-utils';

function operation(input) {
  return doSomethingWithTheInput(input);
}

generateTestsFromFixtures(`${__dirname}/__fixtures__`, operation);
```

There are two additional modes which allow you to control the fixtures behavior more precisely. There are based on the fixture name:

- `simpleExample.graphql` - fixture will snapshot as expected
- `simpleExample.only.graphql` - only these snapshots will run (for debug only)
- `simpleExample.error.graphql` - it's expected that fixture will throw an error (expected to fail tests)

The error file convention is required to prevent unintentional snapshots of exceptions.

# `evaluateGraphQLResolver`

```js
const fields = Location.getFields();
expect(
  evaluateGraphQLResolver(fields.countryFlagURL, {
    country: ' ... ', // test value
  }),
).toBe(' ... ');
```
