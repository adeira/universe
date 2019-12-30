---
id: graphql
title: GraphQL
sidebar_label: GraphQL
---

> We recommend having one schema that describes your entire data universe.

https://github.com/facebook/relay/issues/130#issuecomment-133078797

---

- [artsy/metaphysics](https://github.com/artsy/metaphysics) - proxy of REST APIs with schema stitching for inspiration
- https://github.com/artsy/README/blob/master/playbooks/graphql-schema-design.md
- [GraphQL namespaces](https://github.com/facebook/graphql/issues/163) (interesting insights into FB design)
- https://about.sourcegraph.com/graphql/graphql-at-twitter
- https://www.infoq.com/presentations/netflix-graphql/

The GraphQL grammar is greedy; this means that when given a choice between two definitions in a production, the rule matching the longest sequence of tokens prevails. See: https://github.com/facebook/graphql/issues/539#issuecomment-455821685

## Deprecating queries

> We don't clean up old queries and don't allow breaking changes to the schema (but you can for example start returning null for some fields if a feature is removed).

> This is important because Facebook doesn't deprecate mobile clients and force upgrade people (it might be very difficult if you only have 2G mobile internet access). So for example a random Facebook Android installation from 3 years ago still sends its persisted queries and should work!

https://github.com/facebook/relay/pull/2641#issuecomment-475335484

## GraphQL errors

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
const dataByTypename = data => data && data.__typename ? { [data.__typename]: data } : {}
```

Usage:

```js
const { OrderError, OrderStatus } = dataByTypename(orderStatusOrError)
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

## Rate Limiting

- http://olafhartig.de/files/HartigPerez_WWW2018_Preprint.pdf
- https://twitter.com/__xuorig__/status/1148653318069207041

## A/B testing in GraphQL

GraphQL has `@include` and `@skip` directives defined by default. There directives can be used for A/B testing like this for example:

```graphql
fragment MyLocation on Location {
  name
  type
  countryFlagURL
}

query($first: Int! = 10, $abTestEnabled: Boolean! = true) {
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
query($first: Int! = 10, $abTestEnabled: Boolean! = true) {
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
