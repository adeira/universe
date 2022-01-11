// @flow

import {
  Network,
  Environment as RelayEnvironment,
  type Environment,
  type LogFunction,
  type OperationLoader,
} from 'relay-runtime';
import type { RecordObjectMap } from 'relay-runtime/store/RelayStoreTypes';

import createRelayStore from './createRelayStore';
import createRequestHandler from './createRequestHandler';
import { RelayLogger, RelayRequiredFieldLogger } from './RelayLogger';

type Options = {
  +fetchFn: (...args: $ReadOnlyArray<any>) => any,
  +subscribeFn?: (...args: $ReadOnlyArray<any>) => any,
  +handlerProvider?: (string) => void,
  +operationLoader?: OperationLoader,
  +records?: ?RecordObjectMap,
  +gcReleaseBufferSize?: ?number,
  +log?: LogFunction,
};

function createNetwork(
  fetchFn: (...args: $ReadOnlyArray<any>) => any,
  subscribeFn?: (...args: $ReadOnlyArray<any>) => any,
) {
  const fetch = createRequestHandler(fetchFn);
  return Network.create(fetch, subscribeFn);
}

export default function createEnvironment(options: Options): Environment {
  const { fetchFn, subscribeFn, records, gcReleaseBufferSize, ...rest } = options;
  return new RelayEnvironment({
    network: createNetwork(fetchFn, subscribeFn),
    log: RelayLogger,
    requiredFieldLogger: RelayRequiredFieldLogger,
    store: createRelayStore(records, {
      gcReleaseBufferSize: gcReleaseBufferSize,
    }),
    ...rest,
  });
}
