// @flow

import { createNetworkFetcher, type Variables } from '@adeira/relay';

import constants from './constants';

type CustomPreloadQuery = { ... };

export default async function relayPreloadQuery(
  { params }: $FlowFixMe,
  variables: Variables,
): Promise<CustomPreloadQuery> {
  const fetch = createNetworkFetcher(constants.graphqlServerURL);
  const response = await fetch(params, variables);

  return {
    params,
    variables,
    response,
  };
}
