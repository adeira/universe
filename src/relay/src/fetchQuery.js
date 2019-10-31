// @flow

import { fetchQuery as relayFetchQuery } from 'react-relay';

import type { GraphQLTaggedNode, Variables } from './types.flow';
import type { Environment } from './runtimeTypes.flow';

// https://relay.dev/docs/en/fetch-query
export default function fetchQuery(
  environment: Environment,
  query: GraphQLTaggedNode,
  variables: Variables,
  // TODO: cacheConfig (?)
): Promise<mixed> {
  return relayFetchQuery(environment, query, variables);
}
