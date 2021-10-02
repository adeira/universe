---
id: directives
title: Relay directives
sidebar_label: Relay directives
---

Relay supports many (mostly) client-only directives which help you to describe your clients needs and behavior better. They usually abstract some low-level implementation so you can easily stop using them when needed. Here is a complete list of them:

## @arguments, @argumentDefinitions

Relay docs: https://relay.dev/docs/en/graphql-in-relay.html#arguments

`@arguments` is a directive used to pass arguments to a fragment that was defined using `@argumentDefinitions`. For example:

```graphql
query TodoListQuery($userID: ID) {
  ...TodoList_list @arguments(count: $count, userID: \$userID) # Pass arguments here
}
```

`@argumentDefinitions` is a directive used to specify arguments taken by a fragment. For example:

```graphql
fragment TodoList_list on TodoList
@argumentDefinitions(
  count: { type: "Int", defaultValue: 10 } # Optional argument
  userID: { type: "ID" } # Required argument
) {
  title
  todoItems(userID: $userID, first: $count) {
    # Use fragment arguments here as variables
    ...TodoItem_item
  }
}
```

Note: directive `argumentDefinitions` might be deprecated soon in favor of the following syntax:

```graphql
fragment Foo($localId: ID!) on User {
  id
}
```

This syntax is still experimental and behind feature flags in both graphql-js and Relay. References:

- https://github.com/graphql/graphql-spec/issues/204
- https://github.com/facebook/relay/commit/5c0c466769980c0a3ce76c495522b009d607cf62
- https://github.com/graphql/graphql-js/commit/ce0a4b9c76423edaddc2d9c65661189d0dba77cd

## @connection, @stream_connection

Relay docs: https://relay.dev/docs/en/graphql-in-relay.html#connectionkey-string-filters-string

```graphql
directive @connection(
  key: String!
  filters: [String]
  handler: String
  dynamicKey_UNSTABLE: String
) on FIELD

directive @stream_connection(
  key: String!
  filters: [String]
  handler: String
  label: String!
  initial_count: Int!
  if: Boolean = true
  dynamicKey_UNSTABLE: String
) on FIELD
```

`@connection` effectively creates a client/local field in the graphql schema to store the merged results of the initial fetch plus pagination queries to load more edges - on the assumption that you're doing infinite scroll style. It is also possible to change the internal implementation via custom handler `@connection(handler: "...")`. It's complicated but doable.

