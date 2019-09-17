// @flow

import {
  ResponseError as FetchResponseError,
  TimeoutError as FetchTimeoutError,
} from '@kiwicom/fetch';

import createEnvironment from './createEnvironment';
import createNetworkFetcher from './fetchers/createNetworkFetcher';
import commitLocalUpdate from './commitLocalUpdate';
import commitMutation from './commitMutation';
import createFragmentContainer from './createFragmentContainer';
import createPaginationContainer from './createPaginationContainer';
import createRefetchContainer from './createRefetchContainer';
import graphql from './graphql';
import LocalQueryRenderer from './LocalQueryRenderer';
import QueryRenderer from './QueryRenderer';
import requestSubscription from './requestSubscription';

module.exports = {
  FetchResponseError,
  FetchTimeoutError,
  createEnvironment,
  createNetworkFetcher,

  // Relay-specific things:
  commitLocalUpdate,
  commitMutation,
  createFragmentContainer,
  createPaginationContainer,
  createRefetchContainer,
  graphql,
  LocalQueryRenderer,
  QueryRenderer,
  requestSubscription,
};

export type { RelayProp } from './createFragmentContainer';
export type { PaginationRelayProp } from './createPaginationContainer';
export type { RefetchRelayProp } from './createRefetchContainer';
export type { Disposable, Environment, GraphQLTaggedNode } from './types.flow';
