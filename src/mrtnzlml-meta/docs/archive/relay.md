---
id: relay
title: Relay Archive
sidebar_label: Relay Archive
---

:::danger deprecated
This is a collection of outdated sections that are no longer valid or somehow inaccurate. Current docs can be found here: [relay meta](../relay)
:::

## RelayNetworkLogger

:::note
Old RelayNetworkLogger [was removed in Relay 7.0.0](https://github.com/facebook/relay/releases/tag/v7.0.0), and relay-runtime no longer exports createRelayNetworkLogger. This logger is being replaced with event based logging on the Environment which will allow us to have richer and more contextual events logged with more detail on what's going on. Wrapping the actual network request doesn't work well as some "requests" might never actually end up on the network when they can be fulfilled completely from the store.
:::

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

## Relay Compiler WASM & NEON

:::note
As for now, we're not planning on further integration Relay compiler (rust version) with wasm/neon. See: https://github.com/facebook/relay/commit/eefeed15fd51b3042a15e93f0665a680fd8e31b2
:::

TKTK

- WASM: https://github.com/facebook/relay/commit/577745cdc0e015f3c723c02ba3467b5ca7b42b2c
- NEON: https://github.com/facebook/relay/commit/08e012be46c6029abb9cd10b1225f5e2e2881bba (https://neon-bindings.com/docs/intro)
