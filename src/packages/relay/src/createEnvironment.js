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
  +fetcherFn: Function,
  +subscribeFn?: Function,
  +handlerProvider?: string => void,
|};

// TODO: only graphql.kiwi.com?
// function graphiQLPrinter(request, variables) {
//   return `https://graphql.kiwi.com/?query=${encodeURIComponent(request.text)}`;
// }

function createNetwork(fetchFn: Function, subscribeFn?: Function) {
  const fetch = createRequestHandler(fetchFn);
  return __DEV__
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
  const { fetcherFn, subscribeFn, ...rest } = options;
  return new Environment({
    handlerProvider,
    network: createNetwork(fetcherFn, subscribeFn),
    store,
    ...rest,
  });
};
