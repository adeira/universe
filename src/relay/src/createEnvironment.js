// @flow

import { RelayLogger } from '@adeira/relay-runtime';
import { Network, Environment as RelayEnvironment, type OperationLoader } from 'relay-runtime';

import createRequestHandler from './createRequestHandler';
import createRelayStore from './createRelayStore';
import type { Environment, RecordMap } from './runtimeTypes.flow';

type Options = {|
  +fetchFn: (...args: $ReadOnlyArray<any>) => any,
  +subscribeFn?: (...args: $ReadOnlyArray<any>) => any,
  +handlerProvider?: (string) => void,
  +operationLoader?: OperationLoader,
  +records?: ?RecordMap,
  +gcReleaseBufferSize?: ?number,
|};

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
    store: createRelayStore(records, {
      gcReleaseBufferSize: gcReleaseBufferSize,
    }),
    ...rest,
  });
}
