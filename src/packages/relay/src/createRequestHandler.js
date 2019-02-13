// @flow

import { Observable } from 'relay-runtime';
import RelayQueryResponseCache from 'relay-runtime/lib/RelayQueryResponseCache';

import { forceFetch, isMutation, isQuery } from './helpers';
import type {
  CacheConfig,
  RequestNode,
  Uploadables,
  Variables,
} from './types.flow';

const burstCache = new RelayQueryResponseCache({
  size: 250,
  ttl: 10 * 1000, // 10 seconds
});

type GraphQLResponse = {|
  +data?: null | Object,
  +errors?: $ReadOnlyArray<Object>,
|};

/**
 * A Sink is an object of methods provided by Observable during construction.
 * The methods are to be called to trigger each event. It also contains a closed
 * field to see if the resulting subscription has closed.
 */
type Sink = {|
  +next: GraphQLResponse => void,
  +error: (Error, isUncaughtThrownError?: boolean) => void,
  +complete: () => void,
  +closed: boolean,
|};

module.exports = function createRequestHandler(customFetcher: Function) {
  function cleanup() {
    // noop, do anything here
  }

  return function handleRequest(
    requestNode: RequestNode,
    variables: Variables,
    cacheConfig: CacheConfig,
    uploadables: ?Uploadables,
  ) {
    if (__DEV__) {
      Observable.onUnhandledError((error, isUncaughtThrownError) => {
        console.error(error); // eslint-disable-line no-console
      });
    }

    return Observable.create((sink: Sink) => {
      const queryID = requestNode.text;

      if (isMutation(requestNode)) {
        // mutations should always erase burst cache
        burstCache.clear();
      } else {
        // otherwise we'll try to read from the burst cache and return without
        // any additional fetching
        const fromCache = burstCache.get(queryID, variables);
        if (
          isQuery(requestNode) &&
          fromCache !== null &&
          !forceFetch(cacheConfig)
        ) {
          sink.next(fromCache);
          sink.complete();
          return cleanup; // that's it - we are done here (no network call)
        }
      }

      // this should be executed only when the request is a mutation or
      // when there is no content in the burst cache
      customFetcher(requestNode, variables, uploadables)
        .then(response => {
          if (response.errors) {
            // What should we do with these partial errors?
            // eslint-disable-next-line no-console
            response.errors.map(error => console.error(error.message, error));

            if (isMutation(requestNode)) {
              // errors during mutations are serious business so we should stop
              sink.error(response);
              sink.complete();
            }
          } else {
            // set burst cache only if there are no errors
            burstCache.set(queryID, variables, response);
          }

          sink.next(response);
          sink.complete();
        })
        .catch(error => {
          sink.error(error);
          sink.complete();
        });

      return cleanup;
    });
  };
};
