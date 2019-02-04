TODO: distribute it with correct Flow types

- [Relay Docs](https://facebook.github.io/relay/docs/en/introduction-to-relay.html)
- [Relay Modern Network Deep Dive](https://medium.com/entria/relay-modern-network-deep-dive-ec187629dfd3) (big inspiration)
- https://github.com/mrtnzlml/meta/blob/master/relay.md

This package is **Opinionated Relay Environment**. Goal of this package is to create powerful yet
simple to use Relay Environment with all the important features:

- query logging during development
- network fetching with retries and timeouts (see `@kiwicom/fetch`)
- support for uploadables
- request burst cache (response cache)
- batch requests

Minimal example:

```js
import { createEnvironment, createNetworkFetcher } from '@kiwicom/relay';

module.exports = createEnvironment({
  fetcherFn: createNetworkFetcher('http://127.0.0.1:2048'),
});
```

Please note: this default API is minimalistic on purpose and I will unlock new features only when
necessary.

# TODO

- subscriptions
- deferrable requests (only simple requests allowed now)
- handle partial errors (is it necessary thought? there is RelayNetworkLogger instead)
