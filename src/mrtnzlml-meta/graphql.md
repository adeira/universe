> We recommend having one schema that describes your entire data universe.

https://github.com/facebook/relay/issues/130#issuecomment-133078797

---

- [artsy/metaphysics](https://github.com/artsy/metaphysics) - proxy of REST APIs with schema stitching for inspiration
- https://github.com/artsy/README/blob/master/playbooks/graphql-schema-design.md
- [GraphQL namespaces](https://github.com/facebook/graphql/issues/163) (interesting insights into FB design)

The GraphQL grammar is greedy; this means that when given a choice between two definitions in a production, the rule matching the longest sequence of tokens prevails. See: https://github.com/facebook/graphql/issues/539#issuecomment-455821685

# GraphQL errors

See: http://artsy.github.io/blog/2018/10/19/where-art-thou-my-error/

```typescript
import { OrderStatus_order } from "__generated__/OrderStatus_order.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface Props {
  order: OrderStatus_order
}

const OrderStatus: React.SFC<Props> = ({ order: orderStatusOrError }) =>
  orderStatusOrError.__typename === "OrderStatus" ? (
    <div>
      {orderStatusOrError.deliveryDispatched
        ? "Your order has been dispatched."
        : "Your order has not been dispatched yet."}
    </div>
  ) : (
    <div className="error">
      {orderStatusOrError.code === "unpublished"
        ? "Please contact gallery services."
        : `An unexpected error occurred: ${orderStatusOrError.message}`}
    </div>
  )

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
  `
)
```

There are some complications and unanswered questions though:

- GraphQL interface cannot implement other interface ([RFC](https://github.com/facebook/graphql/pull/373))
- scalars cannot be part of the union ([RFC](https://github.com/facebook/graphql/issues/215))
- mutations can fail with multiple errors - how to handle it with this pattern? (possible solution: https://github.com/artsy/artsy.github.io/issues/495#issuecomment-466517039)
- Relay `@connection` cannot be used with the union directly ([more details](https://github.com/artsy/artsy.github.io/issues/495#issuecomment-465667460)), solution: https://github.com/facebook/relay/issues/1983#issuecomment-467153713

# Recursive queries

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
