// @flow

import Relay from 'react-relay';

import type { RelayProp } from './createRefetchContainer';
import type {
  $RelayProps,
  GeneratedNodeMap,
  GraphQLTaggedNode,
} from './types.flow';

type ConnectionData = {|
  +edges?: ?Array<any>,
  +pageInfo?: ?{|
    +endCursor: ?string,
    +hasNextPage: boolean,
    +hasPreviousPage: boolean,
    +startCursor: ?string,
  |},
|};

type ConnectionConfig = {|
  +direction?: 'backward' | 'forward',
  +getConnectionFromProps?: (props: Object) => ?ConnectionData,
  +getFragmentVariables?: (
    previousVariables: Object,
    totalCount: number,
  ) => Object,
  +getVariables: (
    props: Object,
    paginationInfo: {|
      +count: number,
      +cursor: ?string,
    |},
    fragmentVariables: Object,
  ) => Object,
  +query: GraphQLTaggedNode,
|};

export default function createPaginationContainer<
  TComponent: React$ComponentType<any>,
>(
  Component: TComponent,
  fragmentSpec: GeneratedNodeMap,
  connectionConfig: ConnectionConfig,
): React$ComponentType<
  $RelayProps<React$ElementConfig<TComponent>, RelayProp>,
> {
  return Relay.createPaginationContainer(
    Component, // TODO: additional pagination props
    fragmentSpec,
    connectionConfig,
  );
}
