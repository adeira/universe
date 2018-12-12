# `generateTestsFromFixtures`

```js
import { generateTestsFromFixtures } from '@kiwicom/test-utils';

function operation(input) {
  return doSomethingWithTheInput(input);
}

generateTestsFromFixtures(`${__dirname}/__fixtures__`, operation);
```

# `evaluateGraphQLResolver`

```js
const fields = Location.getFields();
expect(
  evaluateGraphQLResolver(fields.countryFlagURL, {
    country: ' ... ', // test value
  }),
).toBe(' ... ');
```
