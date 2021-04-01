// @flow

import { useLazyLoadQuery as _useLazyLoadQuery } from 'react-relay';
import type { CacheConfig, FetchPolicy, Query, RenderPolicy, Variables } from 'relay-runtime';

// The Flow types should be almost identical except we allow skipping variables.
export default function useLazyLoadQuery<TVariables: Variables, TData>(
  gqlQuery: Query<TVariables, TData>,
  variables?: TVariables,
  options?: {
    fetchKey?: string | number,
    fetchPolicy?: FetchPolicy,
    networkCacheConfig?: CacheConfig,
    UNSTABLE_renderPolicy?: RenderPolicy,
  },
): TData {
  const emptyVariables = (({}: any): TVariables); // TODO: how to do this properly?
  return _useLazyLoadQuery(gqlQuery, variables ?? emptyVariables, options);
}
