An opinionated Relay Runtime wrapper with nice query logging.

## Install

`yarn add @adeira/relay-runtime`

## Usage

TKTK

### Lazy, Eager and Debug logger

You can enable rich log output into browser console like so:

```js
import {
  RelayLazyLogger, // less verbose, waits for operations to complete
  RelayEagerLogger, // more verbose, logs events as they arrive
  RelayDebugLogger, // very verbose, logs everything
} from '@adeira/relay-runtime';

return new Environment({
  log: RelayLazyLogger, // or RelayEagerLogger or RelayDebugLogger
  // network: ...,
  // store: ...,
});
```

The logs are being printed only during development.
