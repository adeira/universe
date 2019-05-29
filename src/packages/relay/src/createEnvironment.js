// @flow

import {
  RecordSource,
  Store,
  Network,
  Environment as RelayEnvironment,
  ConnectionHandler,
} from 'relay-runtime';
import RelayNetworkLogger from 'relay-runtime/lib/RelayNetworkLogger';

import createRequestHandler from './createRequestHandler';
import type { Variables, Environment } from './types.flow';

// we usually copy-paste this everywhere
const source = new RecordSource();
const store = new Store(source);

type Options = {|
  +fetchFn: Function,
  +subscribeFn?: Function,
  +handlerProvider?: string => void,
  +operationLoader?: {|
    // TODO: verify if the type is correct
    get: string => Promise<?NormalizationSplitOperation>,
    load: string => Promise<?NormalizationSplitOperation>,
  |},

  // enables/disables `RelayNetworkLogger`
  +logger?: boolean,
  +graphiQLPrinter?: (
    request: { +text: string, ... },
    variables: Variables,
  ) => string,
|};

type NormalizationSplitOperation = {|
  +kind: 'SplitOperation',
  +name: string,
  +metadata: ?{ +[key: string]: mixed, ... },
  +selections: $FlowFixMe,
|};

function createNetwork(
  fetchFn: Function,
  subscribeFn?: Function,
  enableLogger: boolean = true,
  graphiQLPrinter,
) {
  const fetch = createRequestHandler(fetchFn);
  return enableLogger && __DEV__
    ? Network.create(
        RelayNetworkLogger.wrapFetch(fetch, graphiQLPrinter),
        RelayNetworkLogger.wrapSubscribe(subscribeFn, graphiQLPrinter),
      )
    : Network.create(fetch, subscribeFn);
}

function handlerProvider(handle) {
  // ViewerHandler missing on purpose (it's deprecated?)
  if (handle === 'connection') {
    return ConnectionHandler;
  }
  throw new Error(`handlerProvider: No handler provided for ${handle}`);
}

module.exports = function createEnvironment(options: Options): Environment {
  const { fetchFn, subscribeFn, logger, graphiQLPrinter, ...rest } = options;
  return new RelayEnvironment({
    handlerProvider,
    network: createNetwork(fetchFn, subscribeFn, logger, graphiQLPrinter),
    store,
    ...rest,
  });
};
