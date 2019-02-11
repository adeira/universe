// @flow

import Relay from 'react-relay';

import type {
  $RelayProps,
  GeneratedNodeMap,
  GraphQLTaggedNode,
  Disposable,
} from './types.flow';

type RefetchOptions = {
  force?: boolean,
};

export type RefetchRelayProp = {|
  +refetch: (
    refetchVariables: Object | ((fragmentVariables: Object) => Object),
    renderVariables: ?Object,
    callback: ?(error: ?Error) => void,
    options?: RefetchOptions,
  ) => Disposable,
|};

export default function createRefetchContainer<
  TComponent: React$ComponentType<any>,
>(
  Component: TComponent,
  fragmentSpec: GeneratedNodeMap,
  refetchQuery: GraphQLTaggedNode,
): React$ComponentType<
  $RelayProps<React$ElementConfig<TComponent>, RefetchRelayProp>,
> {
  return Relay.createRefetchContainer(Component, fragmentSpec, refetchQuery);
}
