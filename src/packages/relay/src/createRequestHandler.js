// @flow

import Runtime from 'relay-runtime';
import RelayQueryResponseCache from 'relay-runtime/lib/RelayQueryResponseCache';

import { forceFetch, isMutation, isQuery } from './helpers';
import type {
  CacheConfig,
  RequestNode,
  Sink,
  Uploadables,
  Variables,
} from './types.flow';

const burstCache = new RelayQueryResponseCache({
  size: 250,
  ttl: 60 * 1000, // one minute
});

async function execute(
  customFetcher: Function,
  requestNode: RequestNode,
  variables: Variables,
  cacheConfig: CacheConfig,
  uploadables: ?Uploadables,
  sink: Sink,
  complete: boolean = false,
) {
  try {
    const data = await customFetcher(requestNode, variables, uploadables);

    if (data.errors) {
      // What should we do with these partial errors?
      // eslint-disable-next-line no-console
      data.errors.map(error => console.error(error.message, error));
    }

    if (isMutation(requestNode) && data.errors) {
      sink.error(data);

      if (complete) {
        sink.complete();
      }

      throw data;
    }

    sink.next({
      operation: requestNode.operation,
      variables,
      response: data,
    });

    if (complete) {
      sink.complete();
    }

    return {
      operation: requestNode.operation,
      variables,
      response: data,
    };
  } catch (e) {
    sink.error(e);
    return undefined;
  }
}

async function processRequest(
  customFetcher: Function,
  requestNode: RequestNode,
  variables: Variables,
  cacheConfig: CacheConfig,
  uploadables: ?Uploadables,
  sink: Sink,
  complete: boolean = false,
) {
  const queryID = requestNode.text;

  if (isMutation(requestNode)) {
    burstCache.clear();
    return execute(
      customFetcher,
      requestNode,
      variables,
      cacheConfig,
      uploadables,
      sink,
      complete,
    );
  }

  const fromCache = burstCache.get(queryID, variables);
  if (isQuery(requestNode) && fromCache !== null && !forceFetch(cacheConfig)) {
    sink.next(fromCache);
    if (complete) {
      sink.complete();
    }
    return fromCache;
  }

  const fromServer = await execute(
    customFetcher,
    requestNode,
    variables,
    cacheConfig,
    uploadables,
    sink,
    complete,
  );
  if (fromServer) {
    burstCache.set(queryID, variables, fromServer);
  }

  return fromServer;
}

module.exports = function createRequestHandler(customFetcher: Function) {
  return function handleRequest(
    requestNode: RequestNode,
    variables: Variables,
    cacheConfig: CacheConfig,
    uploadables: ?Uploadables,
  ) {
    return Runtime.Observable.create(sink => {
      processRequest(
        customFetcher,
        requestNode,
        variables,
        cacheConfig,
        uploadables,
        sink,
        true,
      );
    });
  };
};
