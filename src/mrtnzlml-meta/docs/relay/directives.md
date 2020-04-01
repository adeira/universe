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

## @defer, @stream, @stream_connection

```graphql
directive @defer(label: String!, if: Boolean = true) on FRAGMENT_SPREAD | INLINE_FRAGMENT

directive @stream(label: String!, initial_count: Int!, if: Boolean = true) on FIELD
```

TKTK

> A bit more context: as implied from the talk, at Facebook we are currently experimenting with support for `@defer` and `@stream` directives in our GraphQL server and in Relay. Our plan is to get experience using these directives in our apps in order to validate the concept, iterating as appropriate. We're still early in this process and are not yet ready to begin any effort toward standardization, but we will certainly consider this as we get more experience and feel more confident in the approach.

(https://github.com/graphql/graphql-spec/issues/269#issuecomment-528970726)

- https://github.com/mrtnzlml/relay/pull/172/commits
- https://github.com/facebook/relay/commit/225cfb60cccdbb649ab16a13ed607de749992d21

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

## @refetchable(queryName: " ... ")

```graphql
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
