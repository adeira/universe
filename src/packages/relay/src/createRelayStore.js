// @flow

import { RecordSource, Store } from 'relay-runtime';

import type { RecordMap } from './runtimeTypes.flow';

export default function createRelayStore(records: ?RecordMap) {
  const source = new RecordSource(records); // TODO
  return new Store(source, {
    gcReleaseBufferSize: 0, // TODO: use this instead of our burst cache
  });
}
