// @flow

import Relay from 'react-relay';
import { TimeoutError as unstable_TimeoutError } from '@kiwicom/fetch'; // eslint-disable-line babel/camelcase

import createFragmentContainer from './createFragmentContainer';
import createPaginationContainer, {
  type PaginationRelayProp as _PaginationRelayProp,
} from './createPaginationContainer';
import createRefetchContainer, {
  type RefetchRelayProp as _RefetchRelayProp,
} from './createRefetchContainer';
import QueryRenderer from './QueryRenderer';
import type { GraphQLTaggedNode } from './types.flow';

module.exports = {
  unstable_TimeoutError,
  createEnvironment: require('./createEnvironment'),
  createNetworkFetcher: require('./fetchers/createNetworkFetcher'),
  DefaultEnvironment: require('./DefaultEnvironment'),

  // Relay-only things:
  commitLocalUpdate: Relay.commitLocalUpdate,
  commitMutation: Relay.commitMutation,
  createFragmentContainer,
  createPaginationContainer,
  createRefetchContainer,
  graphql,
  QueryRenderer,
};

function graphql(strings: Array<string>): GraphQLTaggedNode {
  return Relay.graphql(strings);
}

export type PaginationRelayProp = _PaginationRelayProp;
export type RefetchRelayProp = _RefetchRelayProp;
