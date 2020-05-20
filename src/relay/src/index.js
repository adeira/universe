// @flow

import {
  ResponseError as FetchResponseError,
  TimeoutError as FetchTimeoutError,
} from '@adeira/fetch';
import { graphql, readInlineData } from 'react-relay';

import commitLocalUpdate from './commitLocalUpdate';
import { commitMutation, commitMutationAsync } from './mutations';
import createEnvironment from './createEnvironment';
import createFragmentContainer from './createFragmentContainer';
import createLocalEnvironment from './createLocalEnvironment';
import createNetworkFetcher from './fetchers/createNetworkFetcher';
import createPaginationContainer from './createPaginationContainer';
import createRefetchContainer from './createRefetchContainer';
import fetchQuery from './fetchQuery';
import LocalQueryRenderer from './LocalQueryRenderer';
import QueryRenderer from './QueryRenderer';
import RelayEnvironmentProvider from './RelayEnvironmentProvider';
import requestSubscription from './requestSubscription';
import useRelayEnvironment from './hooks/useRelayEnvironment';
import useMutation from './hooks/useMutation';

module.exports = {
  createEnvironment,
  createLocalEnvironment,
  createNetworkFetcher,
  FetchResponseError,
  FetchTimeoutError,

  // Relay-specific things:
  commitLocalUpdate,
  commitMutation,
  commitMutationAsync,
  createFragmentContainer,
  createPaginationContainer,
  createRefetchContainer,
  fetchQuery,
  graphql,
  LocalQueryRenderer,
  QueryRenderer,
  readInlineData,
  requestSubscription,

  // Experimental Relay-specific things (not officially released yet):
  RelayEnvironmentProvider,
  useRelayEnvironment,
  useMutation,
};

export type { RelayProp } from './createFragmentContainer';
export type { PaginationRelayProp } from './createPaginationContainer';
export type { RefetchRelayProp } from './createRefetchContainer';
export type { DeclarativeMutationConfig } from './types.flow';
export type { Environment, Snapshot, RecordMap } from './runtimeTypes.flow';
// TODO: Remove from here, and only export from @adeira/relay-runtime
export type { Disposable, GraphQLTaggedNode } from '@adeira/relay-runtime';
