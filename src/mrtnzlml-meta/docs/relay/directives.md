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

See: https://github.com/facebook/relay/commit/07ccab7cc637f51f2f15fc75ed824d1de8ede72f (currently unreleased, only on `master`)

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

```graphql
directive @appendEdge(connections: [String!]!) on FIELD
directive @prependEdge(connections: [String!]!) on FIELD
directive @appendNode(connections: [String!]!, edgeTypeName: String!) on FIELD
directive @prependNode(connections: [String!]!, edgeTypeName: String!) on FIELD
```

These new directives will help you to update the store declaratively. You can used them to append/prepend connection edges OR create and edge and append/prepend them (in case of `*Node` directives). See (currently unreleased, only on `master`):

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

```graphql
enum RequiredFieldAction {
  NONE # severity: 0
  LOG # severity: 1
  THROW # severity: 2
}

directive @required(action: RequiredFieldAction!) on FIELD
```

TKTK (https://github.com/facebook/relay/commit/9926676c72667e83abe661ef0df52234eda51542)

```graphql
query MyQuery {
  me @required(action: LOG) {
    name
  }
}
```

Nested `@required` directives must have compatible severities. For example, the following fragment is invalid:

```graphql
fragment Foo on User {
  address @required(action: THROW) {
    city @required(action: LOG)
  }
}

# The @required field [1] may not have an \`action\` less severe than that of its @required parent [2]. [1] should probably be \`action: THROW\`.
```

This directive also affects generated Flow types (turns the properties into required ones).

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

Relay docs: https://relay.dev/docs/en/graphql-in-relay.html#inline

```graphql
directive @inline on FRAGMENT_DEFINITION
```

TKTK

Non-React functions can also take advantage of data masking. A fragment can be defined with the `@inline` directive and stored in a local variable. The non-React function can then "unmask" the data using the `readInlineData` function.

## @match, @module

```graphql
directive @match on FIELD

directive @module(name: String!) on FRAGMENT_SPREAD
```

TKTK

See also: [relay/match-module.md](/relay/match-module.md)

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

```graphql
directive @fetchable(field_name: String!) on OBJECT
directive @refetchable(queryName: String!) on FRAGMENT_DEFINITION
```

TKTK

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

```graphql
directive @relay(
  # Marks a fragment as being backed by a GraphQLList.
  plural: Boolean

  # Marks a fragment spread which should be unmasked if provided false
  mask: Boolean = true
) on FRAGMENT_DEFINITION | FRAGMENT_SPREAD
```

TKTK

> The use-case is things like utility functions that are not executing in a React context and therefore don't have access to the context's environment. `@relay(mask:false)` was our earlier solution to this (which as you noted has some issues), `@inline` is its replacement.

https://github.com/relay-tools/relay-compiler-language-typescript/issues/64#issuecomment-564580765

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

### @relay_early_flush

Only for internal FB purposes and only in the new experimental Rust compiler (https://github.com/facebook/relay/blob/7b5bd9d98e08a96e4cf8dedf9f36906041ff1d5d/compiler/crates/graphql-transforms/tests/relay_early_flush/fixtures/query-with-relay-early-flush.expected).

In:

```graphql
query MyQuery @relay_early_flush {
  node(id: "foo") {
    id
  }
}
```

Out:

```graphql
query MyQuery {
  relay_early_flush(query_name: "MyQuery")
  node(id: "foo") {
    id
  }
}
```

### @react_flight_component

Currently behind `ENABLE_REACT_FLIGHT_COMPONENT_FIELD` feature flag.

```graphql
directive @react_flight_component(name: String!) on FIELD_DEFINITION
```

TKTK
