Simple utility to manage our ID fields in GraphQL correctly. The generated values are validated and URL compatible + it's typed for both Flow and Typescript.

# Install

```text
yarn add @adeira/graphql-global-id
```

# Basic usage

This utility automatically creates correct opaque and globally unique ID type so you don't have to think about it.

```js
import GlobalID from '@adeira/graphql-global-id';

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

# `toGlobalId`

TKTK

# Restoring original ID (`fromGlobalId``)

`GlobalID` used in previous examples accepts readable (unmasked ID) and returns opaque ID. You can revert this process in case you need to access the original unmasked ID. Check the following test to get the idea:

```js
import { fromGlobalId } from '@adeira/graphql-global-id';

it('returns correct original ID', () => {
  expect(fromGlobalId('TG9jYXRpb246bG9uZG9uX2di')).toBe('london_gb');
});
```

You should always use this function because the way how this utility works with masking and unmasking is just an internal detail.

# `isTypeOf`

TKTK

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
