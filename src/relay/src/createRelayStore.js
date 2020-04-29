// @flow

import { RecordSource, Store } from 'relay-runtime';

import type { RecordMap } from './runtimeTypes.flow';

type Options = {|
  +gcReleaseBufferSize?: ?number,
|};

export default function createRelayStore(records: ?RecordMap, options: ?Options) {
  // $FlowFixMe errors after upgrading to relay 9.1.0
  const source = new RecordSource(records);
  // $FlowFixMe errors after upgrading to relay 9.1.0
  return new Store(source, options);
}
