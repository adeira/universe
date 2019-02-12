This package is **opinionated Relay wrapper**. Goal of this package is to create powerful yet simple to use Relay wrapper with all the important features:

- query logging during development
- network fetching with retries and timeouts (see `@kiwicom/fetch`)
- support for uploadables
- request burst cache (response cache)
- batch requests
- persistent queries

More info about Relay, prior art:

- [Relay Docs](https://facebook.github.io/relay/docs/en/introduction-to-relay.html)
- [Relay Modern Network Deep Dive](https://medium.com/entria/relay-modern-network-deep-dive-ec187629dfd3)
- [Advanced Relay topics](https://github.com/mrtnzlml/meta/blob/master/relay.md)

# Install

Before you start you should uninstall all the Relay related packages you installed manually (Relay runtime, compiler, `react-relay`). This package takes care about everything you need.

```text
yarn add react @kiwicom/relay
```

# Minimal example

```js
import * as React from 'react';
import { graphql, QueryRenderer } from '@kiwicom/relay';
import type { AppQueryResponse } from '__generated__/AppQuery.graphql';

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

It's also possible to override the `environment` and `render` property. However, please note that `render` property has priority over `onSystemError`, `onLoading` and `onResponse`. It's not recommended to use it unless you need something really special.

# Tips

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
      render={props => null} // TODO (handleResponse)
    />
  );
}
```
