---
id: local-schema
title: Local Schema
sidebar_label: Local Schema
---

Relay has a built-in support for local-only schema which allows you to work with GraphQL in-memory without sending requests to the server. First define local schema (`schema.local.graphql`):

```graphql
"""
Extend type: https://graphql.github.io/graphql-spec/draft/#sec-Object-Extensions
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

File `schema.local.graphql` must be somewhere in `--src` folder with the `*.graphql` extension. You should be good to go - just fetch the fields as usual. You have to commit local update to fill these fields and types:

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
      'successMessage', // client field name
    );
});
```

Please note that server may introduce the same field `successMessage` which will conflict with the client one (new kind of BC break). Luckily, Relay will recognize this BC break and it will throw an error:

```
ERROR:
Field "PNRInfo.successMessage" already exists in the schema. It cannot also be defined in this type extension.
```

Related resources:

- https://babangsund.com/relay_local_state_management_2/
- https://github.com/facebook/relay/pull/2821/files

Interesting helper from [@sibelius](https://github.com/sibelius):

```js
export const setLocal = (query: GraphQLTaggedNode, localData: object) => {
  const request = getRequest(query);
  const operation = createOperationDescriptor(request, {});

  env.commitPayload(operation, localData);
  env.retain(operation.root);
};
```

([source](https://github.com/facebook/relay/issues/1656#issuecomment-509220117))

## Client field via `@__clientField(handle: " ... ")`

Directive `@__clientField` is a special directive used by Relay client to create virtual (local) field. But, before we move on:

> This directive is not intended for use by developers directly. To set a field handle in product code use a compiler plugin ([source](https://github.com/facebook/relay/blob/8f08aaad9dae241ba6706b39160b89f4ed00c5c8/packages/graphql-compiler/core/GraphQLParser.js#L86-L91))

That's in fact exactly what `@connection` does behind the scenes - it translates itself into something like:

```text
@__clientField(handle: "connection", key: "UserFriends_friends", filters: ["orderby"])
```

Let's ignore this transform for now - it's possible to use it even directly with the warning in mind. It's possible to use it for the computation of our client field value from other server field:

```graphql
fragment Example on Article {
  body @__clientField(handle: "draft")

  # this is a client field and it will contain uppercased `body` value
  draft
}
```

This obviously means that you need to define your local client schema (`schema.local.graphql`):

```graphql
extend type Article {
  draft: String
}
```

And you have to create the handler which is being registered when you are creating new Relay environment (https://facebook.github.io/relay/docs/en/relay-environment.html#adding-a-handlerprovider):

```js
const DraftHandler = {
  update(store, payload) {
    const record = store.get(payload.dataID);
    const content = record.getValue(payload.fieldKey);
    record.setValue(content.toUpperCase(), 'draft');

    // Set the original value to handleKey, otherwise the field with @__clientField directive will be undefined
    record.setValue(content, payload.handleKey);
  },
};
```

Don't forget to run Relay compiler after you add these changes. More info: https://medium.com/@matt.krick/replacing-redux-with-relay-47ed085bfafe

How does the payload look like?

```js
/**
 * A payload that is used to initialize or update a "handle" field with
 * information from the server.
 */
export type HandleFieldPayload = {|
  // The arguments that were fetched.
  +args: Variables,
  // The __id of the record containing the source/handle field.
  +dataID: DataID,
  // The (storage) key at which the original server data was written.
  +fieldKey: string,
  // The name of the handle.
  +handle: string,
  // The (storage) key at which the handle's data should be written by the
  // handler.
  +handleKey: string,
|};

// args: {show: "ALL"}
// dataID: "TGVhZDpiOTZiZWMxMC0yYmVlLTExZWEtYTg5Yi04MWU2NGJlOGY5OTk="
// fieldKey: "labels(show:"ALL")"
// handle: "list"
// handleKey: "__list_test_key_list"
```

Another use-case is to affect behavior of your field (that's what `@connection` does). You can for example write some "sort" handler which will sort your arrays in the Relay store. Technically, this `@__clientField` annotations gives you separated space (`payload.handleKey`) in the Relay store so you can do whatever you want.

## `LocalQueryRenderer`

- https://github.com/mrtnzlml/relay/pull/447/files
