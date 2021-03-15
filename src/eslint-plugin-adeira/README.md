Rules in Adeira projects. You most probably do not need to use this package directly - use [@adeira/eslint-config](https://www.npmjs.com/package/@adeira/eslint-config) instead. This package exists basically only to workaround some Eslint limitations.

# Installation

You'll first need to install [ESLint](http://eslint.org). Next, install this plugin:

```
yarn add --dev eslint-plugin-adeira
```

# Usage

Add `adeira` to the plugins section of your `.eslintrc` configuration file:

```json
{
  "plugins": ["eslint-plugin-adeira"]
}
```

Then configure the rules you want to use under the rules section:

```json
{
  "rules": {
    "adeira/only-nullable-fields": "error",
    "adeira/no-invalid-flow-annotations": "error"
  }
}
```

# Rules

## `no-invalid-flow-annotations`

This rule disallows `@noflow` and `@flow weak` annotations. The only valid annotations are `@flow`, `@flow strict` and `@flow strict-local`.

## `flow-use-readonly-spread`

```flow js
type INode = {|
  +type: string,
  +range: [number, number],
  +parent: null | INode,
|};

// Error: Identifier must be $ReadOnly<…> to prevent accidental loss of readonly-ness
type Identifier = {|
  ...INode,
  +name: string,
|};
```

These types are not readonly anymore, see:

```flow js
const x: Identifier = { name: '', type: '', range: [1, 2], parent: null };

x.type = 'Should not be writable!';
x.name = 'Should not be writable!';
```

The `Identifier` type should be written like this:

```flow js
type Identifier = $ReadOnly<{|
  ...INode,
  +name: string,
|}>;
```

Try it: [flow.org/try](https://flow.org/try/#0C4TwDgpgBAkgcgewCbQLxQN4B8BQUoDUokAXFAM7ABOAlgHYDmANHoVQIaMRkDadArgFsARhCpMoAkWIC6LfATDsqEOsDICANpqhZYiFCywBfANw4cAektQAsv0pRRUACQAlCOyQB5OppAAhDjE0DAoajQAZjRiUOjunj5+IAA82KwAdFnwyBDyhHTsgtwU1PTMOCYAfOY4AMYIdI4AHmRhqsBRMVRxmIXFJABEgxIhQyNQHFwkPACMTABMclBKKmokWprGFs0ZIb0A5ADKABYI-JpIkgjATtAA7rTA7MKaEAEH5rv9aFDHZxcrnQbncoI8aM9Xu9PjggA)

## `only-nullable-fields`

This rule aims to remove all dangerous uses of `GraphQLNonNull` on GraphQL type fields. Why? It's a best practice to use nullable fields and not to rely on a returned value. This way every frontend implementation must handle the situation when API returns `null` because everything will break eventually. Non-nullable fields would in case of failure destroy the whole type and could bubble-up destroying the whole GraphQL response.

Examples of **incorrect** code for this rule:

```js
const field = {
  arrival: {
    type: new GraphQLNonNull(GraphQLRouteStop),
    resolve: ({ arrival }: LegType): ArrivalType => arrival,
  },
};
```

Examples of **correct** code for this rule:

```js
const field = {
  arrival: {
    type: GraphQLRouteStop,
    resolve: ({ arrival }: LegType): ArrivalType => arrival,
  },
};
```

Non-nullable fields are still allowed in these cases:

- inside of `GraphQLInputObjectType` (you want to restrict input values)
- in query or types arguments (`args` property)
- direct child of `GraphQLList`

## relay-import-no-values

This rule disallows value imports from `__generated__`. Typically you want to import only types from these files.

Examples of **incorrect** code:

```js
import { Kiwi } from './__generated__/Kiwi.graphql';
import Kiwi from './__generated__/Kiwi.graphql';
```

Examples of **correct** code:

```js
import type { Kiwi } from './__generated__/Kiwi.graphql';
import { type Kiwi } from './__generated__/Kiwi.graphql';
```

## relay-import-type-must-exist

This rule checks that the type is explicitly exported from the generated file.

Example of **incorrect** code:

```js
// given the file Kiwi_data.graphql.js doesn't export type Banana_data
import type { Banana_data } from './__generated__/Kiwi_data.graphql';
```

Example of **correct** code:

```js
// given the file Kiwi_data.graphql.js exports type Kiwi_data
import type { Kiwi_data } from './__generated__/Kiwi_data.graphql';
```

## valid-test-folder

This rule checks that your test files are in a folder called `__tests__`. This is also configurable to match your setup.
This rule works in two steps. First it will identify what is a test file through `isTestRegex` option. The default is `(?:spec|test).js$`. Then it will test that your test is in a valid folder through `isValidTestPathRegex`, the default is `__tests__`.

- When to use this rule. If you want to safeguard your self against putting test in an invalid path.
- When not to use this rule. If you don't care about where your tests are located.

Example of **incorrect** filename:

- `/src/__test__/my.test.js`
- `/src/__test__/my.spec.js`

Example of **correct** filename:

- `/src/__tests__/my.test.js`
- `/src/__tests__/my.spec.js`

Using `isTestRegex` setting

You can configure this rule to match your settings by passing `isTestRegex`;

- `[ERROR, {isTestRegex: '\.my_custom_test.jsx'}]` will match `/src/__tests__/my_feature.my_custom_test.jsx`

Using `isValidTestPathRegex` setting

You can configure this rule to match your settings by passing `isValidTestPathRegex`;

- `[ERROR, {isValidTestPathRegex: '__specs__'}]` will match `/src/__specs__/my_feature.test.js`

## no-duplicate-import-type-import

This rule reports error for duplicated import-type-import. It does not report duplicated import, since that is covered by `imports/no-duplicate`.

- When to use this rule: When you don't want imports like:

```js
import React from 'react';
import type { Node } from 'react';
```

- When not to use this rule. When you think the import as above is ok.

Example of **incorrect** imports:

```js
import React from 'react';
import type { Node } from 'react'; // Duplicate react
import { graphql, type Environment } from '@adeira/relay';
import type { RelayRefetchProps } from '@adeira/relay'; // duplicate adeira
```

Example of **correct** filename:

```js
import React, { type Node } from 'react';
import { graphql, type Environment, type RelayRefetchProps } from '@adeira/relay';
```

## graphql-require-object-description

This rule help to keep GraphQL server well documented when implementing server using [graphql-js](https://graphql.org/graphql-js/) programmatic API. It requires to specify a description for each instance of `GraphQLObjectType`.

Example of **incorrect** definition:

```js
const PersonType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    name: { type: GraphQLString },
  }),
});
```

Example of **correct** definition:

```js
const PersonType = new GraphQLObjectType({
  name: 'User',
  description: 'Info about currently authenticated user.',
  fields: () => ({
    name: { type: GraphQLString },
  }),
});
```
