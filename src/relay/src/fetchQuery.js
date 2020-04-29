// @flow

import { fetchQuery as relayFetchQuery } from 'react-relay';
import type { Variables } from '@adeira/relay-runtime';

import type { GraphQLTaggedNode } from './types.flow';
import type { Environment } from './runtimeTypes.flow';

// https://relay.dev/docs/en/fetch-query
export default function fetchQuery(
  environment: Environment,
  query: GraphQLTaggedNode,
  variables: Variables,
  // TODO: cacheConfig (?)
): Promise<mixed> {
  // $FlowFixMe errors after upgrading to relay 9.1.0
  return relayFetchQuery(environment, query, variables);
}
