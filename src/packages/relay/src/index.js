// @flow

import { Environment } from 'relay-runtime';
import {
  commitLocalUpdate as _commitLocalUpdate,
  graphql as _graphql,
} from 'react-relay';
import {
  ResponseError as FetchResponseError,
  TimeoutError as FetchTimeoutError,
} from '@kiwicom/fetch';

import commitMutation from './commitMutation';
import createFragmentContainer from './createFragmentContainer';
import createPaginationContainer, {
  type PaginationRelayProp as _PaginationRelayProp,
} from './createPaginationContainer';
import createRefetchContainer, {
  type RefetchRelayProp as _RefetchRelayProp,
} from './createRefetchContainer';
import QueryRenderer from './QueryRenderer';
import requestSubscription from './requestSubscription';
import type { GraphQLTaggedNode } from './types.flow';

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

opaque type RecordSourceSelectorProxy = $FlowFixMe;
opaque type SelectorData = $FlowFixMe;

/**
 * The first parameter `environment` should be from `props.relay.environment`
 * to ensure the update is performed in the correct environment.
 */
function commitLocalUpdate(
  environment: Environment,
  updater: (store: RecordSourceSelectorProxy, data: SelectorData) => void,
) {
  return _commitLocalUpdate(environment, updater);
}

function graphql(strings: Array<string>): GraphQLTaggedNode {
  return _graphql(strings);
}

export type PaginationRelayProp = _PaginationRelayProp;
export type RefetchRelayProp = _RefetchRelayProp;
