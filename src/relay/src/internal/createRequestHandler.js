// @flow

import {
  Observable,
  type CacheConfig,
  type GraphQLResponse,
  type UploadableMap,
  type Variables,
} from 'relay-runtime';

/**
 * A Sink is an object of methods provided by Observable during construction.
 * The methods are to be called to trigger each event. It also contains a closed
 * field to see if the resulting subscription has closed.
 */
type Sink = {
  +next: (GraphQLResponse) => void,
  +error: (Error, isUncaughtThrownError?: boolean) => void,
  +complete: () => void,
  +closed: boolean,
};

export default function createRequestHandler(
  customFetcher: (...args: $ReadOnlyArray<any>) => any,
): (
  requestNode: $FlowFixMe,
  variables: Variables,
  cacheConfig: CacheConfig,
  uploadables: ?UploadableMap,
) => Observable<GraphQLResponse> {
  return function handleRequest(requestNode, variables, cacheConfig, uploadables) {
    let observable = Observable.create((sink: Sink) => {
      customFetcher(requestNode, variables, uploadables)
        .then((response) => {
          if (response.errors) {
            // There are several ways how to deal with the errors. We choose to always forward the
            // response if possible (via `sink.next`). However, servers can also mark the error as
            // being CRITICAL via `error.extensions.severity` in which case we try to halt the
            // application by propagating the error via `sink.error`.
            response.errors.forEach((error) => {
              // See: https://github.com/facebook/relay/blob/db73f60fd42826c154353874e4bb1c54f0df1867/packages/relay-runtime/network/RelayNetworkTypes.js#L39
              if (error.extensions?.severity === 'CRITICAL') {
                sink.error(new Error(error.message));
              } else {
                // eslint-disable-next-line no-console
                console.warn(error.message, error);
              }
            });
          }
          sink.next(response);
        })
        .catch((error) => {
          sink.error(error);
        })
        .then(() => {
          sink.complete();
        });

      return function cleanup() {
        // noop, do anything here (called after sink.complete or when Relay unsubscribes)
      };
    });

    // Support for `@live_query(polling_interval: 500)` directive:
    if (requestNode?.metadata?.live != null) {
      observable = observable.poll(requestNode.metadata.live.polling_interval);
    }

    return observable;
  };
}
