Helpers for Relay compliant GraphQL server with FaunaDB backend

# Install

```text
yarn add @adeira/graphql-relay-fauna
```

# Basic usage

If your GraphQL type resolves from Fauna document, use `GlobalFaunaID` to automatically create `id` field with globally unique value. This is required for [Global Object Identification](https://relay.dev/docs/en/graphql-server-specification.html#object-identification) and `Node` interface.

```js
import GlobalFaunaID from '@adeira/graphql-relay-fauna';

export default new GraphQLObjectType({
  name: 'TypeName',
  fields: {
    id: GlobalFaunaID(),
  },
  interfaces: [GraphQLNodeInterface],
  isTypeOf: ({ ref }): boolean => ref.collection.id === 'TypeName',
});
```
