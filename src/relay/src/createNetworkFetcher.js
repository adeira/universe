// @flow strict-local

import fetchWithRetries from '@adeira/fetch';
import { type UploadableMap, type Variables } from 'relay-runtime';

import relayQueryResponseCache from './internal/QueryResponseCache';
import { handleData, getRequestBody, getHeaders, isQuery } from './internal/helpers';

type Headers = {
  +[key: string]: string,
};

type AdditionalHeaders = Headers | Promise<Headers>;
type FetchConfig = {
  +fetchTimeout?: number,
  +retryDelays?: $ReadOnlyArray<number>,
  +credentials?: 'omit' | 'same-origin' | 'include',
};

export default function createNetworkFetcher(
  graphQLServerURL: string,
  additionalHeaders?: AdditionalHeaders,
  fetchConfig?: FetchConfig,
): (
  request: $FlowFixMe,
  variables: Variables,
  uploadables: ?UploadableMap,
) => Promise<$FlowFixMe | string> {
  return async function fetch(request, variables, uploadables) {
    if (isQuery(request)) {
      // TODO: take into account `cacheConfig.force`
      const fromCache = relayQueryResponseCache.get(request.cacheID, variables);
      if (fromCache != null) {
        return Promise.resolve(fromCache);
      }
    }

    const body = getRequestBody(request, variables, uploadables);

    // sometimes it's necessary to get headers asynchronously (while refreshing authorization
    // token for example) - for this reason we accept object or promise here and we always
    // resolve it as a promise (see tests)
    const resolvedAdditionalHeaders: Headers = (await additionalHeaders) ?? {};
    const headers = {
      ...getHeaders(uploadables),
      ...resolvedAdditionalHeaders,
    };

    const response = await fetchWithRetries(graphQLServerURL, {
      method: 'POST',
      headers,
      body,
      ...fetchConfig,
    });

    return handleData(response);
  };
}
