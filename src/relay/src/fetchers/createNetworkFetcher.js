// @flow strict-local

import fetchWithRetries from '@adeira/fetch';
import { invariant } from '@adeira/js';
import type { Variables } from '@adeira/relay-runtime';

import { handleData, getRequestBody, getHeaders } from '../helpers';
import type { RequestNode, Uploadables } from '../types.flow';

type Headers = {
  +[string]: string,
  +'X-Client': string,
  ...
};

type AdditionalHeaders = Headers | Promise<Headers>;
type RefetchConfig = {|
  +fetchTimeout?: number,
  +retryDelays?: $ReadOnlyArray<number>,
|};

export default function createNetworkFetcher(
  graphQLServerURL: string,
  additionalHeaders: AdditionalHeaders,
  refetchConfig?: RefetchConfig,
): (
  request: RequestNode,
  variables: Variables,
  uploadables: ?Uploadables,
) => Promise<$FlowFixMe | string> {
  return async function fetch(request, variables, uploadables) {
    const body = getRequestBody(request, variables, uploadables);

    // sometimes it's necessary to get headers asynchronously (while refreshing authorization
    // token for example) - for this reason we accept object or promise here and we always
    // resolve it as a promise (see tests)
    const resolvedAdditionalHeaders = await Promise.resolve(additionalHeaders);
    /* $FlowFixMe[cannot-spread-indexer](>=0.123.0) This comment suppresses an error when upgrading
     * Flow. To see the error delete this comment and run Flow. */
    const headers = {
      ...getHeaders(uploadables),
      ...resolvedAdditionalHeaders,
    };

    invariant(
      headers['X-Client'],
      'You have to set X-Client header to be able to send GraphQL queries. This header identifies the client application so GraphQL maintainers know who is sending the request.',
    );

    const response = await fetchWithRetries(graphQLServerURL, {
      method: 'POST',
      headers,
      body,
      ...refetchConfig,
    });

    return handleData(response);
  };
}
