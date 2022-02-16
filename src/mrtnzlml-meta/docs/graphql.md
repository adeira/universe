---
id: graphql
title: GraphQL
sidebar_label: GraphQL
---

> We recommend having one schema that describes your entire data universe.

https://github.com/facebook/relay/issues/130#issuecomment-133078797

---

- https://landscape.graphql.org/
- [artsy/metaphysics](https://github.com/artsy/metaphysics) - proxy of REST APIs with schema stitching for inspiration
- https://github.com/artsy/README/blob/master/playbooks/graphql-schema-design.md
- [GraphQL namespaces](https://github.com/facebook/graphql/issues/163) (interesting insights into FB design)
- https://about.sourcegraph.com/graphql/graphql-at-twitter
- https://www.infoq.com/presentations/netflix-graphql/
- https://principledgraphql.com/
- https://www.graphql.com/articles/4-years-of-graphql-lee-byron
- https://github.com/esseswann/graphql-binary
- https://github.com/join-monster/join-monster

The GraphQL grammar is greedy; this means that when given a choice between two definitions in a production, the rule matching the longest sequence of tokens prevails. See: https://github.com/facebook/graphql/issues/539#issuecomment-455821685

## GraphQL clients

Usually people mention only Apollo or Relay and that's it. Black or white. But that's not fair. There are many many GraphQL clients with very interesting ideas (sorted alphabetically):

- https://github.com/apollographql/apollo-client (double declaration, dynamic)
- https://github.com/arackaf/micro-graphql-react
- https://github.com/babel-blade/babel-blade (without [double declaration](https://babel-blade.netlify.app/docs/declarationdeclaration))
- https://github.com/facebook/relay (double declaration, static)
- https://github.com/FormidableLabs/urql (double declaration)
- https://github.com/gucheen/fetchql
- https://github.com/jaydenseric/graphql-react
- https://github.com/kadirahq/lokka
- https://github.com/prisma-labs/graphql-request
- https://github.com/samdenty/gqless (without [double declaration](https://babel-blade.netlify.app/docs/declarationdeclaration))
- https://github.com/zth/reason-relay
- …

Moreover, there are even non-JS clients:

- https://github.com/graphql-rust/graphql-client (Rust)
- …

## GraphQL servers

- https://github.com/graphql/graphql-js (JavaScript)
- https://github.com/graphql-rust/juniper (Rust)
- https://github.com/absinthe-graphql/absinthe (Elixir)
- https://github.com/graphql-dotnet/graphql-dotnet (C#)
- https://github.com/graphql-go/graphql (Go)
- …

_Do you know more? Please submit a PR!_

## Optimizing GraphQL server DB queries

Quotation from the following source: https://github.com/graphql/graphql-js/issues/623#issuecomment-266851309

> ### Here are some things we do at Facebook:
>
> #### Caching
>
> First and foremost, we cache as much as possible. All along as I've been saying "load the data" - at Facebook that's usually shorthand for "check the cache first, otherwise load from the database". We invalidate our caches at write time so they can be long-lived. We use tech like memcached (but redis can also be a good option) to save the results of raw database queries.
>
> While memcached and redis are much faster than SQL, they still often require going between services or physical machines, so another layer of cache that you might consider is an in-memory cache in your API service's runtime. This can be trickier to implement though, you'll need a good cache policy and need to ensure you don't leak sensitive data between requests.
>
> When using caching, subsequent loads to { post(id: 1) { id, ... } will just be a fast cache lookup (though we still run the access control rules every time). When paginating through lists of things, this layer of caching makes loading the post much cheaper.
>
> #### Partial Fetches
>
> The initial place to start with fetching data from storage is to load all the data you might need for an object. Maybe that's a SELECT \* from SQL, for example. For smaller types, that's probably just fine, but for types with lots of data that might be overkill. Users are often a good example of a type that can end up with a lot of fields of data.
>
> One technique we've used before is to only fetch the critical data about a type when first encountering it (typically at least the data required to do access control). Then any fields requested for data loaded in that initial critical load can be returned directly, but if a field is requested that didn't come with the initial data, then a subsequent load is made. For example, since it's not that common to load a Facebook User's birthday, we don't load that information every time we encounter a User.

Another interesting comment: https://github.com/graphql/graphql-js/issues/700#issuecomment-276421515

## Deprecating queries

> We don't clean up old queries and don't allow breaking changes to the schema (but you can for example start returning null for some fields if a feature is removed).

> This is important because Facebook doesn't deprecate mobile clients and force upgrade people (it might be very difficult if you only have 2G mobile internet access). So for example a random Facebook Android installation from 3 years ago still sends its persisted queries and should work!

https://github.com/facebook/relay/pull/2641#issuecomment-475335484

## GraphQL server-client communication

GraphQL specification doesn't care about the communication protocol at all. That's on purpose - to be very flexible. This unfortunately creates some additional questions: how should the valid request look like, what format and protocol should we use, how should the error codes look like?

Below I try to explain and _recommend_ one approach via HTTP protocol.

### Valid/Invalid GraphQL request via HTTP

GraphQL client should send a POST request to the server in the following format:

```json
{
  "operations": "required string", // usually known as `query` (?)
  "variables": {}, // optional
  "operationName": "optional string" // required when sending more operations
}
```

Request should be valid only when:

- the request is valid from HTTP perspective
- the `operations` string is valid from the GraphQL spec perspective (http://spec.graphql.org/draft/#sec-Validation)
- the `variables` match the selected operation
- the operation name exists in the `operations`

It's usually allowed to mix the POST payload with GET arguments (query in POST and variables in GET for example). I'd not recommend that.

TKTK (TODO: stored operations)

### HTTP error codes

HTTP codes should reflect the HTTP communication only, not the actual GraphQL request result. So:

- `200` for successful request even though the response has some errors
- `400` when the query is missing or invalid (syntax error, validation error)
- `400` when the variables don't match the operations string (`*`)
- `400` when the operation name doesn't match the operations string (`*`)
- `405` for invalid HTTP methods
- generic `500` for everything else

That's how usually GraphQL servers behave. Unfortunately they quite often ignore cases marked with `*` since they depend on the valid request being specified and there is no such specification (only non-written conventions and recommendations).

TKTK

## Overfetching in GraphQL

While it's true that GraphQL improves over-fetching in comparison to REST API quite significantly, it doesn't solve it completely. There are similar issues (different kind of over-fetching):

1. it's quite common to fetch field you don't actually need (Eslint can help with that)
1. it's possible to fetch the same field many times thanks to GraphQL aliases

   ```graphql
   fragment XYZ_data on Label {
     alias_A: id(opaque: false)
     alias_B: id(opaque: false)
   }
   ```

   Returns:

   ```json5
   {
     alias_A: '29e9f801-4662-11ea-a6e3-6ff2a97c5f9a',
     alias_B: '29e9f801-4662-11ea-a6e3-6ff2a97c5f9a', // Again? 🤔
   }
   ```

1. data is not being returned in a normalized response which means we are sending a lot of duplicates (list of leads and their labels - the same label is being send many many times), see: https://github.com/graphql/graphql-js/issues/150
1. Under/over-fetching in GraphQL mutations (maybe Relay specific, however, other libs do not have any better solution as far as I know) https://github.com/facebook/relay/issues/1995

Possible solutions recommended by FB (see the issue):

- if the mutation / subscription is well scoped, fetch only what changed
- if not, refer to UI fragments in the mutations/subscriptions so that you fetch everything you might need (potential overfetch)

Typical example for the second case is when you have "create" mutation but you need to display this new element somewhere in the list. What fields should you query to fulfill the list requirements? This topic is further elaborated here (specifically "Staleness of Data"): https://relay.dev/docs/en/experimental/a-guided-tour-of-relay#availability-of-cached-data

![GraphQL response overfetching example](/img/graphql-response-overfetching.png)

## GraphQL errors

There are several GraphQL errors:

- server error (that's the error in GraphQL response, not affecting UI in any way or completely halting it)
- application specific errors:
  - user input error (usually used for mutations as a reaction for invalid input)
  - operation specific error (similar to the user-input error except it has an information about the failed operation - could completely replace the system error)
  - system error (some generic error which should be reflected in UI - can be replaced by the operation specific error)

TODO: elaborate on how to use them correctly, what are the risks and benefits

See: http://artsy.github.io/blog/2018/10/19/where-art-thou-my-error/

```typescript
import { OrderStatus_order } from '__generated__/OrderStatus_order.graphql';
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';

interface Props {
  order: OrderStatus_order;
}

const OrderStatus: React.SFC<Props> = ({ order: orderStatusOrError }) =>
  orderStatusOrError.__typename === 'OrderStatus' ? (
    <div>
      {orderStatusOrError.deliveryDispatched
        ? 'Your order has been dispatched.'
        : 'Your order has not been dispatched yet.'}
    </div>
  ) : (
    <div className="error">
      {orderStatusOrError.code === 'unpublished'
        ? 'Please contact gallery services.'
        : `An unexpected error occurred: ${orderStatusOrError.message}`}
    </div>
  );

export const OrderStatusContainer = createFragmentContainer(
  OrderStatus,
  graphql`
    fragment OrderStatus_order on Order {
      orderStatusOrError {
        __typename
        ... on OrderStatus {
          deliveryDispatched
        }
        ... on OrderError {
          message
          code
        }
      }
    }
  `,
);
```

There are some complications and unanswered questions though:

- GraphQL interface cannot implement other interface ([RFC](https://github.com/facebook/graphql/pull/373))
- scalars cannot be part of the union ([RFC](https://github.com/facebook/graphql/issues/215))
- mutations can fail with multiple errors - how to handle it with this pattern? (possible solution: https://github.com/artsy/artsy.github.io/issues/495#issuecomment-466517039)
- Relay `@connection` cannot be used with the union directly ([more details](https://github.com/artsy/artsy.github.io/issues/495#issuecomment-465667460)), solution: https://github.com/facebook/relay/issues/1983#issuecomment-467153713

Interesting little helper:

```js
const dataByTypename = (data) => (data && data.__typename ? { [data.__typename]: data } : {});
```

Usage:

```js
const { OrderError, OrderStatus } = dataByTypename(orderStatusOrError);
if (OrderError) {
  // render error component
}
// render OrderStatus component
```

Source: https://github.com/artsy/artsy.github.io/issues/495#issuecomment-509697859

## Recursive queries

> Take Reddit as an example since it's close to this hypothetical nested comments example. They don't actually query to an unknown depth when fetching nested comments. Instead, they eventually bottom out with a "show more comments" link which can trigger a new query fetch. The technique I illustrated in a prior comment allows for this maximum depth control.

[source](https://github.com/facebook/graphql/issues/91#issuecomment-254895093)

```graphql
{
  messages {
    ...CommentsRecursive
  }
}

fragment CommentsRecursive on Message {
  comments {
    ...CommentFields
    comments {
      ...CommentFields
      comments {
        ...CommentFields
        comments {
          ...CommentFields
          comments {
            ...CommentFields
            comments {
              ...CommentFields
              comments {
                ...CommentFields
                comments {
                  ...CommentFields
                }
              }
            }
          }
        }
      }
    }
  }
}

fragment CommentFields on Comment {
  id
  content
}
```

> GraphQL doesn't support recursive fragments by design, as this could allow unbounded data-fetching. Relay goes a bit further and offers support for recursion, but it still has to be terminated - you can use @argumentDefinitions to define a boolean value that is used to conditionally include the same fragment, passing @arguments to change the condition. But the recursion still has to terminate statically - e.g. you can have a fixed number of levels of recursion.

[source](https://github.com/facebook/relay/issues/1998#issuecomment-548147456)

```js
graphql`
  fragment QuickActivities_recursive on Lead
  @argumentDefinitions(recurse: { type: "Boolean", defaultValue: false }) {
    id
    ... @include(if: $recurse) {
      ...QuickActivities_recursive
    }
  }
`;

export default createFragmentContainer(XYZ, {
  lead: graphql`
    fragment QuickActivities_lead on Lead {
      id
      ...QuickActivities_recursive @arguments(recurse: true)
    }
  `,
});
```

## Rate Limiting, Cost Computation

So far the best idea I ever saw is this one: https://github.com/adeira/universe/blob/5d2c15e1767a6e91c5eb82f41abc1e856811d0df/src/graphql-result-size/semantics-and-complexity-of-graphql.pdf (alternative reading: [Result size calculation for Facebook’s GraphQL query language](https://www.diva-portal.org/smash/get/diva2:1237221/FULLTEXT01.pdf))

Experimental implementation here: https://github.com/adeira/universe/tree/5d2c15e1767a6e91c5eb82f41abc1e856811d0df/src/graphql-result-size

TKTK

Alternative approaches:

- https://developer.github.com/v4/guides/resource-limitations/ (TODO: explain why it's worse and when you should consider it)
- https://twitter.com/__xuorig__/status/1148653318069207041

## A/B testing in GraphQL

GraphQL has `@include` and `@skip` directives defined by default. There directives can be used for A/B testing like this for example:

```graphql
fragment MyLocation on Location {
  name
  type
  countryFlagURL
}

query ($first: Int! = 10, $abTestEnabled: Boolean! = true) {
  allLocations(first: $first) {
    edges {
      node {
        ...MyLocation
        id_A: code @include(if: $abTestEnabled)
        id_B: id(opaque: false) @skip(if: $abTestEnabled)
      }
    }
  }
}
```

Interestingly, you can use inline fragments to include/skip the whole block of fields like this:

```graphql
query ($first: Int! = 10, $abTestEnabled: Boolean! = true) {
  allLocations(first: $first) {
    edges {
      node {
        id
        ... @include(if: $abTestEnabled) {
          name
          slug
          type
        }
      }
    }
  }
}
```

Such inline fragments (without type condition or even without the directive) are allowed per specification (see: https://graphql.github.io/graphql-spec/draft/#sec-Inline-Fragments). Bonus tip: Relay handles this kind of fragment and generates Flow type correctly, for example:

```js
/*
query PollingQuery(
  $abTestEnabled: Boolean!
) {
  currency(code: "usd") {
    rate
    code @include(if: $abTestEnabled)
    format @include(if: $abTestEnabled)
    id
  }
}
*/
export type PollingQueryResponse = {|
  +currency: ?{|
    +rate: ?number,
    +code?: ?string, // note it's optional
    +format?: ?string, // note it's optional
  |},
|};
```

Therefore server can return you dynamic response even though Relay generates the meta files statically.

## Little know GraphQL behaviors

> Fields \“sender\” conflict because subfields \“avatar\” conflict because they return conflicting types String and LiveConversationVisitorAvatar. Use different aliases on the fields to fetch both if this was intentional.

When, what, how?

- https://stackoverflow.com/questions/56695262/graphql-error-fieldsconflict-fields-have-different-list-shapes
- http://spec.graphql.org/June2018/#sec-Field-Selection-Merging
- https://github.com/graphql/graphql-js/blob/d5a1ba8ce7a348860e814f6526feda1111dc018b/src/validation/__tests__/OverlappingFieldsCanBeMerged-test.js
- https://github.com/graphql/graphql-js/blob/d5a1ba8ce7a348860e814f6526feda1111dc018b/src/validation/rules/OverlappingFieldsCanBeMerged.js#L107-L160
