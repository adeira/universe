// @flow

import {
  ResponseError as FetchResponseError,
  TimeoutError as FetchTimeoutError,
} from '@kiwicom/fetch';

import commitMutation from './commitMutation';
import commitLocalUpdate from './commitLocalUpdate';
import createFragmentContainer from './createFragmentContainer';
import createPaginationContainer from './createPaginationContainer';
import createRefetchContainer from './createRefetchContainer';
import graphql from './graphql';
import QueryRenderer from './QueryRenderer';
import requestSubscription from './requestSubscription';

module.exports = {
  FetchResponseError,
  FetchTimeoutError,
  createEnvironment: require('./createEnvironment'),
  createNetworkFetcher: require('./fetchers/createNetworkFetcher'),

  // Relay-only things:
  commitLocalUpdate,
  commitMutation,
  createFragmentContainer,
  createPaginationContainer,
  createRefetchContainer,
  graphql,
  QueryRenderer,
  requestSubscription,
};

export type { RelayProp } from './createFragmentContainer';
export type { PaginationRelayProp } from './createPaginationContainer';
export type { RefetchRelayProp } from './createRefetchContainer';
export type { Disposable, Environment, GraphQLTaggedNode } from './types.flow';
