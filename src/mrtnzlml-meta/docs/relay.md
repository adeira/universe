---
id: relay
title: Relay all-in
sidebar_label: Relay all-in
---

:::note
This file describes experimental and more advanced Relay features. It can be very unstable due to its nature so be careful. _Here be dragons!_ 🐉
:::

TODO:

- https://github.com/c0m1t/relay-enum-generator
- Mock Data Generation: https://github.com/facebook/relay/commit/09d317943f6936ffb0002154c389b6d7a507c58d
- `renderPolicy`: https://github.com/facebook/relay/commit/b1cf05de8770122b30d491c4265df01e161e67c9 (partial/full)
- New GC release buffer: https://github.com/mrtnzlml/relay/pull/126/commits/6ed264413ba8cdd586d695e5ed234951ee9eca13
- [complex arguments with nested variables are now supported](https://github.com/facebook/relay/commit/5da3be070283c6dcd42774ba33c1590db65fe3c7)
- HTTP persister example: https://github.com/facebook/relay/commit/aaa9588e081d3591ad8d043e924cacfadc06ec80
- special `__id` field
- special `__token` field (https://github.com/facebook/relay/commit/018af6da244e1242833e1bd89e8762c1409bee6d)
- https://github.com/relay-tools/relay-connection-handler-plus (use-case: https://github.com/facebook/relay/issues/3065)
- entrypoints: [prepareEntryPoint](https://github.com/facebook/relay/blob/master/packages/relay-experimental/prepareEntryPoint.js#L26), [EntryPointContainer](https://github.com/facebook/relay/blob/master/packages/relay-experimental/EntryPointContainer.react.js) + tests
- https://github.com/jstejada/relay-session
- https://github.com/maraisr/relay-sentry
- https://github.com/relay-tools/typescript-relayjs-examples/issues/1

> There are different tradeoffs across completeness, consistency, and performance, and there isn't one approach that is appropriate for every app. Relay focuses on cases where consistency matters: if you don't need consistency then a simpler/lighter solution can be more appropriate. ([source](https://github.com/facebook/relay/issues/2237#issuecomment-525420993))

## Useful Links (learning resources)

- https://github.com/adeira/relay-example
- https://github.com/sibelius/relay-modern-network-deep-dive
- https://medium.com/entria/wrangling-the-client-store-with-the-relay-modern-updater-function-5c32149a71ac
- https://twitter.com/sseraphini/status/1078595758801203202
- https://relay-modern-course.now.sh/packages/
- https://github.com/zth/relay-utils
- https://github.com/zth/reason-relay

## Relay Developer Tools

You can find Relay Devtools here: https://chrome.google.com/webstore/detail/relay-developer-tools/ncedobpgnmkhcmnnkcimnobpfepidadl/related

Don't confuse them with the old devtools. This version is the new one:

![GraphQL response overfetching example](/img/relay-new-devtools.png)

There is also a community fork worth trying: https://github.com/oslabs-beta/protostar-relay

Alternatively, you can also access the store directly (similarly to how the devtools are doing) from your dev console. To do so, you simply need to register a `__RELAY_DEVTOOLS_HOOK__` **before** creating your Relay Environment:

```js
if (
  process.env.NODE_ENV === 'development' &&
  window.__RELAY_DEVTOOLS_HOOK__ === undefined &&
  window.__RELAY__ === undefined
) {
  window.__RELAY_DEVTOOLS_HOOK__ = {
    registerEnvironment: (environment: Environment) => {
      window.__RELAY__ = {
        store: (dataID: string | null = null) => {
          const source = environment.getStore().getSource();
          if (dataID === null) {
            return source.toJSON();
          }
          return source.get(dataID);
        },
      };
    },
  };
}
```

The usage is simple: call `__RELAY__.store()` from your console _or_ call it with some record ID which is in the store `__RELAY__.store('client:root')`. Both of these calls should print the Relay Store content or the single record content respectively.

## What is `__isNode`?

The `__isNode` field here is fetched so that Relay can determine whether the object that is returned (whose type we don't know statically) implements the `Node` interface or not. The mutation will be transformed as follows:

```graphql
mutation SidebarLayoutMarkAsSeenMutation($leadID: ID!) @raw_response_type {
  updateLead(input: { id: $leadID, wasSeen: true }) {
    wasSeen
    ... on Node {
      __isNode: __typename # if this field is present, we know the return type implements `Node`
      id
    }
  }
}
```

So your optimistic response should include `__isNode: 'Lead'` if the type implements Node, or exclude that key if the type does not implement Node.

Source: https://github.com/facebook/relay/issues/3129#issuecomment-659439154 (Thanks [@josephsavona](https://github.com/josephsavona)!)

## Enabling feature flags

There are several feature flags hidden in Relay Runtime (obviously a geeky thing) and you can enable them like this:

```js
require('relay-runtime').RelayFeatureFlags.ENABLE_PRECISE_TYPE_REFINEMENT = true;
```

The latest Relay (master) has [these feature flags](https://github.com/facebook/relay/blob/90c81bbd404bee718707f32b7b959a24d0d5b72a/packages/relay-runtime/util/RelayFeatureFlags.js) to this date:

```js
const RelayFeatureFlags = {
  ENABLE_VARIABLE_CONNECTION_KEY: false,
  ENABLE_PARTIAL_RENDERING_DEFAULT: false,
  ENABLE_RELAY_CONTAINERS_SUSPENSE: false,
  ENABLE_PRECISE_TYPE_REFINEMENT: false,
  ENABLE_REACT_FLIGHT_COMPONENT_FIELD: false,
  ENABLE_REQUIRED_DIRECTIVES: false,
  ENABLE_GETFRAGMENTIDENTIFIER_OPTIMIZATION: false,
};
```

Source: https://github.com/facebook/relay/issues/3126#issuecomment-658438527

## GraphQL types without ID field

Ever wondered how are GraphQL types being stored inside Relay Store when the types doesn't have globally unique `ID!` according to GraphQL specification? Here is an example of 2 identical stores _with_ and _without_ the ID: https://gist.github.com/mrtnzlml/e77315a6879ce8de26fe2a164872be09

Basically, Relay will try to use the `ID` field when available (preferable). However, when it's not available, it will construct some unique key which represents the record correctly. Here is an example of the record _with_ ID:

```json
{
  "QWxsSG90ZWxBdmFpbGFiaWxpdHlIb3RlbDo0NTA5Njk1": {
    "__id": "QWxsSG90ZWxBdmFpbGFiaWxpdHlIb3RlbDo0NTA5Njk1",
    "__typename": "AllHotelAvailabilityHotel",
    "id": "QWxsSG90ZWxBdmFpbGFiaWxpdHlIb3RlbDo0NTA5Njk1",
    "name": "Sweet Inn Apartments - Rocafort"
  }
}
```

And here is it _without_ the `ID`:

```json
{
  "client:root:allAvailableBookingComHotels(search:{\"checkin\":\"2020-02-13\",\"checkout\":\"2020-02-15\",\"cityId\":\"SG90ZWxDaXR5Oi0zNzI0OTA=\",\"roomsConfiguration\":[{\"adultsCount\":2}]}):edges:0:node": {
    "__id": "client:root:allAvailableBookingComHotels(search:{\"checkin\":\"2020-02-13\",\"checkout\":\"2020-02-15\",\"cityId\":\"SG90ZWxDaXR5Oi0zNzI0OTA=\",\"roomsConfiguration\":[{\"adultsCount\":2}]}):edges:0:node",
    "__typename": "AllHotelAvailabilityHotel",
    "name": "Sweet Inn Apartments - Rocafort"
  }
}
```

As you can see, the ID is composed of the query itself + the path. Moreover, there are also GraphQL arguments which ensures you will always get the correct record (forementioned Relay consistency).

## Future of `QueryRenderer`/`useQuery` pattern

> In general we're planning to move away from the QueryRenderer/useQuery pattern, which we're referring to as "fetch-on-render". This design makes behavior unpredictable (rendering can happen arbitrarily due to changes in parent components, suspense can cause re-renders and doesn't guarantee cleanup). The alternative is "fetch-then-render" - perform your data-fetching based on some event (user interaction, navigation, timer, app initialization) and then consume that result during render. Then "how do i refetch?" has the same answer as "how do i fetch?". Expect to see more API changes in this direction.

Source: https://github.com/facebook/relay/issues/2864#issuecomment-535108266

## Deferred results

- https://github.com/graphql/graphql-js/pull/2318
- https://github.com/graphql/graphql-js/pull/2319
- https://gist.github.com/robrichard/f563fd272f65bdbe8742764f1a149b2b

`@defer` directive is not really ready in GraphQL world (no matter what framework) but there is a different solution which you can use today. All you need is a refetch container and `@include` directive. Let's say you want to fetch "note" lazily for some reason. Simply wrap the component into `createRefetchContainer` instead of `createFragmentContainer` and fetch some parts of the fragment conditionally like so:

```js
export const NoteContainer = createRefetchContainer(
  NoteContainerWithoutData,
  {
    lead: graphql`
      fragment NoteContainer_lead on Lead
      @argumentDefinitions(isMounted: { type: "Boolean!", defaultValue: false }) {
        id
        ... @include(if: $isMounted) {
          ...NoteEditor_lead
          note
        }
      }
    `,
  },
  graphql`
    query NoteContainerDeferredQuery($isMounted: Boolean!, $id: ID!) {
      lead: node(id: $id) {
        ...NoteContainer_lead @arguments(isMounted: $isMounted)
      }
    }
  `,
);
```

Now, the only thing you have to do is to send the refetch query on mount and you are done:

```js
useEffect(() => {
  // you can find `relay` in your props
  relay.refetch(
    {
      isMounted: true,
      id: lead.id,
    },
    undefined,
    undefined,
    {
      fetchPolicy: 'store-or-network', // handy but not necessary
    },
  );
}, [lead.id, relay]);
```

Kudos: https://relay-modern-course.now.sh/packages/11-simulating-defer/#2

## RelayResponseNormalizer: `handleStrippedNulls`

Update: https://github.com/facebook/relay/commit/7a798d16abd08a930a3b249c26697cf92c269639 (`treatMissingFieldsAsNull`)

Please read this: https://github.com/facebook/relay/issues/3052

Relay is able to recover completely missing fields in the response. You can use this knowledge to optimize JSON response from the server. Let's say this is our incoming payload from the server:

```json
{
  "data": {
    "allLocations": {
      "edges": [
        { "node": { "id": "san-francisco_ca_us", "name": "San Francisco" } },
        { "node": { "id": "boston_ma_us", "name": "Boston" } },
        { "node": { "id": "washington_dc_us", "name": "Washington, D.C." } }
      ]
    }
  }
}
```

Traditionally, server would return something like this in case of failure (or just missing data):

```json
{
  "data": {
    "allLocations": {
      "edges": [
        { "node": { "id": "san-francisco_ca_us", "name": "San Francisco" } },
        { "node": { "id": "boston_ma_us", "name": null } },
        { "node": { "id": "washington_dc_us", "name": null } }
      ]
    }
  },
  "errors": ...
}
```

But it's not necessary to send the nullable fields at all. Afterall, server knows what fields were requested. `RelayResponseNormalizer` by default recovers from this state so you can send response like this from the server (see the missing names):

```json
{
  "data": {
    "allLocations": {
      "edges": [
        { "node": { "id": "san-francisco_ca_us", "name": "San Francisco" } },
        { "node": { "id": "boston_ma_us" } },
        { "node": { "id": "washington_dc_us" } }
      ]
    }
  },
  "errors": ...
}
```

Relay will show you this warning in this console (dev mode only):

> Warning: RelayResponseNormalizer(): Payload did not contain a value for field `name: name`. Check that you are parsing with the same query that was used to fetch the payload.

See: https://github.com/facebook/relay/blob/76fef685f70a5aa09cd180ce0f2ef6b6d3f4f7e8/packages/relay-runtime/store/RelayResponseNormalizer.js#L75

## Refetch container

https://facebook.github.io/relay/docs/en/refetch-container.html

When `refetch` is called and the `refetchQuery` is executed, Relay doesn't actually use the result of the query to re-render the component. All it does is normalize the payload into the store and fire any relevant subscriptions. This means that if the fetched data is unrelated to the data that the mounted container is subscribed to (e.g. using a totally different node id that doesn't have any data overlaps), then the component won't re-render.

Refetch containers are only really meant to be used when you are changing variables in the component fragment. If you don't want or need to include variables in the fragment, you could go one level up and set new variables directly in the QueryRenderer (using props or state).

https://github.com/facebook/relay/issues/2244#issuecomment-355054944

## Common Relay mistakes (from user perspective)

- users are not using fragments correctly (data-masking misunderstanding, [types generation misunderstanding](https://github.com/relay-tools/relay-compiler-language-typescript/issues/64#issuecomment-458654418))
- incorrect environment imports (not using the right Environment instance)

TKTK

```ts
export type CustomFieldsList_customFields = ReadonlyArray<
  | {
      readonly __typename: 'CustomFieldAutocomplete';
      readonly ' $fragmentRefs': FragmentRefs<'CustomFieldAutocomplete_data'>;
      readonly ' $refType': 'CustomFieldsList_customFields';
    }
  | {
      readonly __typename: 'CustomFieldDate';
      readonly date: string;
      readonly name: string | null;
      readonly ' $fragmentRefs': FragmentRefs<'CustomFieldDate_data'>;
      readonly ' $refType': 'CustomFieldsList_customFields';
    }
>;

// type Extract<T, U> = T extends U ? T : never;
type CustomFieldDateType = Extract<
  CustomFieldsList_customFields[0], // because of @relay(plural: true)
  { readonly __typename: 'CustomFieldDate' }
>;
```

^^ this should however be unnecessary since the correct solution is to decompose

There is another plot twist into the type generation (Joe Savona on why sometimes the types are a bit weird, especially around interfaces):

> The Flow types are reflecting the data that Relay will actually provide at runtime. We don't encode which types implement which interfaces (even if we encoded it at build time, it could still change on the server in the meantime), so we always read into fragment spreads on abstract types. If the object implements the interface and we've fetched those fields they'll be there, but otherwise they could be missing entirely. Generating a disjoint union wouldn't reflect the actual values RelayReader would produce.

> That being said, it would be nice to have more precise output types, and it's something we're investigating.

## Common Relay errors explained

### Relay does not allow `__typename` field on Query, Mutation or Subscription

> Rather than special-case the representation of the root of the graph, Relay generates a "client" record to represent the Query and mutation/subscription objects. Like all other record instances those records have a **typename, but we special-case this typename to be 'ROOT'. Querying for the **typename field would overwrite this value with the actual typename (e.g. Query or whatever you call it in your schema), which messes with a few invariants. It's on our wishlist to make the root record a bit less special, but in practice we couldn't think of a reason to query \_\_typename on the root so we just disallow it for now.

- https://github.com/facebook/relay/commit/793729e7af9c7ee0de971e3d2ed26e5896774640#commitcomment-37652508

A nice workaround was mentioned here: https://github.com/facebook/relay/issues/2471#issuecomment-624238501

```graphql
... on Query { __typename }
```

(instead of just `__typename`)

## Current Relay struggles

These are things which are somehow difficult to achieve with current Relay abilities. It's almost like a wishlist:

- Function `readInlineData` doesn't support variables (throws error _"Variables are not yet supported inside @inline fragments."_)
- How to figure out request is in-flight when using fetch policy `store-and-network` (to show some spinner)?
- How to access fields with some complicated args (without actually knowing all the possible args combinations in advance). See: https://github.com/facebook/relay/issues/3077

## On handling of GraphQL errors in Relay

> My general advice for applications is, for now:
>
> 1: Establish and enforce a convention in your schema for the values returned in the errors property, and when an error is considered critical enough to return null for data (When nothing can be meaningfully be rendered anyway). For example, for critical errors you might choose to still return data but have errors contain an object with {critical: true, message: '...'}, or you might choose to make data be null. The important part is consistency.
>
> 2: Take advantage of this in your network layer. Check the data/errors property for the presence of critical error based on whatever approach you follow from the previous step, and if a critical error is present return {data: null, errors} to Relay. Otherwise pass through the data as-is.

(https://github.com/facebook/relay/issues/1816#issuecomment-304492071)

> The GraphQL errors field is intended for truly exceptional errors such as an invalid query or variable value: things that are not reasonably expected to occur in an application. Invalid user input or a backend service being unavailable are reasonable errors that are expected to occur (hopefully infrequently for the service down case!).

(continue reading here: https://github.com/facebook/relay/issues/2640#issuecomment-461137805)
