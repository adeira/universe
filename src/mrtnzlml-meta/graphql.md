> We recommend having one schema that describes your entire data universe.

https://github.com/facebook/relay/issues/130#issuecomment-133078797

---

- [artsy/metaphysics](https://github.com/artsy/metaphysics) - proxy of REST APIs with schema stitching for inspiration
- https://github.com/artsy/README/blob/master/playbooks/graphql-schema-design.md
- http://artsy.github.io/blog/2018/10/19/where-art-thou-my-error/

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
