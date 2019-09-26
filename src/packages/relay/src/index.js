// @flow

import {
  ResponseError as FetchResponseError,
  TimeoutError as FetchTimeoutError,
} from '@kiwicom/fetch';

import commitLocalUpdate from './commitLocalUpdate';
import { commitMutation, commitMutationAsync } from './mutations';
import createEnvironment from './createEnvironment';
import createFragmentContainer from './createFragmentContainer';
import createLocalEnvironment from './createLocalEnvironment';
import createNetworkFetcher from './fetchers/createNetworkFetcher';
import createPaginationContainer from './createPaginationContainer';
import createRefetchContainer from './createRefetchContainer';
import fetchQuery from './fetchQuery';
import graphql from './graphql';
import LocalQueryRenderer from './LocalQueryRenderer';
import QueryRenderer from './QueryRenderer';
import readInlineData from './readInlineData';
import RelayEnvironmentProvider from './RelayEnvironmentProvider';
import requestSubscription from './requestSubscription';
import useRelayEnvironment from './hooks/useRelayEnvironment';

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
};

export type { RelayProp } from './createFragmentContainer';
export type { PaginationRelayProp } from './createPaginationContainer';
export type { RefetchRelayProp } from './createRefetchContainer';
export type {
  DeclarativeMutationConfig,
  Disposable,
  Environment,
  GraphQLTaggedNode,
  Variables,
} from './types.flow';
