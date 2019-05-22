// @flow

import { createPaginationContainer as _createPaginationContainer } from 'react-relay';

import type {
  FragmentSpec,
  GraphQLTaggedNode,
  Disposable,
  $RelayProps,
  $EnvironmentFromProps,
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

export type PaginationRelayProp = {|
  +environment: $EnvironmentFromProps,
  +hasMore: () => boolean,
  +isLoading: () => boolean,
  +loadMore: (
    pageSize: number,
    callback: ?(error: ?Error) => void,
  ) => ?Disposable,
  +refetchConnection: (
    totalCount: number,
    callback: (error: ?Error) => void,
    refetchVariables: ?Object,
  ) => ?Disposable,
|};

export default function createPaginationContainer<
  TComponent: React$ComponentType<any>,
>(
  Component: TComponent,
  fragmentSpec: FragmentSpec,
  connectionConfig: ConnectionConfig,
): React$ComponentType<
  $RelayProps<React$ElementConfig<TComponent>, PaginationRelayProp>,
> {
  return _createPaginationContainer(Component, fragmentSpec, connectionConfig);
}
