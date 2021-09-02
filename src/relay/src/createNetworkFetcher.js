// @flow strict-local

import fetchWithRetries from '@adeira/fetch';
import type { UploadableMap, Variables } from 'relay-runtime';

import { handleData, getRequestBody, getHeaders } from './helpers';

type Headers = {
  +[key: string]: string,
};

type AdditionalHeaders = Headers | Promise<Headers>;
type RefetchConfig = {
  +fetchTimeout?: number,
  +retryDelays?: $ReadOnlyArray<number>,
};

export default function createNetworkFetcher(
  graphQLServerURL: string,
  additionalHeaders?: AdditionalHeaders,
  refetchConfig?: RefetchConfig,
): (
  request: $FlowFixMe,
  variables: Variables,
  uploadables: ?UploadableMap,
) => Promise<$FlowFixMe | string> {
  return async function fetch(request, variables, uploadables) {
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
      ...refetchConfig,
    });

    return handleData(response);
  };
}
