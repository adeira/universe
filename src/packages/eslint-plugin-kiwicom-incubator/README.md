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
    "kiwicom-incubator/only-nullable-fields": "error",
    "kiwicom-incubator/no-invalid-flow-annotations": "error"
  }
}
```

# Rules

## `only-nullable-fields`

This rule aims to remove all uses of `GraphQLNonNull` on GraphQL type fields. Why? It's best practice to use nullable fields and not rely on returned value. This way every frontend implementation must handle the situation when API returns `null` because everything will break eventually.

Examples of **incorrect** code for this rule:

```js
arrival: {
  type: new GraphQLNonNull(GraphQLRouteStop),
  resolve: ({ arrival }: LegType): ArrivalType => arrival,
},
```

Examples of **correct** code for this rule:

```js
arrival: {
  type: GraphQLRouteStop,
  resolve: ({ arrival }: LegType): ArrivalType => arrival,
},
```

## `no-invalid-flow-annotations`

This rule disallows `@noflow` and `@flow weak` annotations.
