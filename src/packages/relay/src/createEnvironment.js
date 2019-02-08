// @flow

import Runtime from 'relay-runtime';
import RelayNetworkLogger from 'relay-runtime/lib/RelayNetworkLogger';

import createRequestHandler from './createRequestHandler';

// we usually copy-paste this everywhere
const source = new Runtime.RecordSource();
const store = new Runtime.Store(source);

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
    ? Runtime.Network.create(
        RelayNetworkLogger.wrapFetch(fetch /* , graphiQLPrinter */),
        RelayNetworkLogger.wrapSubscribe(subscribeFn),
      )
    : Runtime.Network.create(fetch, subscribeFn);
}

module.exports = function createEnvironment(options: Options) {
  const { fetcherFn, subscribeFn, ...rest } = options;
  return new Runtime.Environment({
    network: createNetwork(fetcherFn, subscribeFn),
    store,
    ...rest,
  });
};
