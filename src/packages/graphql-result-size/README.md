# GraphQL Result Size Calculator

This module provides an implementation of an algorithm that calculates the (exact) size of GraphQL response objects without actually producing the response. Hence, this module can be used to check whether the size of the response to a GraphQL query exceeds a given threshold. In this sense, the module should be used as a dependency in GraphQL server frameworks that execute the server-side runtime process of GraphQL.

Based on Algorithm 2 of the research paper [Semantics and Complexity of GraphQL](./semantics-and-complexity-of-graphql.pdf) by _Olaf Hartig_ and _Jorge Pérez_. Since this research paper is pretty dense and math-heavy, you may first want to read a more [lightweight, high-level summary of the paper](http://blog.liu.se/olafhartig/2018/08/08/lightweight-summary-of-our-paper-semantics-and-complexity-of-graphql/).

Please note: our implementation differs from the referential implementation in a few cases:

- we do not query database to get the actual number of edges
- our implementation is more real-world ready (bugfixes, support for Relay connections, unions, fragments, interfaces, ...)
- our implementation has fixed performance (even though all the optimizations are missing yet)

**This algorithm is not a good fit if you need to calculate the score of your query/fragment.** It calculates scores of responses. Therefore it doesn't say much about the query/fragment size.

# Score calculation

Look at the following query from the article.

```graphql
query {
  start {
    advisor {
      univ {
        name
      }
    }
    friend {
      univ {
        name
      }
    }
  }
}
```

This query will yield the following minimal (syntactically correct) response:

```text
start: {
  advisor: {
    univ: { name: xxx }
  }
  friend: {
    univ: { name: xxx }
  }
}
```

> We measure the size of GraphQL query results in terms of symbols, where every field name counts as a symbol, and so does every scalar value and every special character (such as colons and curly braces). For instance, the aforementioned result of our example query happens to be of size 26. However, we want to calculate this size without already having produced the query result.

Why is the response size _26_?

```text
7 field names
2 scalars
7 colons
10 braces
---
26
```

In more math-y notation following the algorithm from the paper:

```text
4 + x
4 + size(q1,u) + size(q2,u)         4 + 11 + 11 = 26

size(q1,u) = 4 + size(q3,v)         4 + 7
size(q3,v) = 4 + size(q4,w)         4 + 3
q4 = name                           we see that the result of subquery q4 is 'name:xxx' and, thus, contains exactly 3 symbols
```

Please note that we don't have to calculate `size(q2,u)` again since it's already calculated by `size(q1,u)` and the response types are identical (therefore we can reuse it and keep this algorithm linear).

Another example:

```text
{
  me {
    friends(first: 1) {
      name
    }
  }
}

   ↓ ↓ ↓

me: {
  friends: [
    {
      name: xxx
    }
  ]
}

   ↓ ↓ ↓

= 13
```

# Prior Art

- https://doi.org/10.1145/3178876.3186014
- https://youtu.be/oNDmVLRKo_M
- https://github.com/LiUGraphQL/graphql-result-size
- https://developer.github.com/v4/guides/resource-limitations/#node-limit
