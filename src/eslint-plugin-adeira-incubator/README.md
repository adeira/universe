Rules used at Kiwi.com in the Incubator tribe. You most probably do not need to use this package directly - use [@kiwicom/eslint-config](https://www.npmjs.com/package/@kiwicom/eslint-config) instead. This package exists basically only to workaround some Eslint limitations.

# Installation

You'll first need to install [ESLint](http://eslint.org). Next, install this plugin:

```
yarn add --dev eslint-plugin-kiwicom-incubator
```

# Usage

Add `kiwicom-incubator` to the plugins section of your `.eslintrc` configuration file:

```json
{
  "plugins": ["eslint-plugin-kiwicom-incubator"]
}
```

Then configure the rules you want to use under the rules section:

```json
{
  "rules": {
    "adeira-incubator/only-nullable-fields": "error",
    "adeira-incubator/no-invalid-flow-annotations": "error"
  }
}
```

# Rules

## `no-internal-flow-type`

Prefers `React.Node` over `React$Node` types.

## `no-invalid-flow-annotations`

This rule disallows `@noflow` and `@flow weak` annotations. Valid annotations are `@flow`, `@flow strict` and `@flow strict-local`

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
