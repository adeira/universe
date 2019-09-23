// @flow

import {
  ResponseError as FetchResponseError,
  TimeoutError as FetchTimeoutError,
} from '@kiwicom/fetch';

import commitLocalUpdate from './commitLocalUpdate';
import commitMutation from './commitMutation';
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
import requestSubscription from './requestSubscription';

module.exports = {
  createEnvironment,
  createLocalEnvironment,
  createNetworkFetcher,
  FetchResponseError,
  FetchTimeoutError,

  // Relay-specific things:
  commitLocalUpdate,
  commitMutation,
  createFragmentContainer,
  createPaginationContainer,
  createRefetchContainer,
  fetchQuery,
  graphql,
  LocalQueryRenderer,
  QueryRenderer,
  requestSubscription,
};

export type { RelayProp } from './createFragmentContainer';
export type { PaginationRelayProp } from './createPaginationContainer';
export type { RefetchRelayProp } from './createRefetchContainer';
export type { Disposable, Environment, GraphQLTaggedNode } from './types.flow';
