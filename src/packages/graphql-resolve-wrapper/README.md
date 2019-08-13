This package allows you to do basically whatever you want with the resolvers.

<!-- AUTOMATOR:HIRING_BANNER -->



<!-- /AUTOMATOR:HIRING_BANNER -->

# Installation

```
yarn add @kiwicom/graphql-resolve-wrapper
```

# Usage

_Note: this function mutates the GraphQL schema (it replaces the `resolve` function)._

```js
const Schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});

wrapResolvers(Schema, resolveFn => async (...args) => {
  const value = await resolveFn(...args);
  return typeof value === 'string' ? value.toUpperCase() : value;
});

export default Schema;
```

This wrapper would uppercase every string in the response. There are of course more interesting and practical use-cases:

- error masking (wrap in `try/catch` and mask only server-side errors)
- timing (measure duration of every resolver)
- custom `resolve` function behavior

The simplest resolver wrapper is this (it just calls the resolver):

```js
function defaultWrapper(resolveFn) {
  return (...args) => resolveFn(...args);
}
```

## Query Timing (advanced example)

Query:

```graphql
query Test($search: String!) {
  allLocations(first: 10, search: $search) {
    edges {
      node {
        id
        name
      }
    }
  }
}
```

Wrapper:

```js
wrapResolvers(Schema, resolveFn => async (ancestor, args, context, info) => {
  const startAt = process.hrtime.bigint();
  const response = await resolveFn(ancestor, args, context, info);
  console.warn(process.hrtime.bigint() - startAt, JSON.stringify(info.path));
  return response;
});
```

Output:

```
567425567n '{"key":"allLocations"}'
301331n '{"prev":{"prev":{"prev":{"prev":{"key":"allLocations"},"key":"edges"},"key":0},"key":"node"},"key":"id"}'
250083n '{"prev":{"prev":{"prev":{"prev":{"key":"allLocations"},"key":"edges"},"key":0},"key":"node"},"key":"name"}'
237656n '{"prev":{"prev":{"prev":{"prev":{"key":"allLocations"},"key":"edges"},"key":1},"key":"node"},"key":"id"}'
262972n '{"prev":{"prev":{"prev":{"prev":{"key":"allLocations"},"key":"edges"},"key":1},"key":"node"},"key":"name"}'
280750n '{"prev":{"prev":{"prev":{"prev":{"key":"allLocations"},"key":"edges"},"key":2},"key":"node"},"key":"id"}'
305839n '{"prev":{"prev":{"prev":{"prev":{"key":"allLocations"},"key":"edges"},"key":2},"key":"node"},"key":"name"}'
325893n '{"prev":{"prev":{"prev":{"prev":{"key":"allLocations"},"key":"edges"},"key":3},"key":"node"},"key":"id"}'
351468n '{"prev":{"prev":{"prev":{"prev":{"key":"allLocations"},"key":"edges"},"key":3},"key":"node"},"key":"name"}'
```
