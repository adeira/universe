// @flow

import { fetchQuery as relayFetchQuery } from 'react-relay';
import type { OperationType } from 'relay-runtime';
import type { GraphQLTaggedNode } from '@adeira/relay-runtime';

import type { Environment } from './runtimeTypes.flow';

// https://relay.dev/docs/en/fetch-query
export default function fetchQuery<T: OperationType>(
  environment: Environment,
  query: GraphQLTaggedNode,
  variables: $PropertyType<T, 'variables'>,
  // TODO: cacheConfig (?)
): Promise<$PropertyType<T, 'response'>> {
  return relayFetchQuery(environment, query, variables);
}
