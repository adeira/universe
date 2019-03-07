// @flow

import {
  ResponseError as FetchResponseError,
  TimeoutError as FetchTimeoutError,
} from '@kiwicom/fetch';

import commitMutation from './commitMutation';
import commitLocalUpdate from './commitLocalUpdate';
import createFragmentContainer, {
  type RelayProp as _RelayProp,
} from './createFragmentContainer';
import createPaginationContainer, {
  type PaginationRelayProp as _PaginationRelayProp,
} from './createPaginationContainer';
import createRefetchContainer, {
  type RefetchRelayProp as _RefetchRelayProp,
} from './createRefetchContainer';
import graphql from './graphql';
import QueryRenderer from './QueryRenderer';
import requestSubscription from './requestSubscription';
import type { GraphQLTaggedNode as _GraphQLTaggedNode } from './types.flow';

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

export type RelayProp = _RelayProp;
export type PaginationRelayProp = _PaginationRelayProp;
export type RefetchRelayProp = _RefetchRelayProp;

// TODO: expose `Environment` Flow type (?)
export type GraphQLTaggedNode = _GraphQLTaggedNode;
