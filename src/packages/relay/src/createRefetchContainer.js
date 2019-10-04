// @flow

import * as React from 'react';
import { createRefetchContainer as _createRefetchContainer } from 'react-relay';
import { invariant, isObjectEmpty } from '@kiwicom/js';

import type {
  $RelayProps,
  FragmentSpec,
  GraphQLTaggedNode,
  Disposable,
  Environment,
} from './types.flow';

type RefetchOptions = { force?: boolean, ... };

export type RefetchRelayProp = {|
  +environment: Environment,
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
  Props: { ... },
  TComponent: React.ComponentType<Props>,
>(
  Component: TComponent,
  fragmentSpec: FragmentSpec,
  refetchQuery: GraphQLTaggedNode,
): React.ComponentType<$RelayProps<React.ElementConfig<TComponent>, RefetchRelayProp>> {
  invariant(
    isObjectEmpty(fragmentSpec) === false,
    'Fragment spec of this refetch container factory cannot be empty.',
  );
  return _createRefetchContainer(Component, fragmentSpec, refetchQuery);
}
