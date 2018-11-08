# Usage

This utility automatically creates correct opaque and globally unique ID type so you don't have to think about it.

```js
import GlobalID from '@kiwicom/graphql-global-id';

export default new GraphQLObjectType({
  name: 'TypeName',
  fields: {
    id: GlobalID(({ id }) => id),
  },
});
```

The example above would create this type:

```graphql
type TypeName {
  """
  The globally unique ID of an object. You can unmask this ID to get original
  value but please note that this unmasked ID is not globally unique anymore and
  therefore it cannot be used as a cache key.
  """
  id(opaque: Boolean = true): ID!
}
```

You can easily access original ID (also known as _"database ID"_ or _"original ID"_) using `opaque` parameter. This is very handy for legacy applications. However, try to always prefer the opaque version.
