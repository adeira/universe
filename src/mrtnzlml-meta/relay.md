- https://github.com/facebook/relay
- https://github.com/sibelius/relay-modern-network-deep-dive
- https://www.npmjs.com/package/@mrtnzlml/relay

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

Run Relay Compiler as usual (no special option required):

```
$ relay-compiler --src ./packages --schema ./packages/schema.graphql --verbose
```

File `schema.local.graphql` must be somewhere in `src` folder with the `*.graphql` extension. You should be good to go - just fetch the fields as usual. You have to commit local update to fill these fields and types:

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

Protip: create many local GraphQL extensions closely related to one specific part of your application. For example you could create `gdsv.local.graphql` with the following content:

```graphql
extend type PNRInfo {
  successMessage: String
}
```

This way I created `successMessage` client field on `PNRInfo` type and it should be more or less obvious that it's related only to this `GDSV` part. All local schemas are being auto-discovered thanks to `*.graphql` file extension. You can now fetch and render this success message somewhere in GDSV application. Propagation of this message is trivial (you have to fetch the `PNRInfo` ID):

```js
Relay.commitLocalUpdate(environment, store => {
  store
    .get(response.id) // unique opaque ID identifying PNRInfo record
    .setValue(
      'Request has been successfully sent.', // the actual message
      'successMessage' // client field name
    )
  }
);
```

Please note that client schema is still somehow experimental feature and that server may introduce the same field `successMessage` which will conflict with the client one (new kind of BC break). Luckily, Relay will recognize this BC break and it will throw an error:

```
ERROR:
Field "PNRInfo.successMessage" already exists in the schema. It cannot also be defined in this type extension.
```

## @__clientField(handle: " ... ")

> This directive is not intended for use by developers directly. To set a field handle in product code use a compiler plugin

([source](https://github.com/facebook/relay/blob/8f08aaad9dae241ba6706b39160b89f4ed00c5c8/packages/graphql-compiler/core/GraphQLParser.js#L86-L91))

Anyway, you can compute the client field value from other server field:

```graphql
fragment Example on Article {
  body

  # Relay is a bit broken now (see: https://github.com/facebook/relay/issues/2488)
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

- [ ] every deferred field must implement GraphQL `Node` interface (deferred records are going to be fetched later via `node` query)
- [ ] you must implement observable network layer

Node query:

```graphql
type RootQuery {
  node(id: ID!): Node
}

interface Node {
  id: ID!
}

# you have to use the Node interface somewhere
type Payment implements Node {
  id: ID!
  retailer: Retailer
  # ...
}
```

Observable network:

```js
const fetch = (requestNode, variables, cacheConfig, uploadables) => {
  return Observable.create(sink => {
    if (requestNode.kind === 'Request') {
      // TODO: normal query execution
    }

    if (requestNode.kind === 'BatchRequest') {
      // TODO: batch query execution
    }
  });
};

const network = Network.create(fetch);
```

# Uploadables

Sending normal GraphQL mutation is trivial:

```js
commitMutation(graphql`
  mutation TestMutation {
    test(input: "test")
  }
`);
```

It sends POST request with these headers:

```http
Accept: application/json
Content-type: application/json
User-Agent: Mozilla/5.0
 ...
```

And with this request payload:

```json
{"query":"mutation TestMutation {\n  test(input: \"test\")\n}\n","variables":{}}
```

We can use the same POST request to send our files as well. To do so, you have to use uploadables from Relay and `multipart/form-data` content type. Mutation is similar:

```js
commitMutation(
  graphql`
    mutation TestMutation {
      test(input: "test")
    }
  `,
  {
    uploadables: {
      file1: new File(["foo"], "foo.txt", {
        type: "text/plain"
      }),
      file2: new File(["bar"], "bar.txt", {
        type: "text/plain"
      })
    }
  }
);
```

With these headers:

```http
Accept: */*
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryshXxygBlT4ATOyhW
User-Agent: Mozilla/5.0
 ...
```

And with these form data:

```
------WebKitFormBoundaryshXxygBlT4ATOyhW
Content-Disposition: form-data; name="query"

mutation TestMutation {
  test(input: "test")
}

------WebKitFormBoundaryshXxygBlT4ATOyhW
Content-Disposition: form-data; name="variables"

{}
------WebKitFormBoundaryshXxygBlT4ATOyhW
Content-Disposition: form-data; name="file1"; filename="foo.txt"
Content-Type: text/plain

foo
------WebKitFormBoundaryshXxygBlT4ATOyhW
Content-Disposition: form-data; name="file2"; filename="bar.txt"
Content-Type: text/plain

bar
------WebKitFormBoundaryshXxygBlT4ATOyhW--
```

- https://github.com/facebook/relay/issues/1844#issuecomment-316893590

# Caching

TODO: simple result cache, AsyncStorage-like cache

# RelayNetworkLogger

```js
import RelayNetworkLogger from 'relay-runtime/lib/RelayNetworkLogger'

import fetchFunction from './fetchFunction'
import subscribeFunction from './subscribeFunction'

const fetch = __DEV__
    ? RelayNetworkLogger.wrapFetch(fetchFunction)
    : fetchFunction

const subscribe = __DEV__
    ? RelayNetworkLogger.wrapSubscribe(subscribeFunction)
    : subscribeFunction

const network = Network.create(fetch, subscribe)
const source = new RecordSource()
const store = new Store(source)

const env = new Environment({
  network,
  store
})

export default env
```