This is how [default connection handler looks like](https://github.com/facebook/relay/blob/fcb2fd951e54fc4541d3bf0514e7c3662ddcf218/packages/relay-runtime/handlers/connection/ConnectionHandler.js).

> `@connection(key: "list_users", filters: [])` means: store the data regardless of the value of `search` -- this could cause a potential problem if there are two components/views sharing the same connection and when the second view fetches the connection with `search: "foo"`, it will overwrite the data fetched with `search: bar` in the first view.

See also:

- https://github.com/facebook/relay/issues/2570#issuecomment-438026375
- https://github.com/facebook/relay/issues/1808#issuecomment-304519883

### `dynamicKey_UNSTABLE`

> Implements support for dynamic connection keys. Relay currently supports the `key` argument to namespace the results of a connection field - but because this value is static, if multiple instances of the same component (and therefore fragment) are subscribed, they will share the underlying connection state in the store. There are some use-cases where applications would prefer to have data namespaced on a per-instance basis. We plan to investigate this in a follow-up, but as short-term solution this diff implements support for dynamic connection keys. In addition to the still-required static key, a fragment may specify `dynamicKey_UNSTABLE: $someVariable` (must be a variable) whose runtime value is used to compute the storage key (in addition to the filters and static key). This is behind a feature flag as we intend to investigate alternatives in the near-term.

See: https://github.com/facebook/relay/commit/3ea3ac7d4f64f9260c69f49316a92cdc78dd4827

## @deleteRecord

See: https://github.com/facebook/relay/commit/07ccab7cc637f51f2f15fc75ed824d1de8ede72f (available from Relay version 10.0.0)

```graphql
directive @deleteRecord on FIELD
```

The fields must be type of `ID` or list of `ID` values!

TKTK

Example:

```graphql
mutation CommentDeleteMutation(
  $inputSingular: CommentDeleteInput
  $inputPlural: CommentsDeleteInput
) {
  commentDelete(input: $inputSingular) {
    deletedCommentId @deleteRecord # translates to @__clientField(handle:"deleteRecord")
  }

  # Or alternativelly, you can use plural version for multiple IDs:
  commentsDelete(input: $inputPlural) {
    deletedCommentIds @deleteRecord # also translates to @__clientField(handle:"deleteRecord")
  }
}
```

## @deleteEdge

Released in version 10.1.0, see: https://github.com/facebook/relay/releases/tag/v10.1.0

As the name hints at, this particular directive allows you to remove a node's edge from the provided connections. Please note that this directive does not _delete the node_, only edge(s) for the node. There's `deleteRecord` already for deleting a record, which can be combined with this directive.

It's intended to be used like this:

```graphql
mutation DeleteComment($input: DeleteCommentInput!, $connections: [String!]!) {
  deleteComment(input: $input) {
    deletedCommentId @deleteEdge(connections: $connections)
    # This will delete any edge for the node with id `deletedCommentId` from the
    # connections provided through `$connections`
  }
}
```

It works for single IDs (as demonstrated above) as well as a list of IDs.

See: https://github.com/facebook/relay/commit/01d65b3cbeb8098025546627b76855d6c5c7112a

## @appendEdge, @prependEdge, @appendNode, @prependNode

Released in version 10.1.0, see: https://github.com/facebook/relay/releases/tag/v10.1.0

```graphql
directive @appendEdge(connections: [String!]!) on FIELD
directive @prependEdge(connections: [String!]!) on FIELD
directive @appendNode(connections: [String!]!, edgeTypeName: String!) on FIELD
directive @prependNode(connections: [String!]!, edgeTypeName: String!) on FIELD
```

These new directives will help you to update the store declaratively. You can used them to append/prepend connection edges OR create and edge and append/prepend them (in case of `*Node` directives). See:

- https://github.com/facebook/relay/commit/271932432b2846db5dac2effcf7ab756c56e8a65
- https://github.com/facebook/relay/commit/0fe732dabc16087c64413ec717340f18ba95bc14

Example:

```graphql
mutation CommentCreateMutation($connections: [String!]!, $input: CommentCreateInput) {
  commentCreate(input: $input) {
    feedbackCommentEdge @appendEdge(connections: $connections) {
      cursor
      node {
        id
      }
    }
  }
}
```

Directive `@appendEdge` translates to `@__clientField(handle: "appendEdge", handleArgs: (connections: $connections))` (similarly for `prependEdge`). See the related mutation handlers: https://github.com/facebook/relay/commit/687d89b4b8c8224bd724b28207dce357102ad307

## @required

`@required` is a directive you can add to fields in your Relay queries to declare how null values should be handled at runtime. You can think of it as saying "if this field is ever null, its parent field is invalid and should be null".

When you have a GraphQL schema where many fields are nullable, a considerable amount of product code is needed to handle each field's potential "nullness" before the underlying data can be used. With `@required`, Relay can handle some types of null checks before it returns data to your component, which means that **any field you annotate with** **`@required`** **will become non-nullable in the generated types for your response**.

If a `@required` field is null at runtime, Relay will "bubble" that nullness up to the field's parent. For example, given this query:

```graphql
query MyQuery {
  viewer {
    name @required(action: LOG)
    age
  }
}
```

If `name` is null, relay would return `{ viewer: null }`. You can think of `@required` in this instance as saying "`viewer` is useless without a `name`".

Note: nested `@required` directives must have compatible severities. For example, the following fragment is invalid:

```graphql
fragment Foo on User {
  address @required(action: THROW) {
    city @required(action: LOG)
  }
}

# The @required field [1] may not have an \`action\` less severe than that of its @required parent [2]. [1] should probably be \`action: THROW\`.
```

Note: there is a `requiredFieldLogger` environment config, see: https://github.com/facebook/relay/commit/0869fde6b08d7c199b0ceb0cb32091e35acee680

Directive definition:

```graphql
enum RequiredFieldAction {
  NONE # severity: 0
  LOG # severity: 1
  THROW # severity: 2
}

directive @required(action: RequiredFieldAction!) on FIELD
```

See: https://github.com/facebook/relay/commit/9926676c72667e83abe661ef0df52234eda51542

## @defer, @stream, @stream_connection

Please note: this directive is still experimental!

```graphql
directive @defer(label: String!, if: Boolean = true) on FRAGMENT_SPREAD | INLINE_FRAGMENT

directive @stream(label: String!, initial_count: Int!, if: Boolean = true) on FIELD
```

The `@defer` directive may be provided for fragment spreads and inline fragments to inform the executor to delay the execution of the current fragment to indicate deprioritization of the current fragment. A query with `@defer` directive will cause the request to potentially return multiple responses, where non-deferred data is delivered in the initial response and data deferred is delivered in a subsequent response. `@include` and `@skip` take precedence over `@defer`.

```graphql
query myQuery($shouldDefer: Boolean) {
   user {
     name
     ...someFragment @defer(label: 'someLabel', if: $shouldDefer)
   }
}
fragment someFragment on User {
  id
  profile_picture {
    uri
  }
}
```

The `@stream` directive may be provided for a field of `List` type so that the backend can leverage technology such as asynchronous iterators to provide a partial list in the initial response, and additional list items in subsequent responses. `@include` and `@skip` take presedence over `@stream`.

```graphql example
query myQuery {
  user {
    friends(first: 10) {
      nodes @stream(label: "friendsStream", initialCount: 5)
    }
  }
}
```

> A bit more context: as implied from the talk, at Facebook we are currently experimenting with support for `@defer` and `@stream` directives in our GraphQL server and in Relay. Our plan is to get experience using these directives in our apps in order to validate the concept, iterating as appropriate. We're still early in this process and are not yet ready to begin any effort toward standardization, but we will certainly consider this as we get more experience and feel more confident in the approach.

(https://github.com/graphql/graphql-spec/issues/269#issuecomment-528970726)

- https://github.com/graphql/graphql-spec/blob/master/rfcs/DeferStream.md
- https://github.com/mrtnzlml/relay/pull/172/commits
- https://github.com/facebook/relay/commit/225cfb60cccdbb649ab16a13ed607de749992d21
- https://github.com/graphql/graphql-spec/pull/742/files

## @inline

Directive definition:

```graphql
directive @inline on FRAGMENT_DEFINITION
```

The hooks APIs that Relay exposes allow you to read data from the store only during the render phase. In order to read data from outside of the render phase (or from outside of React), Relay exposes the `@inline` directive. The data from a fragment annotated with `@inline` can be read using `readInlineData`.

Relay docs: https://relay.dev/docs/api-reference/graphql-and-directives/#inline

## @match, @module

Directive definition:

```graphql
directive @match on FIELD

directive @module(name: String!) on FRAGMENT_SPREAD
```

A directive that, when used in combination with `@module`, allows users to download specific JS components alongside the rest of the GraphQL payload if the field decorated with [`@match`](https://relay.dev/docs/glossary/#match) has a certain type. See [3D](https://relay.dev/docs/glossary/#3d).

See also: [relay/match-module.md](/relay/match-module.md)

Relay docs: https://relay.dev/docs/glossary/#match

## @raw_response_type

This annotation can be used to generate types (Flow/TS) for `optimisticResponse` when writing mutations. Real example could look like this:

```graphql
mutation NoteEditorChangeLeadNoteMutation($input: UpdateLeadInput!) @raw_response_type {
  updateLead(input: $input) {
    __typename
    ... on Lead {
      ...NoteEditor_lead
    }
  }
}
```

This is quite a common pattern to write data fragment only once when fetching the data (`NoteEditor_lead`) and reuse it for the mutation. It's because you should always fetch the same you are mutating (and you are probably mutating the same you are just rendering). However, the generated types whould contain just the fragment reference as you know from the queries and it's not a good idea to unmask such fragments since it doesn't work recursively. Luckily, mutations with additional directive `@raw_response_type` generate also raw response types. Compare these two generated types - first without the annotation:

```ts
export type UpdateLeadInput = {
  readonly id: string;
  readonly note?: string | null;
  readonly title?: string | null;
};
export type NoteEditorChangeLeadNoteMutationVariables = {
  input: UpdateLeadInput;
};
export type NoteEditorChangeLeadNoteMutationResponse = {
  readonly updateLead:
    | (
        | {
            readonly __typename: 'Lead';
            readonly ' $fragmentRefs': FragmentRefs<'NoteEditor_lead'>;
          }
        | {
            /*This will never be '%other', but we need some
            value in case none of the concrete values match.*/
            readonly __typename: '%other';
          }
      )
    | null;
};
export type NoteEditorChangeLeadNoteMutation = {
  readonly response: NoteEditorChangeLeadNoteMutationResponse;
  readonly variables: NoteEditorChangeLeadNoteMutationVariables;
};
```

And now with the `@raw_response_type` directive:

```ts {24-38,42}
export type UpdateLeadInput = {
  readonly id: string;
  readonly note?: string | null;
  readonly title?: string | null;
};
export type NoteEditorChangeLeadNoteMutationVariables = {
  input: UpdateLeadInput;
};
export type NoteEditorChangeLeadNoteMutationResponse = {
  readonly updateLead:
    | (
        | {
            readonly __typename: 'Lead';
            readonly ' $fragmentRefs': FragmentRefs<'NoteEditor_lead'>;
          }
        | {
            /*This will never be '%other', but we need some
            value in case none of the concrete values match.*/
            readonly __typename: '%other';
          }
      )
    | null;
};
export type NoteEditorChangeLeadNoteMutationRawResponse = {
  readonly updateLead:
    | (
        | {
            readonly __typename: 'Lead';
            readonly id: string | null;
            readonly note: string | null;
          }
        | {
            readonly __typename: string;
            readonly id: string | null;
          }
      )
    | null;
};
export type NoteEditorChangeLeadNoteMutation = {
  readonly response: NoteEditorChangeLeadNoteMutationResponse;
  readonly variables: NoteEditorChangeLeadNoteMutationVariables;
  readonly rawResponse: NoteEditorChangeLeadNoteMutationRawResponse;
};
```

That's the type which is being used to annotate `optimisticResponse` when you use `commitMutation<MutationType>`.

See: https://github.com/facebook/relay/commit/d23455a2ae9d24416d0ab0b0c2366b28fd44975e

## @refetchable(queryName: " … "), @fetchable(field_name: " … ")

Directive definition:

```graphql
directive @fetchable(field_name: String!) on OBJECT
directive @refetchable(queryName: String!) on FRAGMENT_DEFINITION
```

For use with [`useRefetchableFragment`](https://relay.dev/docs/api-reference/use-refetchable-fragment/). The `@refetchable` directive can only be added to fragments that are "refetchable", that is, on fragments that are declared on Viewer or Query types, or on a type that implements `Node` (i.e. a type that has an id).

Relay docs: https://relay.dev/docs/api-reference/use-refetchable-fragment/#arguments

Example:

```js
export default createRefetchContainer(LocationsPaginatedRefetch, {
  data: graphql`
    fragment LocationsPaginatedRefetch_data on RootQuery
    @argumentDefinitions(count: { type: "Int", defaultValue: 20 }, after: { type: "String" })
    @refetchable(queryName: "LocationsPaginatedRefetchRefetchQuery") {
      incrementalPagination: allLocations(first: $count, after: $after)
        @connection(key: "allLocations_incrementalPagination") {
        edges {
          node {
            id
            ...Location_location
          }
        }
        pageInfo {
          endCursor
        }
      }
    }
  `,
});
```

> For OSS: the `@fetchable` directive is for the schema SDL, not queries, and allows the schema to specify that a) a type is (re)fetchable and b) what field should be used to refetch it. For each `@fetchable` type `Foo`, the schema is expected to define a field on the `Query` type that follows the convention of `fetch__Foo(<name>: ID!): Foo`. This is a generalization of the pattern established with the Node interface and node() root field.

https://github.com/facebook/relay/commit/6ed719438829d02912c862407bbf84a6374f14f3#commitcomment-38371100

## @relay

Directive definition:

```graphql
directive @relay(
  # Marks a fragment as being backed by a GraphQLList.
  plural: Boolean

  # Marks a fragment spread which should be unmasked if provided false
  mask: Boolean = true
) on FRAGMENT_DEFINITION | FRAGMENT_SPREAD
```

A directive that allows you to turn off Relay's data masking.

> The use-case is things like utility functions that are not executing in a React context and therefore don't have access to the context's environment. `@relay(mask:false)` was our earlier solution to this (which as you noted has some issues), `@inline` is its replacement.

https://github.com/relay-tools/relay-compiler-language-typescript/issues/64#issuecomment-564580765

## @relay_client_component

TKTK

```graphql
directive @relay_client_component on FRAGMENT_SPREAD
```

https://github.com/facebook/relay/commit/bf16266c24af3c6753c349d61c601a9c92e4a893

## @relay_test_operation

Relay docs: https://relay.dev/docs/en/testing-relay-components#relay_test_operation

```graphql
directive @relay_test_operation on QUERY | MUTATION | SUBSCRIPTION
```

TKTK

Please note: Relay doesn't have any type information about scalar fields in the _normalization ASTs_ (whether the filed is plural, nullable, Integer or Float, etc). In these cases cases, Relay Payload Generator defaults to String (see: https://github.com/facebook/relay/issues/2807#issuecomment-515690739). This can be solved by using `@relay_test_operation` in your tests.

Generated test payload _WITHOUT_ `@relay_test_operation` directive:

```json
{
  "data": {
    "node": {
      "__typename": "Lead",
      "id": "<mock-id-1>",
      "lead_id": "<Lead-mock-id-2>",
      "wasSeen": "<mock-value-for-field-\"wasSeen\">",
      "note": "<mock-value-for-field-\"note\">",
      "labels": [
        {
          "legacyID": "<Label-mock-id-3>",
          "name": "<mock-value-for-field-\"name\">",
          "id": "<Label-mock-id-4>"
        }
      ],
      "organization": {
        "__typename": "Organization",
        "id": "<Organization-mock-id-5>"
      },
      "person": {
        "__typename": "Person",
        "id": "<Person-mock-id-6>"
      },
      "isArchived": "<mock-value-for-field-\"isArchived\">"
    }
  }
}
```

Generated test payload _WITH_ `@relay_test_operation` directive (notice the highlighted changes):

```json {5,7,24}
{
  "data": {
    "node": {
      "__typename": "Lead",
      "id": "<Node-mock-id-1>", // additional `Node` type-
      "lead_id": "<Lead-mock-id-2>",
      "wasSeen": false,
      "note": "<mock-value-for-field-\"note\">",
      "labels": [
        {
          "legacyID": "<Label-mock-id-3>",
          "name": "<mock-value-for-field-\"name\">",
          "id": "<Label-mock-id-4>"
        }
      ],
      "organization": {
        "__typename": "Organization",
        "id": "<Organization-mock-id-5>"
      },
      "person": {
        "__typename": "Person",
        "id": "<Person-mock-id-6>"
      },
      "isArchived": false
    }
  }
}
```

## @skip, @include

GraphQL specs: https://graphql.github.io/graphql-spec/June2018/#sec-Type-System.Directives

```graphql
directive @skip(if: Boolean!) on FIELD | FRAGMENT_SPREAD | INLINE_FRAGMENT

directive @include(if: Boolean!) on FIELD | FRAGMENT_SPREAD | INLINE_FRAGMENT
```

The `@skip` directive may be provided for fields, fragment spreads, and inline fragments, and allows for conditional exclusion during execution as described by the if argument.

The `@include` directive may be provided for fields, fragment spreads, and inline fragments, and allows for conditional inclusion during execution as described by the if argument.

Note: neither `@skip` nor `@include` has precedence over the other. In the case that both the `@skip` and `@include` directives are provided on the same field or fragment, it _must_ be queried only if the `@skip` condition is false and the `@include` condition is true. Stated conversely, the field or fragment _must not_ be queried if either the `@skip` condition is true or the `@include` condition is false.

## Other internal directives

Please, read this carefully!

**You should not use there directives unless you know exactly what you are doing and you are ready to face the consequences!**

### @DEPRECATED\_\_relay_ignore_unused_variables_error

```graphql
directive @DEPRECATED__relay_ignore_unused_variables_error on QUERY | MUTATION | SUBSCRIPTION
```

TKTK

### @\_\_clientField

> This directive is not intended for use by developers directly. To set a field handle in product code use a compiler plugin ([source](https://github.com/facebook/relay/blob/8f08aaad9dae241ba6706b39160b89f4ed00c5c8/packages/graphql-compiler/core/GraphQLParser.js#L86-L91))

TKTK

### @uncheckedArguments_DEPRECATED

TKTK

### @react_flight_component

Currently behind `ENABLE_REACT_FLIGHT_COMPONENT_FIELD` feature flag.

```graphql
directive @react_flight_component(name: String!) on FIELD_DEFINITION
```

TKTK

### @preloadable

A directive that modifies queries and which causes Relay to generate `$Parameters.js` files and preloadable concrete requests. Required if the query is going to be used as part of an entry point.

Relay docs: https://relay.dev/docs/glossary/#preloadable

Example:

```graphql
query Query @preloadable {
  node(id: "foo") {
    id
  }
}
```

See: https://github.com/facebook/relay/commit/10df4d834da3a31e3d855837ad47e323568332ce

### @fixme_fat_interface

```graphql
directive @fixme_fat_interface on FIELD
```

See:

- https://github.com/facebook/relay/search?q=%22fixme_fat_interface%22
- https://github.com/facebook/relay/commit/15918a54d49f51ee656a44a6acec53dbe75ca372

### @no_inline

Directive definition:

```graphql
directive @no_inline(raw_response_type: Boolean) on FRAGMENT_DEFINITION
```

See:

- https://github.com/facebook/relay/commit/3526b424d7ec3d3ff07d8587951d2fb176b1868f
- https://github.com/facebook/relay/commit/57c7873b2b7f81c5f29e9b31a471ba47a8c20f4c

### @relay_resolver

```graphql
directive @relay_resolver(
  fragment_name: String!
  import_path: String!
  js_return_type: String!
) on FIELD_DEFINITION
```

TKTK

See:

- https://github.com/facebook/relay/commit/b8922feaf2472325306dec6f8023deb186658128
- https://github.com/facebook/relay/commit/4336701ba3d929a99da68e6848b63a4e3064b086

### @as_actor, @fb_actor_change

```graphql
directive @fb_actor_change on FIELD
```

TKTK

See:

- https://github.com/facebook/relay/commit/bcec2697899bc7f7bb0ed4e4ba60131d57abc51c
- https://github.com/facebook/relay/commit/7c1f3eb607b28a3b62b75f515faa6862e131e7d6

### @live_query

Definition:

```graphql
directive @live_query(
  enabled: Boolean = true
  polling_interval: Int
  config_id: String
  partial: Boolean
  event_stream: String
) on QUERY
```

Example:

```graphql
query QueryResourceTest10Query($id: ID!) @live_query(polling_interval: 10000) {
  node(id: $id) {
    ... on User {
      id
      name
    }
  }
}
```

See: https://github.com/facebook/relay/commit/5fb8d6f0797e616a099762fecc209839df42494f
