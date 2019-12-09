// @flow

import { RecordSource, Store } from 'relay-runtime';

import type { RecordMap } from './runtimeTypes.flow';

type Options = {|
  +gcReleaseBufferSize?: ?number,
|};
export default function createRelayStore(records: ?RecordMap, options: ?Options) {
  const source = new RecordSource(records);
  return new Store(source, options); // TODO: use this instead of our burst cache
}
