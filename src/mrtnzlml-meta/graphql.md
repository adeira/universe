> We recommend having one schema that describes your entire data universe.

https://github.com/facebook/relay/issues/130#issuecomment-133078797

---

- [artsy/metaphysics](https://github.com/artsy/metaphysics) - proxy of REST APIs with schema stitching for inspiration

# Recursive queries

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
