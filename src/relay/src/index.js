// @flow

// Our additions:
export {
  ResponseError as FetchResponseError,
  TimeoutError as FetchTimeoutError,
} from '@adeira/fetch';
export { default as createEnvironment } from './createEnvironment';
export { default as createLocalEnvironment } from './createLocalEnvironment';
export { default as createNetworkFetcher } from './fetchers/createNetworkFetcher';
export { default as getDataFromRequest } from './getDataFromRequest';
export { default as RelayDebugLogger } from './loggers/RelayDebugLogger';
export { default as RelayEagerLogger } from './loggers/RelayEagerLogger';
export { default as RelayLazyLogger } from './loggers/RelayLazyLogger';

// Relay-specific (wrapped) things:
export { default as commitLocalUpdate } from './commitLocalUpdate';
export { commitMutation, commitMutationAsync } from './mutations';
export { default as createFragmentContainer } from './createFragmentContainer';
export { default as createPaginationContainer } from './createPaginationContainer';
export { default as createRefetchContainer } from './createRefetchContainer';
export { default as fetchQuery } from './fetchQuery';
export { default as LocalQueryRenderer } from './LocalQueryRenderer';
export { default as QueryRenderer } from './QueryRenderer';
export { default as requestSubscription } from './requestSubscription';
export type { RelayProp } from './createFragmentContainer';
export type { PaginationRelayProp } from './createPaginationContainer';
export type { RefetchRelayProp } from './createRefetchContainer';
export type {
  DeclarativeMutationConfig,
  FragmentContainerType,
  PaginationContainerType,
  RefetchContainerType,
} from './types.flow';
export type { RecordMap } from './runtimeTypes.flow';

// Relay-specific (reexported) things:
export { graphql, readInlineData } from 'react-relay';
export { ConnectionHandler } from 'relay-runtime';
export type { Environment } from 'react-relay';
export type {
  GraphQLTaggedNode,
  Disposable,
  Variables,
  CacheConfig,
  Snapshot,
} from 'relay-runtime';

// Experimental Relay-specific things (not officially released yet):
export { default as RelayEnvironmentProvider } from './RelayEnvironmentProvider';
export { default as useMutation } from './hooks/useMutation';
export { default as useRelayEnvironment } from './hooks/useRelayEnvironment';
