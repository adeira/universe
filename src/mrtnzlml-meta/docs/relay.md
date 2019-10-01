---
id: relay
title: All-in
sidebar_label: All-in
---

Useful Links:

- https://github.com/kiwicom/relay-example
- https://github.com/sibelius/relay-modern-network-deep-dive
- https://twitter.com/sseraphini/status/1078595758801203202
- https://github.com/facebook/relay/tree/master/packages/relay-test-utils
- https://relay-modern-course.now.sh/packages/
- https://github.com/zth/relay-utils
- https://github.com/zth/reason-relay

TODO:

- https://github.com/facebook/relay/pull/2619/files
- https://github.com/facebook/relay/issues/1701#issuecomment-460659564
- Mock Data Generation: https://github.com/facebook/relay/commit/09d317943f6936ffb0002154c389b6d7a507c58d
- https://github.com/facebook/relay/pull/2700/files
- `@relay_test_operation` https://github.com/mrtnzlml/relay/pull/339/files, https://relay.dev/docs/en/testing-relay-components#relay_test_operation, https://github.com/facebook/relay/issues/2807#issuecomment-515690739

This file describes experimental and more advanced Relay features. It can be very unstable due to its nature so be careful. _Here be dragons!_

> There are different tradeoffs across completeness, consistency, and performance, and there isn't one approach that is appropriate for every app. Relay focuses on cases where consistency matters: if you don't need consistency then a simpler/lighter solution can be more appropriate. ([source](https://github.com/facebook/relay/issues/2237#issuecomment-525420993))

## How to test latest unreleased changes from Relay master?

These changes are unreleased so you cannot easily install (uncompiled) master from NPM and use it. The easiest way how to try master is to clone Relay somewhere and run `yarn install` in the root. This will not only install all the necessary dependencies but also compile Relay packages. Now, just replace your versions with file paths in `package.json`:

```patch
diff --git a/src/packages/relay/package.json b/src/packages/relay/package.json
index 45a44734..99be1766 100644
--- a/src/packages/relay/package.json
+++ b/src/packages/relay/package.json
@@ -10,9 +10,9 @@
   "dependencies": {
     "@kiwicom/fetch": "^2.3.1",
     "@kiwicom/js": "^0.8.0",
-    "react-relay": "^3.0.0",
-    "relay-compiler": "^3.0.0",
-    "relay-runtime": "^3.0.0"
+    "react-relay": "file:/Users/mrtnzlml/Work/mrtnzlml/relay/dist/react-relay",
+    "relay-compiler": "file:/Users/mrtnzlml/Work/mrtnzlml/relay/dist/relay-compiler",
+    "relay-runtime": "file:/Users/mrtnzlml/Work/mrtnzlml/relay/dist/relay-runtime"
   },
   "peerDependencies": {
     "react": "^16.8.0"
```

Do not forget to run `yarn install` in your project as well.

## Relay Config

See: https://github.com/facebook/relay/commit/d3ec68ec137f7d72598a6f28025e94fba280e86e

## Future of `QueryRenderer`/`useQuery` pattern

> In general we're planning to move away from the QueryRenderer/useQuery pattern, which we're referring to as "fetch-on-render". This design makes behavior unpredictable (rendering can happen arbitrarily due to changes in parent components, suspense can cause re-renders and doesn't guarantee cleanup). The alternative is "fetch-then-render" - perform your data-fetching based on some event (user interaction, navigation, timer, app initialization) and then consume that result during render. Then "how do i refetch?" has the same answer as "how do i fetch?". Expect to see more API changes in this direction.

Source: https://github.com/facebook/relay/issues/2864#issuecomment-535108266

## New Connection Model

`@connection_resolver(resolver: "FeedbackCommentsResolver")`

- 1/n: https://github.com/facebook/relay/commit/6f0129531caac238b5dc5725819be543c5672388
- 2/n: https://github.com/facebook/relay/commit/d0a870d6f87c8e56844aac0b1c82d656e36715b0
- 3/n: https://github.com/facebook/relay/commit/52f65d2ec8bf192d0af228af3f137b5448cd4017
- 4/n: https://github.com/facebook/relay/commit/2eec7c39ee8db1f784fc5c600425a7de7601da27
- 5/n: https://github.com/facebook/relay/commit/88bdeb076a8e4fee5a94d50b03993e94326f7976
- https://github.com/facebook/relay/commit/e8160e76e47b28dd6835cdb82aa3444081107b16
- https://github.com/facebook/relay/commit/597e87131c7ba94129a166619c83e4bd5c3bee17
- https://github.com/facebook/relay/commit/7eac6f61b968df93f30f1fbbdf9371ed4b74845a
- https://github.com/facebook/relay/commit/c203d54e75d71e0ca1c2c3c8385f7814a5729dfe
- https://github.com/facebook/relay/commit/e1b3da0aca1718631da443bf5cdf0d498a7ef43f
- https://github.com/facebook/relay/commit/56b185fc4322480dcb76681dc6675e42d59a3ff9
- `__id` https://github.com/facebook/relay/commit/aba82f91edc9da64f9c299b0723760c5abd8683f

Streaming support `@stream_connection_resolver( ... )`

- https://github.com/facebook/relay/commit/96a8eec63b903c6a9fa237bd44d13e73da04f3d0
- https://github.com/facebook/relay/commit/9efe9289a5375051d637ff21a1804ac13414b61a

## `LocalQueryRenderer`

- https://github.com/mrtnzlml/relay/pull/447/files

## `@raw_response_type`

See: https://github.com/facebook/relay/commit/d23455a2ae9d24416d0ab0b0c2366b28fd44975e

```graphql
query ViewerQuery @raw_response_type {
  viewer {
    actor {
      id
    }
  }
}
```

## Client field via `@__clientField(handle: " ... ")`

> This directive is not intended for use by developers directly. To set a field handle in product code use a compiler plugin

([source](https://github.com/facebook/relay/blob/8f08aaad9dae241ba6706b39160b89f4ed00c5c8/packages/graphql-compiler/core/GraphQLParser.js#L86-L91))

Anyway, you can compute the client field value from other server field:

```graphql
fragment Example on Article {
  body @__clientField(handle: "draft")

  # this is a client field and it will contain uppercased `body` value
  draft
}
```

This obviously means that you need to define your local client schema (`schema.local.graphql`):

```graphql
extend type Article {
  draft: String
}
```

And you have to create the handler which is being registered when you are creating new Relay environment (https://facebook.github.io/relay/docs/en/relay-environment.html#adding-a-handlerprovider):

```js
const DraftHandler = {
  update(store, payload) {
    const record = store.get(payload.dataID);
    const content = record.getValue(payload.fieldKey);
    record.setValue(content.toUpperCase(), 'draft');

    // Set the original value to handleKey, otherwise the field with @__clientField directive will be undefined
    record.setValue(content, payload.handleKey);
  },
};
```

Don't forget to run Relay compiler after you add these changes.

More info: https://medium.com/@matt.krick/replacing-redux-with-relay-47ed085bfafe

## @connection(handler: "custom_handler", ...)

It is possible to specify custom handler when using `@connection`. This way you can define custom behavior and effectively completely replace the default `RelayConnectionHandler`. This handler must be added to the `handlerProvider` (default is `connection` handler for the raw `@connection`). This is how [default Relay handler provider looks like](https://github.com/facebook/relay/blob/8f4d54522440a8146de794e72ea5bf873016b408/packages/relay-runtime/handlers/RelayDefaultHandlerProvider.js).

See also: https://github.com/facebook/relay/issues/2570#issuecomment-438026375

## @connection(dynamicKey_UNSTABLE: \$someVariable, ...)

See: https://github.com/facebook/relay/commit/3ea3ac7d4f64f9260c69f49316a92cdc78dd4827

## RelayResponseNormalizer: `handleStrippedNulls`

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

## Relay hooks `useQuery`, `useFragment`, `usePaginationFragment`, `useRefetchableFragment`, `useBlockingPaginationFragment`, `useLegacyPaginationFragment`

TODO:

- https://github.com/facebook/relay/commit/b83aace7a95f5fd82cbb30d1f6888bcc4767eeb5
- https://github.com/relayjs/eslint-plugin-relay/commit/b86eb2ace82c89194a4309ff63701b52a2279b3b
- https://github.com/relayjs/eslint-plugin-relay/pull/63/files
- https://github.com/facebook/relay/issues/2792#issuecomment-510481040
- https://github.com/relay-tools/relay-hooks/issues/5#issue-453957030
- https://github.com/levels3d/offblast
- https://github.com/relayjs/eslint-plugin-relay/pull/67/files

## @refetchable(queryName: " ... ")

Currently broken: https://github.com/facebook/relay/issues/2713

```js
export default createRefetchContainer(LocationsPaginatedRefetch, {
  data: graphql`
    fragment LocationsPaginatedRefetch_data on RootQuery
      @argumentDefinitions(count: { type: "Int", defaultValue: 20 }, after: { type: "String" })
      @refetchable(queryName: "LocationsPaginatedRefetchRefetchQuery") {
      incrementalPagination: allLocations(first: $count, after: $after)
        @connection(key: "allLocations_incrementalPagination") {
        edges {
          node {
            id
            ...Location_location
          }
        }
        pageInfo {
          endCursor
        }
      }
    }
  `,
});
```

## Refetch container

https://facebook.github.io/relay/docs/en/refetch-container.html

When `refetch` is called and the `refetchQuery` is executed, Relay doesn't actually use the result of the query to re-render the component. All it does is normalize the payload into the store and fire any relevant subscriptions. This means that if the fetched data is unrelated to the data that the mounted container is subscribed to (e.g. using a totally different node id that doesn't have any data overlaps), then the component won't re-render.

Refetch containers are only really meant to be used when you are changing variables in the component fragment. If you don't want or need to include variables in the fragment, you could go one level up and set new variables directly in the QueryRenderer (using props or state).

https://github.com/facebook/relay/issues/2244#issuecomment-355054944

## @defer, @stream, @stream_connection

TODO

- https://github.com/mrtnzlml/relay/pull/172/commits
- https://github.com/facebook/relay/commit/225cfb60cccdbb649ab16a13ed607de749992d21

## @inline ???

```js
/**
 * A transform that converts fragment spreads where the referenced fragment
 * is annotated with @inline to a InlineDataFragmentSpread.
 * InlineDataFragmentSpreads have the selections of the referenced fragment inlined.
 */
```

- https://github.com/facebook/relay/commit/df7b25dd621612694fb8440d51bf2a913b16f31b
- https://github.com/facebook/relay/pull/2850/files
- https://github.com/facebook/relay/commit/68745c719401c3be01d022f1617525daac69cfa1
- https://github.com/mrtnzlml/relay/pull/442/commits

## RelayNetworkLogger

TODO: https://github.com/facebook/relay/issues/2674 !

```js
import RelayNetworkLogger from 'relay-runtime/lib/RelayNetworkLogger';

import fetchFunction from './fetchFunction';
import subscribeFunction from './subscribeFunction';

const fetch = __DEV__ ? RelayNetworkLogger.wrapFetch(fetchFunction) : fetchFunction;

const subscribe = __DEV__ ? RelayNetworkLogger.wrapSubscribe(subscribeFunction) : subscribeFunction;

const network = Network.create(fetch, subscribe);
const source = new RecordSource();
const store = new Store(source);

const env = new Environment({
  network,
  store,
});

export default env;
```

## RelayObservable.onUnhandledError

You can override default behavior of unhandled errors when using Relay Observable:

```js
import { Observable } from 'relay-runtime';

if (__DEV__) {
  Observable.onUnhandledError((error, isUncaughtThrownError) => {
    console.error(error);
  });
}

Observable.create( ... )
```

Default [implementation](https://github.com/facebook/relay/blob/8f4d54522440a8146de794e72ea5bf873016b408/packages/relay-runtime/network/RelayObservable.js#L616-L636):

```js
if (__DEV__) {
  // Default implementation of HostReportErrors() in development builds.
  // Can be replaced by the host application environment.
  RelayObservable.onUnhandledError((error, isUncaughtThrownError) => {
    declare function fail(string): void;
    if (typeof fail === 'function') {
      // In test environments (Jest), fail() immediately fails the current test.
      fail(String(error));
    } else if (isUncaughtThrownError) {
      // Rethrow uncaught thrown errors on the next frame to avoid breaking
      // current logic.
      setTimeout(() => {
        throw error;
      });
    } else if (typeof console !== 'undefined') {
      // Otherwise, log the unhandled error for visibility.
      // eslint-disable-next-line no-console
      console.error('RelayObservable: Unhandled Error', error);
    }
  });
}
```
