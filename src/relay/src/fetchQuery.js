// @flow

import { fetchQuery_DEPRECATED as relayFetchQuery, type Environment } from 'react-relay';
import type { OperationType, GraphQLTaggedNode } from 'relay-runtime';

// https://relay.dev/docs/en/fetch-query
export default function fetchQuery<T: OperationType>(
  environment: Environment,
  query: GraphQLTaggedNode,
  variables: $PropertyType<T, 'variables'>,
  // TODO: cacheConfig (?)
): Promise<$PropertyType<T, 'response'>> {
  return relayFetchQuery(environment, query, variables);
}
