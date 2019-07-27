Useful Links:

- https://github.com/kiwicom/relay-example
- https://github.com/sibelius/relay-modern-network-deep-dive
- https://twitter.com/sseraphini/status/1078595758801203202
- https://github.com/facebook/relay/tree/master/packages/relay-test-utils
- https://relay-modern-course.now.sh/packages/
- https://github.com/zth/relay-utils

TODO:

- https://github.com/facebook/relay/pull/2619/files
- https://github.com/facebook/relay/issues/1701#issuecomment-460659564
- Mock Data Generation: https://github.com/mrtnzlml/relay/pull/253/commits/09d317943f6936ffb0002154c389b6d7a507c58d
- https://github.com/facebook/relay/pull/2700/files
- `@relay_test_operation` https://github.com/mrtnzlml/relay/pull/339/files

This file describes experimental and more advanced Relay features. It can be very unstable due to its nature so be careful. _Here be dragons!_

# How to test latest unreleased changes from Relay master?

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

# Relay Config

See: https://github.com/mrtnzlml/relay/pull/424/commits/d3ec68ec137f7d72598a6f28025e94fba280e86e

# New Connection Model

`@connection_resolver(resolver: "FeedbackCommentsResolver")`

- 1/n: https://github.com/mrtnzlml/relay/pull/455/commits/6f0129531caac238b5dc5725819be543c5672388
- 2/n: https://github.com/mrtnzlml/relay/pull/458/commits/d0a870d6f87c8e56844aac0b1c82d656e36715b0
- 3/n: https://github.com/mrtnzlml/relay/pull/458/commits/52f65d2ec8bf192d0af228af3f137b5448cd4017

# `LocalQueryRenderer`

- https://github.com/mrtnzlml/relay/pull/447/files

# `@raw_response_type`

See: https://github.com/mrtnzlml/relay/pull/459/commits/d23455a2ae9d24416d0ab0b0c2366b28fd44975e

```graphql
query ViewerQuery @raw_response_type {
  viewer {
    actor {
      id
    }
  }
}
```

# Local schema

First define local schema (`schema.local.graphql`):

```graphql
"""
Extend type: https://graphql.github.io/graphql-spec/draft/#sec-Object-Extensions
"""
extend type Article {
  draft: String!
}

"""
Or add new query: https://github.com/facebook/relay/issues/1656#issuecomment-382461183
"""
extend type Query {
  errors: [Error!]
}

type Error {
  id: ID!
  message: String!
}
```

Run Relay Compiler as usual (no special option required):

```
$ relay-compiler --src ./packages --schema ./packages/schema.graphql --verbose
```

File `schema.local.graphql` must be somewhere in `src` folder with the `*.graphql` extension. You should be good to go - just fetch the fields as usual. You have to commit local update to fill these fields and types:

```js
Relay.commitLocalUpdate(environment, store => {
  const articleID = 'f9496862-4fb7-4a09-bc05-a9a3ce2cb7b3'; // ID of the `Article` type you want to update
  store.get(articleID).setValue('My custom draft text', 'draft');

  // or create new types:
  const root = store.getRoot();
  const errRecord = store.create('ID_1', 'Error');
  errRecord.setValue('ID_1', 'id');
  errRecord.setValue('My custom error message', 'message');
  root.setLinkedRecords([errRecord, ...], 'errors');
});
```

More info here: http://facebook.github.io/relay/docs/en/relay-store.html

Protip: create many local GraphQL extensions closely related to one specific part of your application. For example you could create `gdsv.local.graphql` with the following content:

```graphql
extend type PNRInfo {
  successMessage: String
}
```

This way I created `successMessage` client field on `PNRInfo` type and it should be more or less obvious that it's related only to this `GDSV` part. All local schemas are being auto-discovered thanks to `*.graphql` file extension. You can now fetch and render this success message somewhere in GDSV application. Propagation of this message is trivial (you have to fetch the `PNRInfo` ID):

```js
Relay.commitLocalUpdate(environment, store => {
  store
    .get(response.id) // unique opaque ID identifying PNRInfo record
    .setValue(
      'Request has been successfully sent.', // the actual message
      'successMessage' // client field name
    )
  }
);
```

Please note that client schema is still somehow experimental feature and that server may introduce the same field `successMessage` which will conflict with the client one (new kind of BC break). Luckily, Relay will recognize this BC break and it will throw an error:

