// @flow

import { fetchQuery as relayFetchQuery } from 'react-relay';

import type { Environment, GraphQLTaggedNode, Variables } from './types.flow';

// https://relay.dev/docs/en/fetch-query
export default function fetchQuery(
  environment: Environment,
  query: GraphQLTaggedNode,
  variables: Variables,
  // TODO: cacheConfig (?)
): Promise<mixed> {
  return relayFetchQuery(environment, query, variables);
}
