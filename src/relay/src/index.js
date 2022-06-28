// @flow

// Our `@adeira/relay` additions:
export {
  ResponseError as FetchResponseError,
  TimeoutError as FetchTimeoutError,
} from '@adeira/fetch';
export { default as createEnvironment } from './createEnvironment';
export { default as createNetworkFetcher } from './createNetworkFetcher';
export { RelayLogger, RelayRequiredFieldLogger } from './RelayLogger';
export { default as RelayRehydratePreloadedQueries } from './RelayRehydratePreloadedQueries';

// Relay Modern (wrapped):
export { default as QueryRenderer } from './QueryRenderer';
export { default as useLazyLoadQuery } from './useLazyLoadQuery';

// Relay Modern (re-exported):
export {
  commitLocalUpdate,
  commitMutation,
  ConnectionHandler,
  createFragmentContainer,
  createPaginationContainer,
  createRefetchContainer,
  graphql,
  readInlineData,
  requestSubscription,
} from 'react-relay/legacy';
export type {
  RelayFragmentContainer,
  RelayPaginationContainer,
  RelayPaginationProp,
  RelayProp,
  RelayRefetchContainer,
  RelayRefetchProp,
} from 'react-relay/legacy';
export type { Environment } from 'react-relay';
export type {
  CacheConfig,
  DeclarativeMutationConfig,
  Disposable,
  GraphQLTaggedNode, // TODO: deprecated in favor of `Query<_, _>` type (precisely typed GraphQL strings)
  PayloadError,
  Snapshot,
  UploadableMap,
  Variables,
} from 'relay-runtime';
// eslint-disable-next-line import/no-unresolved
export type { RecordObjectMap as RecordMap } from 'relay-runtime/store/RelayStoreTypes';

// Relay Hooks (wrapped)
export { default as useMutation } from './useMutation';

// Relay Hooks (re-exported):
export {
  EntryPointContainer,
  fetchQuery,
  loadEntryPoint,
  loadQuery,
  RelayEnvironmentProvider,
  useEntryPointLoader,
  useFragment,
  usePaginationFragment,
  usePreloadedQuery,
  useQueryLoader,
  useRefetchableFragment,
  useRelayEnvironment,
  useSubscribeToInvalidationState,
  useSubscription,
} from 'react-relay';
export type { PreloadedQuery } from 'react-relay';
