// @flow

import {
  RecordSource,
  Store,
  Network,
  Environment as RelayEnvironment,
  ConnectionHandler,
  createRelayNetworkLogger,
  RelayNetworkLoggerTransaction,
} from 'relay-runtime';

import createRequestHandler from './createRequestHandler';
import type { Variables } from './types.flow';
import type { Environment } from './runtimeTypes.flow';

type Options = {|
  +fetchFn: (...args: $ReadOnlyArray<any>) => any,
  +subscribeFn?: (...args: $ReadOnlyArray<any>) => any,
  +handlerProvider?: string => void,
  +operationLoader?: {|
    // TODO: verify if the type is correct
    get: string => Promise<?NormalizationSplitOperation>,
    load: string => Promise<?NormalizationSplitOperation>,
  |},
  // enables/disables `RelayNetworkLogger`
  +logger?: boolean,
  +graphiQLPrinter?: (request: { +text: string, ... }, variables: Variables) => string,
  +records?: ?{ ... },
|};

type NormalizationSplitOperation = {|
  +kind: 'SplitOperation',
  +name: string,
  +metadata: ?{ +[key: string]: mixed, ... },
  +selections: $FlowFixMe,
|};

function createNetwork(
  fetchFn: (...args: $ReadOnlyArray<any>) => any,
  subscribeFn?: (...args: $ReadOnlyArray<any>) => any,
  enableLogger: boolean,
  graphiQLPrinter,
) {
  const fetch = createRequestHandler(fetchFn);
  if (enableLogger && __DEV__) {
    const RelayNetworkLogger = createRelayNetworkLogger(RelayNetworkLoggerTransaction);
    return Network.create(
      RelayNetworkLogger.wrapFetch(fetch, graphiQLPrinter),
      RelayNetworkLogger.wrapSubscribe(subscribeFn, graphiQLPrinter),
    );
  }
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
  const { fetchFn, subscribeFn, logger, graphiQLPrinter, records, ...rest } = options;
  const enableLogger = logger ?? true;
  const source = new RecordSource(records); // TODO
  const store = new Store(source);
  return new RelayEnvironment({
    handlerProvider,
    network: createNetwork(fetchFn, subscribeFn, enableLogger, graphiQLPrinter),
    store,
    ...rest,
  });
}
