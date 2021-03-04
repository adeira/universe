// @flow

import { createRefetchContainer as _createRefetchContainer, type Environment } from 'react-relay';
import { invariant, isObjectEmpty } from '@adeira/js';
import type { ComponentType, ElementConfig } from 'react';
import type { Disposable, GraphQLTaggedNode } from 'relay-runtime';

import type { $RelayProps, FragmentSpec } from './types.flow';

type RefetchOptions = {
  +force?: boolean,
  +fetchPolicy?: 'store-or-network' | 'network-only',
  ...
};

export type RefetchRelayProp = {|
  +environment: Environment,
  +refetch: (
    refetchVariables:
      | { +[key: string]: any, ... }
      | ((fragmentVariables: { +[key: string]: any, ... }) => {
          +[key: string]: any,
          ...
        }),
    renderVariables: ?{ +[key: string]: any, ... },
    callback: ?(error: ?Error) => void,
    options?: RefetchOptions,
  ) => Disposable,
|};

/**
 * @deprecated use `useRefetchableFragment` instead
 */
export default function createRefetchContainer<Props: { ... }, TComponent: ComponentType<Props>>(
  Component: TComponent,
  fragmentSpec: FragmentSpec,
  refetchQuery: GraphQLTaggedNode,
): ComponentType<$RelayProps<ElementConfig<TComponent>, RefetchRelayProp>> {
  invariant(
    isObjectEmpty(fragmentSpec) === false,
    'Fragment spec of this refetch container factory cannot be empty.',
  );
  return _createRefetchContainer(Component, fragmentSpec, refetchQuery);
}
