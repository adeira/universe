```text
yarn add --dev @adeira/eslint-fixtures-tester
```

Usage:

```js
import path from 'path';
import testFixtures from '@adeira/eslint-fixtures-tester';

const fixturesPath = path.join(__dirname, 'fixtures', 'no-concatenated-classes');
const validFixturesPath = path.join(fixturesPath, 'valid');
const invalidFixturesPath = path.join(fixturesPath, 'invalid');

testFixtures({
  rule: require('../no-concatenated-classes'),
  validFixturesPath,
  invalidFixturesPath,
});
```

Where `no-concatenated-classes` folder has this structure:

```text
/src/rules/__tests__/fixtures/no-concatenated-classes
├── invalid
│   ├── basic.js
│   ├── complex-classname.js
│   └── custom-sx-names.js
└── valid
    ├── basic.js
    ├── simple-template-literal.js
    └── sx-multiple-arguments.js

2 directories, 6 files
```

Where each JS file is a valid or invalid real-life code example. Invalid fixtures must have the following header:

```js
/**
 * @eslintExpectedError Exact error message 1 here.
 * @eslintExpectedError Exact error message 2 here.
 */
```

You can optionally specify the error boundaries:

```js
/**
 * @eslintExpectedError (1:2;3:4) Exact error message 1 here.
 * @eslintExpectedError (1:2;3:4) Exact error message 2 here.
 */
```

The format is: `(line:column;endLine:endColumn)`
