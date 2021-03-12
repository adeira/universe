// @flow

import { RecordSource, Store, type LogFunction, type OperationLoader } from 'relay-runtime';
// eslint-disable-next-line import/no-unresolved
import type { GetDataID } from 'relay-runtime/store/RelayResponseNormalizer';
// eslint-disable-next-line import/no-unresolved
import type { RecordObjectMap, Scheduler } from 'relay-runtime/store/RelayStoreTypes';

type Options = {|
  gcScheduler?: ?Scheduler,
  operationLoader?: ?OperationLoader,
  getDataID?: ?GetDataID,
  gcReleaseBufferSize?: ?number,
  queryCacheExpirationTime?: ?number,
  log?: ?LogFunction,
|};

export default function createRelayStore(records: ?RecordObjectMap, options?: Options): Store {
  const source = records == null ? new RecordSource() : new RecordSource(records);
  return new Store(source, options);
}