```
ERROR:
Field "PNRInfo.successMessage" already exists in the schema. It cannot also be defined in this type extension.
```

# @__clientField(handle: " ... ")

> This directive is not intended for use by developers directly. To set a field handle in product code use a compiler plugin

([source](https://github.com/facebook/relay/blob/8f08aaad9dae241ba6706b39160b89f4ed00c5c8/packages/graphql-compiler/core/GraphQLParser.js#L86-L91))

Anyway, you can compute the client field value from other server field:

```graphql
fragment Example on Article {
  body

  # Relay is a bit broken now (see: https://github.com/facebook/relay/issues/2488)
  _: body @__clientField(handle: "draft")

  # this is a client field and it will contain uppercased `body` value
  draft
}
```

And you have to create the handler (https://facebook.github.io/relay/docs/en/relay-environment.html#adding-a-handlerprovider):

```js
const DraftHandler = {
  update(store, payload) {
    const record = store.get(payload.dataID);
    const content = record.getValue(payload.fieldKey);
    record.setValue(content.toUpperCase(), 'draft');
  }
};
```

More info: https://medium.com/@matt.krick/replacing-redux-with-relay-47ed085bfafe

# @connection(handler: "custom_handler", ...)

It is possible to specify custom handler when using `@connection`. This way you can define custom behavior and effectively completely replace the default `RelayConnectionHandler`. This handler must be added to the `handlerProvider` (default is `connection` handler for the raw `@connection`). This is how [default Relay handler provider looks like](https://github.com/facebook/relay/blob/8f4d54522440a8146de794e72ea5bf873016b408/packages/relay-runtime/handlers/RelayDefaultHandlerProvider.js).

See also: https://github.com/facebook/relay/issues/2570#issuecomment-438026375

# @connection(dynamicKey_UNSTABLE: $someVariable, ...)

See: https://github.com/mrtnzlml/relay/pull/421/commits/3ea3ac7d4f64f9260c69f49316a92cdc78dd4827

# RelayResponseNormalizer: `handleStrippedNulls`

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

# Relay hooks `useQuery`, `useFragment`, `usePaginationFragment`, `useRefetchableFragment`

TODO:

- https://github.com/relayjs/eslint-plugin-relay/commit/b86eb2ace82c89194a4309ff63701b52a2279b3b
- https://github.com/relayjs/eslint-plugin-relay/pull/63/files
- https://github.com/facebook/relay/issues/2792#issuecomment-510481040
- https://github.com/relay-tools/relay-hooks/issues/5#issue-453957030
- https://github.com/levels3d/offblast

# @match, @module

These directives allow you to lazily load union results. First, it requires `JSDependency` GraphQL scalar. Next it's necessary to use Union field with this shape:

```graphql
union FormattedContent = PlainContent | BoldContent

type Todo implements Node {
  id: ID!
  content(supported: [String!]!): FormattedContent
  complete: Boolean!
}
```

Directive `@match` can be used on the field `content` only if it follows this shape. And lastly, directive `@module` can be used on `JSDependency` fields:

```graphql
type BoldContent {
  data: BoldContentData
  js(module: String): JSDependency
}
```

Usage:

```graphql
fragment Todo_todo on Todo {
  complete
  id
  content @match {
    ...PlainTodoRenderer_value @module(name: "PlainTodoRenderer.react")
    ...BoldTodoRenderer_value @module(name: "BoldTodoRenderer.react")
  }
}
```

```js
const PlainTodoRenderer = React.lazy(() =>
  import(/* webpackChunkName: "PlainTodoRenderer" */ './PlainTodoRenderer'),
);
const BoldTodoRenderer = React.lazy(() =>
  import(/* webpackChunkName: "BoldTodoRenderer" */ './BoldTodoRenderer'),
);

const MatchContainer = ({match, fallback}: Props) => {
  switch (match.__module_component) {
    case 'BoldTodoRenderer.react':
      return (
        <React.Suspense fallback={fallback}>
          <BoldTodoRenderer value={match} />
        </React.Suspense>
      );
    case 'PlainTodoRenderer.react':
      return (
        <React.Suspense fallback={fallback}>
          <PlainTodoRenderer value={match} />
        </React.Suspense>
      );
    default:
      return 'Nothing matched...';
  }
};
```

_still researching_

- https://github.com/relayjs/relay-examples/pull/95
- https://github.com/relayjs/relay-examples/pull/96

# @refetchable(queryName: " ... ")

Currently broken: https://github.com/facebook/relay/issues/2713

```js
export default createRefetchContainer(LocationsPaginatedRefetch, {
  data: graphql`
    fragment LocationsPaginatedRefetch_data on RootQuery
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 20 }
        after: { type: "String" }
      )
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

# @defer, @stream, @stream_connection

TODO

- https://github.com/mrtnzlml/relay/pull/172/commits
- https://github.com/facebook/relay/commit/225cfb60cccdbb649ab16a13ed607de749992d21

# @inline ???

```js
/**
 * A transform that converts fragment spreads where the referenced fragment
 * is annotated with @inline to a InlineDataFragmentSpread.
 * InlineDataFragmentSpreads have the selections of the referenced fragment inlined.
 */
```

- https://github.com/facebook/relay/commit/68745c719401c3be01d022f1617525daac69cfa1
- https://github.com/mrtnzlml/relay/pull/442/commits

# Uploadables

Sending normal GraphQL mutation is trivial:

```js
commitMutation(graphql`
  mutation TestMutation {
    test(input: "test")
  }
`);
```

It sends POST request with these headers:

```http
Accept: application/json
Content-type: application/json
User-Agent: Mozilla/5.0
 ...
```

And with this request payload:

```json
{"query":"mutation TestMutation {\n  test(input: \"test\")\n}\n","variables":{}}
```

We can use the same POST request to send our files as well. To do so, you have to use uploadables from Relay and `multipart/form-data` content type. Mutation is similar:

```js
commitMutation(
  graphql`
    mutation TestMutation {
      test(input: "test")
    }
  `,
  {
    uploadables: {
      file1: new File(["foo"], "foo.txt", {
        type: "text/plain"
      }),
      file2: new File(["bar"], "bar.txt", {
        type: "text/plain"
      })
    }
  }
);
```

With these headers:

```http
Accept: */*
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryshXxygBlT4ATOyhW
User-Agent: Mozilla/5.0
 ...
```

And with these form data:

```
------WebKitFormBoundaryshXxygBlT4ATOyhW
Content-Disposition: form-data; name="query"

mutation TestMutation {
  test(input: "test")
}

------WebKitFormBoundaryshXxygBlT4ATOyhW
Content-Disposition: form-data; name="variables"

{}
------WebKitFormBoundaryshXxygBlT4ATOyhW
Content-Disposition: form-data; name="file1"; filename="foo.txt"
Content-Type: text/plain

foo
------WebKitFormBoundaryshXxygBlT4ATOyhW
Content-Disposition: form-data; name="file2"; filename="bar.txt"
Content-Type: text/plain

bar
------WebKitFormBoundaryshXxygBlT4ATOyhW--
```

Plase note - it's good idea to create GraphQL type representing the file and send it in the query as well. Look at how Absinthe is doing it:

```
$ curl -X POST \\
-F query="{mutation uploadFile(users: \"users_csv\", metadata: \"metadata_json\")" \\
-F users_csv=@users.csv \\
-F metadata_json=@metadata.json \\
localhost:4000/graphql
```

They send the actual files and query as `multipart/form-data` as well but they require the file name (with underscore) in the query and it will fail if these two things do not match. Simple and elegant.

- https://github.com/facebook/relay/issues/1844#issuecomment-316893590
- https://hexdocs.pm/absinthe/file-uploads.html

# RelayNetworkLogger

```js
import RelayNetworkLogger from 'relay-runtime/lib/RelayNetworkLogger'

import fetchFunction from './fetchFunction'
import subscribeFunction from './subscribeFunction'

const fetch = __DEV__
    ? RelayNetworkLogger.wrapFetch(fetchFunction)
    : fetchFunction

const subscribe = __DEV__
    ? RelayNetworkLogger.wrapSubscribe(subscribeFunction)
    : subscribeFunction

const network = Network.create(fetch, subscribe)
const source = new RecordSource()
const store = new Store(source)

const env = new Environment({
  network,
  store
})

export default env
```

# RelayObservable.onUnhandledError

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
