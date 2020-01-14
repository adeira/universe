An opinionated Relay Runtime wrapper.

## Install

`yarn add @adeira/relay-runtime`

## Usage

### Logger

Rich log output into browser console (only in development)

```js
import { RelayLogger } from '@adeira/relay-runtime';

return new Environment({
  log: RelayLogger,
  network: ...,
  store: ...,
});
```
