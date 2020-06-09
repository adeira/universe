// @flow

import { Observable, type CacheConfig } from 'relay-runtime';
import type { Variables, GraphQLResponse } from '@adeira/relay-runtime';

import type { RequestNode, Uploadables } from './types.flow';

/**
 * A Sink is an object of methods provided by Observable during construction.
 * The methods are to be called to trigger each event. It also contains a closed
 * field to see if the resulting subscription has closed.
 */
type Sink = {|
  +next: (GraphQLResponse) => void,
  +error: (Error, isUncaughtThrownError?: boolean) => void,
  +complete: () => void,
  +closed: boolean,
|};

export default function createRequestHandler(customFetcher: (...args: $ReadOnlyArray<any>) => any) {
  function cleanup() {
    // noop, do anything here (called after sink.complete)
  }

  return function handleRequest(
    requestNode: RequestNode,
    variables: Variables,
    cacheConfig: CacheConfig,
    uploadables: ?Uploadables,
  ) {
    return Observable.create((sink: Sink) => {
      customFetcher(requestNode, variables, uploadables)
        .then((response) => {
          if (response.errors) {
            // Relay is currently quite opinionated and recommends to either try to render the data
            // or halt the application. It's a smart decisions since these errors are not for the
            // application users. We conveniently follow this recommendation and always try to
            // render the data. (TODO: allow to log these errors externally)
            //
            // eslint-disable-next-line no-console
            response.errors.map((error) => console.warn(error.message, error));
          }
          sink.next(response);
        })
        .catch((error) => {
          sink.error(error);
        })
        .then(() => {
          sink.complete();
        });

      return cleanup;
    });
  };
}
