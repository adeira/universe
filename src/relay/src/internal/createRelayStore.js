// @flow

import { RecordSource, Store, type LogFunction, type OperationLoader } from 'relay-runtime';
import type { GetDataID } from 'relay-runtime/store/RelayResponseNormalizer';
import type { RecordSourceJSON, Scheduler } from 'relay-runtime/store/RelayStoreTypes';

type Options = {
  gcScheduler?: ?Scheduler,
  log?: ?LogFunction,
  operationLoader?: ?OperationLoader,
  getDataID?: ?GetDataID,
  gcReleaseBufferSize?: ?number,
  queryCacheExpirationTime?: ?number,
  shouldProcessClientComponents?: ?boolean,
};

export default function createRelayStore(records: ?RecordSourceJSON, options?: Options): Store {
  const source = records == null ? new RecordSource() : new RecordSource(records);
  return new Store(source, options);
}
