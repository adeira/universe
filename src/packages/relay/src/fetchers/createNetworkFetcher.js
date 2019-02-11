// @flow

import fetchWithRetries from '@kiwicom/fetch';

import { handleData, getRequestBody, getHeaders } from '../helpers';
import type { RequestNode, Uploadables, Variables } from '../types.flow';

type AdditionalHeaders = Object | Promise<Object>;

module.exports = function createNetworkFetcher(
  graphQLServerURL: string,
  additionalHeaders: AdditionalHeaders = {},
) {
  return async function fetch(
    request: RequestNode,
    variables: Variables,
    uploadables: ?Uploadables,
  ) {
    const body = getRequestBody(request, variables, uploadables);

    // sometimes it's necessary to get headers asynchronously (while refreshing authorization
    // token for example) - for this reason we accept object or promise here and we always
    // resolve it as a promise (see tests)
    const resolvedAdditionalHeaders = await Promise.resolve(additionalHeaders);
    const headers = {
      ...getHeaders(uploadables),
      ...resolvedAdditionalHeaders,
    };

    const response = await fetchWithRetries(graphQLServerURL, {
      method: 'POST',
      headers,
      body,
    });

    return handleData(response);
  };
};
