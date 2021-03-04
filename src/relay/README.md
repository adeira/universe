This package is **opinionated Relay wrapper** used in the Adeira ecosystem. Goal of this package is to create powerful yet simple to use Relay wrapper with all the important features:

- query logging during development
- network fetching with retries and timeouts (see [`@adeira/fetch`](https://github.com/adeira/universe/tree/master/src/fetch))
- support for files uploading via GraphQL
- stored operations (known as persistent queries)
- correct Relay environment context handling
- Flow types and best practices included!

More info about Relay, prior art:

- [Relay Docs](https://relay.dev/docs/en/introduction-to-relay)
- [Relay Modern Network Deep Dive](https://medium.com/entria/relay-modern-network-deep-dive-ec187629dfd3)
- [Advanced Relay topics](https://mrtnzlml.com/docs/relay)
- [Relay Example](https://github.com/adeira/relay-example)

# Install

**Please read this carefully.**

Before you start you should uninstall _all_ the Relay related packages you installed manually (Relay runtime, compiler, `react-relay` and `babel-plugin-relay`). You should also remove custom `flow-typed` definitions for Relay. This package takes care about everything you need.

```text
yarn add react graphql @adeira/relay
```

# Usage

Usage is the same as with original Relay: first you should setup [Relay babel plugin](https://relay.dev/docs/en/installation-and-setup#set-up-babel-plugin-relay) and then [Relay compiler](https://relay.dev/docs/en/installation-and-setup#set-up-relay-compiler) (we prefer our own Compiler implementation, see below). It's important to note that the only package related to Relay you need to install is `@adeira/relay`. It contains all the necessary dependencies.

Minimal `.babelrc` file:

```json
{
  "plugins": ["relay"]
}
```

Minimal Relay compiler script in `package.json` (see below how to download the GraphQL schema and for more info about `relay.config.js`):

```json
{
  "scripts": {
    "relay": "adeira-relay-compiler --src=./src --schema=./schema.graphql"
  }
}
```

In the previous example we used `--schema` in order to use Relay compiler. This package provides a way how to download it easily:

```text
$ yarn adeira-fetch-schema --help

Usage: fetch-schema [options]

Options:
  --resource <url>
  --filename <path>   (default: "schema.graphql")
  -h, --help         output usage information
```

There are a few additional rules to make sure everything goes smoothly:

- you should always use `@adeira/relay` package and never Relay dependencies directly
- do not import internals of this package (no `@adeira/relay/something/private.js`)
- please contact us directly in case something is problematic

Please continue reading to discover `@adeira/relay` specifics.

# Minimal example

```js
import * as React from 'react';
import { graphql, QueryRenderer } from '@adeira/relay';
import type { AppQueryResponse } from './__generated__/AppQuery.graphql';

function handleResponse(props: AppQueryResponse) {
  const edges = props.allLocations?.edges ?? [];
  return (
    <ol>
      {edges.map(edge => (
        <li key={edge?.node?.id}>{edge?.node?.name}</li>
      ))}
    </ol>
  );
}

export default function App(props) {
  return (
    <QueryRenderer
      environment={ ... } // see below
      query={graphql`
        query AppQuery {
          allLocations(first: 20) {
            edges {
              node {
                id
                name
              }
            }
          }
        }
      `}
      onSystemError={({ error, retry }) => console.error(error)} // optional (Sentry maybe?)
      onLoading={() => <div>Loading...</div>} // optional
      onResponse={handleResponse}
    />
  );
}
```

This API is high-level on purpose but it's possible to decompose it when you need something more advanced (custom `Environment` for example). However, even the decomposed parts are still very opinionated and new features are being unlocked only when necessary.

# Detailed info

## Relay Compiler

_Missing some info in docs? Please send a pull request._

We use our own `adeira-relay-compiler` which adds some additional features:

- it outputs ES6 modules
- it supports several implementations of persistent queries
- and most importantly it wraps the default compiler so we can experiment with it

This compiler supports configuration options via `relay.config.js`. Simply place it somewhere in the root of your project and configure it:

```js
module.exports = {
  src: './src',
  schema: './schema.graphql',

  // These are optional:
  include: ['**'],
  exclude: ['**'],
  artifactDirectory: null,
};
```

These options are being consumed by Relay Compiler as well as `babel-plugin-relay`. Therefore, it serves as a centralized point for configuration and all the tools and editors can (should) use it. It's a preferred way how to configure your Relay applications.

Relay config uses [cosmiconfig](https://www.npmjs.com/package/cosmiconfig) behind the scenes.

## Environment

The default `QueryRenderer` expects environment provided via `RelayEnvironmentProvider` or being set via `environment` property. This is how you create your own environment:

```js
import { createEnvironment, createNetworkFetcher } from '@adeira/relay';

const Environment = createEnvironment({
  fetchFn: createNetworkFetcher('https://graphql.kiwi.com', {
    'X-Client': '** TODO **',
  }),
  // subscribeFn
  // ...
});
```

This way you can change the URL or provide additional headers (`X-Client` is required in `createNetworkFetcher`). You can even replace the whole network fetcher if you want (not recommended). As you can see the high-level API decomposes nicely: it allows you to start quickly with a solid base but you can also use very specific features to your application if you want to. But please, consider if these features could be beneficial even for other users and maybe contribute them back.

Now, just use the created environment:

```js
export default function App() {
  return (
    <QueryRenderer
      environment={Environment} // <<<
      query={graphql` ... `}
      onResponse={handleResponse}
    />
  );
}
```

There is also a `RelayEnvironmentProvider` component which allows you to provide the `Environment` easily for the whole application:

```js
function render() {
  return (
    <RelayEnvironmentProvider environment={Environment}>
      {/* your React application here */}
    </RelayEnvironmentProvider>
  );
}
```

Query Renderer itself also behaves as an environment provider and it will reuse the environment from `RelayEnvironmentProvider` if you used it in the root of your application. Here are some use-cases sorted from the most recommended one (REP is Relay Environment Provider, (L)QR is (Local) Query Renderer):

1. `<REP environment={env}> <QR /> </REP>` - set environment only in the provider and avoid setting it on QR
2. `<QR environment={env}/>` - do not use env provider at all and use only QR (handy for tiny applications)
3. `<REP environment={env}/>` - do not use QR at all (handy if you don't need to render but only access the env somewhere)

### Tip: do not expose global `Environment`

You should never import your custom environment directly when working with mutations or subscriptions. Always use the environment provided in the props (exposed by any Relay container):

```js
import {
  type RelayProp, // or `PaginationRelayProp` or `RefetchRelayProp` types
} from '@adeira/relay';

type Props = {| +relay: RelayProp |};

function Component(props: Props) {
  useEffect(() => {
    commitMutation(props.relay.environment, { mutation: graphql` ... ` });
  });
}
```

Only this way you can be sure that your mutation/subscription is using correct environment. This common bug is usually not very visible but it's very serious when you have multiple environments in your application.

How to get environment when your component needs it for mutations for example and there is no `props.relay`? Simply use `useRelayEnvironment` hook. This hook can be used anywhere below Query Renderer or `RelayEnvironmentProvider` component in the React tree:

```js
import { useRelayEnvironment } from '@adeira/relay';

function Component() {
  const environment = useRelayEnvironment();
  // TODO: do something with the env (call mutation for example)
}
```

Do not use your own Relay context! Our environment provider as well as the hook are integrated with Relay core.

## Query Renderer

Query renderer behaves similarly to the default one in Relay except it exposes some additional high level API. It's certainly possible to override the and `render` property just like `environment`. However, please note that `render` property has priority over `onSystemError`, `onLoading` and `onResponse`. It's not recommended to use it unless you need something really special because these preferred 3 props solve majority of the cases.

```js
export default function App() {
  return (
    <QueryRenderer
      environment={Environment}
      query={graphql` ... `}
      render={({ error, props, retry }) => {
        /* TODO */
      }}
    />
  );
}
```

### Tip: use custom `QueryRenderer` wrapper

It's a good idea to create a custom wrapper of the `QueryRenderer` so you don't have to copy-paste it everywhere. This could be your new API (no loading or system error handlers):

```js
export default function App() {
  return (
    <CustomQueryRenderer
      query={graphql`
        query AppQuery {
          ...AllLocations_data
        }
      `}
      render={(props) => null} // TODO (handleResponse)
    />
  );
}
```

## Refetch container

Refetch container is the best when you are changing variables in the component fragment or just simply refetching. Typical example is search or bi-directional pagination. Simply import the HoC as well as the refetch Flow type:

```js
import { graphql, createRefetchContainer, type RefetchRelayProp } from '@adeira/relay';
```

Usage:

```js
export default createRefetchContainer(
  Component,
  /* TODO: refetch fragments */,
  /* TODO: refetch query */
);
```

And later you can call the refetch function:

```js
function loadMore() {
  // property `relay` should be annotated with the `RefetchRelayProp` type
  props.relay.refetch(/* TODO: refetchVariables */);
}
```

Similar rules apply to pagination container which solves one particular use-case of refetch container: "load more" pagination. The difference is that you have to use `type PaginationRelayProp` instead.

## Lazy, Eager and Debug logger

You can change rich log output into browser console like so (the default is `RelayLazyLogger`):

```js
import {
  RelayLazyLogger, // less verbose, waits for operations to complete
  RelayEagerLogger, // more verbose, logs events as they arrive
  RelayDebugLogger, // very verbose, logs everything
} from '@adeira/relay';

const Environment = createEnvironment({
  log: RelayLazyLogger, // or RelayEagerLogger or RelayDebugLogger
  // …
});
```

The logs are being printed only during development.
