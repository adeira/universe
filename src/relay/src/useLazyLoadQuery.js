// @flow

import { useLazyLoadQuery as _useLazyLoadQuery } from 'react-relay';
import type {
  CacheConfig,
  FetchPolicy,
  GraphQLTaggedNode,
  OperationType,
  RenderPolicy,
  VariablesOf,
} from 'relay-runtime';

// The Flow types should be almost identical except we allow skipping variables.
export default function useLazyLoadQuery<TQuery: OperationType>(
  gqlQuery: GraphQLTaggedNode,
  variables?: VariablesOf<TQuery>,
  options?: {
    fetchKey?: string | number,
    fetchPolicy?: FetchPolicy,
    networkCacheConfig?: CacheConfig,
    UNSTABLE_renderPolicy?: RenderPolicy,
  },
): TQuery['response'] {
  return _useLazyLoadQuery(gqlQuery, variables ?? {}, options);
}
