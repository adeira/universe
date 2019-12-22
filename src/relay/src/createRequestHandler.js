// @flow

import { Observable } from 'relay-runtime';

import type { RequestNode, Uploadables, Variables } from './types.flow';

export type CacheConfig = {|
  +force?: ?boolean,
|};

type GraphQLResponse = {|
  +data?: null | { [key: string]: any, ... },
  +errors?: $ReadOnlyArray<{ [key: string]: any, ... }>,
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

export default function createRequestHandler(customFetcher: (...args: $ReadOnlyArray<any>) => any) {
  function cleanup() {
    // noop, do anything here
  }

  return function handleRequest(
    requestNode: RequestNode,
    variables: Variables,
    cacheConfig: CacheConfig,
    uploadables: ?Uploadables,
  ) {
    return Observable.create((sink: Sink) => {
      customFetcher(requestNode, variables, uploadables)
        .then(response => {
          if (response.errors) {
            // What should we do with these partial errors?
            // eslint-disable-next-line no-console
            response.errors.map(error => console.warn(error.message, error));
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
}
