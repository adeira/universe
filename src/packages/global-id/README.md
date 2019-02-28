# Install

```text
yarn add @kiwicom/graphql-global-id
```

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

Sometimes it's necessary to use the non-opaque version. And you may want to expose different ID than originally used for the opaque and unique ID. You can do so using the second optional argument:

```js
// This is internal ID fetcher to ensure unique ID values across the whole GraphQL universe:
const idFetcher = ({ id, name, email }) => `${id}:${name}:${email}`;

// This fetcher exposes just the ID because non-opaque IDs are not unique anyway:
const opaqueIdFetcher = ({ id }) => id;

const fields = {
  id: GlobalID(idFetcher, opaqueIdFetcher),
};
```

# Tips

It is possible to fetch both ID versions at the same time in GraphQL:

```graphql
{
  customerBookings {
    id # or id(opaque: true)
    bookingID: id(opaque: false)
  }
}
```

This is handy especially when you are migrating old code to this new type. Just change something like deprecated `databaseID` to `databaseID: id(opaque: false)` and that's it.
