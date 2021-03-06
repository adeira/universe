// @flow

import { RecordSource, Store, type LogFunction } from 'relay-runtime';

import type { RecordMap, Scheduler, OperationLoader, GetDataID } from './runtimeTypes.flow';

type Options = {|
  gcScheduler?: ?Scheduler,
  operationLoader?: ?OperationLoader,
  getDataID?: ?GetDataID,
  gcReleaseBufferSize?: ?number,
  queryCacheExpirationTime?: ?number,
  log?: ?LogFunction,
|};

export default function createRelayStore(records: ?RecordMap, options?: Options): Store {
  const source = records == null ? new RecordSource() : new RecordSource(records);
  return new Store(source, options);
}
