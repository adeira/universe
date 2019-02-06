- [Relay Docs](https://facebook.github.io/relay/docs/en/introduction-to-relay.html)
- [Relay Modern Network Deep Dive](https://medium.com/entria/relay-modern-network-deep-dive-ec187629dfd3) (big inspiration)
- https://github.com/mrtnzlml/meta/blob/master/relay.md

This package is **opinionated Relay wrapper**. Goal of this package is to create powerful yet simple to use Relay wrapper with all the important features:

- query logging during development
- network fetching with retries and timeouts (see `@kiwicom/fetch`)
- support for uploadables
- request burst cache (response cache)
- batch requests

Minimal example of `Environment.js`:

```js
import { createEnvironment, createNetworkFetcher } from '@kiwicom/relay';

module.exports = createEnvironment({
  fetcherFn: createNetworkFetcher('https://graphql.kiwi.com'),
});
```

Please note: this default API is minimalistic on purpose and I will unlock new features only when necessary.
