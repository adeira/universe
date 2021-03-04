// @flow

// Our `@adeira/relay` additions:
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

// Relay Modern (wrapped):
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
  FragmentContainerType,
  PaginationContainerType,
  RefetchContainerType,
} from './types.flow';
export type { RecordMap } from './runtimeTypes.flow';

// Relay Hooks (wrapped)
export { default as useMutation } from './useMutation';

// Relay Modern (re-exported):
export { graphql, readInlineData, commitLocalUpdate } from 'react-relay';
export { ConnectionHandler } from 'relay-runtime';
export type { Environment } from 'react-relay';
export type {
  CacheConfig,
  DeclarativeMutationConfig,
  Disposable,
  GraphQLTaggedNode,
  Snapshot,
  Variables,
} from 'relay-runtime';

// Relay Hooks (re-exported):
export { RelayEnvironmentProvider, useRelayEnvironment } from 'react-relay';
