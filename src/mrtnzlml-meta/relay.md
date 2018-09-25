- https://github.com/facebook/relay
- https://github.com/sibelius/relay-modern-network-deep-dive

# Local schema

First define local schema (`schema.local.graphql`):

```graphql
"""
Extend type: http://facebook.github.io/graphql/draft/#sec-Object-Extensions
"""
extend type Article {
  draft: String!
}

"""
Or add new query: https://github.com/facebook/relay/issues/1656#issuecomment-382461183
"""
extend type Query {
  errors: [Error!]
}

type Error {
  id: ID!
  message: String!
}
```

Compile with this additional schema (`schema.local.graphql` must be somewhere in `src` folder with the `*.graphql` extension):

```
$ relay-compiler --src ./packages --schema ./packages/schema.graphql --verbose
```

And you are good to go - you can fetch the fields as usual. You have to commit local update to fill these fields and types:

```js
Relay.commitLocalUpdate(environment, store => {
  const articleID = 'f9496862-4fb7-4a09-bc05-a9a3ce2cb7b3'; // ID of the `Article` type you want to update
  store.get(articleID).setValue('My custom draft text', 'draft');

  // or create new types:
  const root = store.getRoot();
  const errRecord = store.create('ID_1', 'Error');
  errRecord.setValue('ID_1', 'id');
  errRecord.setValue('My custom error message', 'message');
  root.setLinkedRecords([errRecord, ...], 'errors');
});
```

More info here: http://facebook.github.io/relay/docs/en/relay-store.html

## @__clientField(handle: " ... ")

Please note: **this directive is not intended for use by developers directly. To set a field handle in product code use a compiler plugin** (source: https://github.com/facebook/relay/blob/8f08aaad9dae241ba6706b39160b89f4ed00c5c8/packages/graphql-compiler/core/GraphQLParser.js#L86-L91)

Anyway, you can compute the client field value from other server field:

```graphql
fragment Example on Article {
  body

  # Relay is not a bit broken now (see: https://github.com/facebook/relay/issues/2488)
  _: body @__clientField(handle: "draft")

  # this is a client field and it will contain uppercased `body` value
  draft
}
```

And you have to create the handler (https://facebook.github.io/relay/docs/en/relay-environment.html#adding-a-handlerprovider):

```js
const DraftHandler = {
  update(store, payload) {
    const record = store.get(payload.dataID);
    const content = record.getValue(payload.fieldKey);
    record.setValue(content.toUpperCase(), 'draft');
  }
};
```

More info: https://medium.com/@matt.krick/replacing-redux-with-relay-47ed085bfafe

# Persisted queries

TODO

- https://github.com/facebook/relay/pull/2354 (awaiting)
- https://github.com/graphql/express-graphql/pull/109

# Deferrable queries

Prerequisities:

- [ ] every deferred field must implement GraphQL `Node` interface (they are going to be fetched later via `node` query)
- [ ] you must implement observable network layer

TODO

# Uploadables

TODO

- https://github.com/facebook/relay/issues/1844#issuecomment-316893590

# Caching

TODO: simple result cache, AsyncStorage-like cache
