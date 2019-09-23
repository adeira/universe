// @flow

import { createPaginationContainer as _createPaginationContainer } from 'react-relay';
import { invariant } from '@kiwicom/js';

import isObjectEmpty from './utils/isObjectEmpty';
import type {
  FragmentSpec,
  GraphQLTaggedNode,
  Disposable,
  $RelayProps,
  Environment,
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
  +getConnectionFromProps?: (props: {
    +[key: string]: any,
    ...,
  }) => ?ConnectionData,
  +getFragmentVariables?: (
    previousVariables: { +[key: string]: any, ... },
    totalCount: number,
  ) => { +[key: string]: any, ... },
  +getVariables: (
    props: { +[key: string]: any, ... },
    paginationInfo: {|
      +count: number,
      +cursor: ?string,
    |},
    fragmentVariables: { +[key: string]: any, ... },
  ) => { +[key: string]: any, ... },
  +query: GraphQLTaggedNode,
|};

export type PaginationRelayProp = {|
  +environment: Environment,
  +hasMore: () => boolean,
  +isLoading: () => boolean,
  +loadMore: (pageSize: number, callback: ?(error: ?Error) => void) => ?Disposable,
  +refetchConnection: (
    totalCount: number,
    callback: (error: ?Error) => void,
    refetchVariables: ?{ +[key: string]: any, ... },
  ) => ?Disposable,
|};

export default function createPaginationContainer<TComponent: React$ComponentType<any>>(
  Component: TComponent,
  fragmentSpec: FragmentSpec,
  connectionConfig: ConnectionConfig,
): React$ComponentType<$RelayProps<React$ElementConfig<TComponent>, PaginationRelayProp>> {
  invariant(
    isObjectEmpty(fragmentSpec) === false,
    'Fragment spec of this pagination container factory cannot be empty.',
  );
  return _createPaginationContainer(Component, fragmentSpec, connectionConfig);
}
