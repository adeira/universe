// @flow

import { createRefetchContainer as _createRefetchContainer } from 'react-relay';

import type {
  $RelayProps,
  FragmentSpec,
  GraphQLTaggedNode,
  Disposable,
  $EnvironmentFromProps,
} from './types.flow';

type RefetchOptions = { force?: boolean, ... };

export type RefetchRelayProp = {|
  +environment: $EnvironmentFromProps,
  +refetch: (
    refetchVariables:
      | { +[key: string]: any, ... }
      | ((fragmentVariables: { +[key: string]: any, ... }) => {
          +[key: string]: any,
          ...,
        }),
    renderVariables: ?{ +[key: string]: any, ... },
    callback: ?(error: ?Error) => void,
    options?: RefetchOptions,
  ) => Disposable,
|};

export default function createRefetchContainer<
  TComponent: React$ComponentType<any>,
>(
  Component: TComponent,
  fragmentSpec: FragmentSpec,
  refetchQuery: GraphQLTaggedNode,
): React$ComponentType<
  $RelayProps<React$ElementConfig<TComponent>, RefetchRelayProp>,
> {
  return _createRefetchContainer(Component, fragmentSpec, refetchQuery);
}
