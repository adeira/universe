// @flow

import { RelayLogger } from '@adeira/relay-runtime';
import { Network, Environment as RelayEnvironment, ConnectionHandler } from 'relay-runtime';

import createRequestHandler from './createRequestHandler';
import createRelayStore from './createRelayStore';
import type { Environment, RecordMap } from './runtimeTypes.flow';

type Options = {
  +fetchFn: (...args: $ReadOnlyArray<any>) => any,
  +subscribeFn?: (...args: $ReadOnlyArray<any>) => any,
  +handlerProvider?: string => void,
  +operationLoader?: {
    // TODO: verify if the type is correct
    +get: string => Promise<?NormalizationSplitOperation>,
    +load: string => Promise<?NormalizationSplitOperation>,
  },
  +records?: ?RecordMap,
  +gcReleaseBufferSize?: ?number,
};

type NormalizationSplitOperation = {
  +kind: 'SplitOperation',
  +name: string,
  +metadata: ?{ +[key: string]: mixed, ... },
  +selections: $FlowFixMe,
};

function createNetwork(
  fetchFn: (...args: $ReadOnlyArray<any>) => any,
  subscribeFn?: (...args: $ReadOnlyArray<any>) => any,
) {
  const fetch = createRequestHandler(fetchFn);
  return Network.create(fetch, subscribeFn);
}

function handlerProvider(handle) {
  // ViewerHandler missing on purpose (it's deprecated?)
  if (handle === 'connection') {
    return ConnectionHandler;
  }
  throw new Error(`handlerProvider: No handler provided for ${handle}`);
}

export default function createEnvironment(options: Options): Environment {
  const { fetchFn, subscribeFn, records, ...rest } = options;
  return new RelayEnvironment({
    handlerProvider,
    network: createNetwork(fetchFn, subscribeFn),
    log: RelayLogger,
    store: createRelayStore(records, {
      gcReleaseBufferSize: options.gcReleaseBufferSize,
    }),
    ...rest,
  });
}
