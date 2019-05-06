// @flow

import {
  RecordSource,
  Store,
  Network,
  Environment,
  ConnectionHandler,
} from 'relay-runtime';
import RelayNetworkLogger from 'relay-runtime/lib/RelayNetworkLogger';

import createRequestHandler from './createRequestHandler';

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
|};

type NormalizationSplitOperation = {|
  +kind: 'SplitOperation',
  +name: string,
  +metadata: ?{ +[key: string]: mixed },
  +selections: $FlowFixMe,
|};

// TODO: only graphql.kiwi.com?
// function graphiQLPrinter(request, variables) {
//   return `https://graphql.kiwi.com/?query=${encodeURIComponent(request.text)}`;
// }

function createNetwork(
  fetchFn: Function,
  subscribeFn?: Function,
  enableLogger: boolean = true,
) {
  const fetch = createRequestHandler(fetchFn);
  return enableLogger && __DEV__
    ? Network.create(
        RelayNetworkLogger.wrapFetch(fetch /* , graphiQLPrinter */),
        RelayNetworkLogger.wrapSubscribe(subscribeFn),
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

module.exports = function createEnvironment(options: Options) {
  const { fetchFn, subscribeFn, logger, ...rest } = options;
  return new Environment({
    handlerProvider,
    network: createNetwork(fetchFn, subscribeFn, logger),
    store,
    ...rest,
  });
};
