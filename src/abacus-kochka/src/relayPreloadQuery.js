// @flow

import { createNetworkFetcher, type OperationType } from '@adeira/relay';

import constants from './constants';

export default async function relayPreloadQuery<TQuery: OperationType>(
  { params }: $FlowFixMe,
  variables: TQuery['variables'],
): Promise<{
  +params: $FlowFixMe,
  +variables: TQuery['variables'],
  +response: TQuery['response'],
}> {
  const fetch = createNetworkFetcher(constants.graphqlServerURL);
  const response = await fetch(params, variables);

  return {
    params,
    variables,
    response,
  };
}
