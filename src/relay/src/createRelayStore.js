// @flow

import { RecordSource, Store } from 'relay-runtime';

import type { RecordMap, Scheduler, OperationLoader, GetDataID } from './runtimeTypes.flow';

type Options = {|
  gcScheduler?: ?Scheduler,
  operationLoader?: ?OperationLoader,
  UNSTABLE_DO_NOT_USE_getDataID?: ?GetDataID,
  gcReleaseBufferSize?: ?number,
  queryCacheExpirationTime?: ?number,
|};

export default function createRelayStore(records: ?RecordMap, options?: Options) {
  const source = records == null ? new RecordSource() : new RecordSource(records);
  return new Store(source, options);
}
