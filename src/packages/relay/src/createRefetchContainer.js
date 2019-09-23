// @flow

import { createRefetchContainer as _createRefetchContainer } from 'react-relay';
import { invariant } from '@kiwicom/js';

import isObjectEmpty from './utils/isObjectEmpty';
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

export default function createRefetchContainer<TComponent: React$ComponentType<any>>(
  Component: TComponent,
  fragmentSpec: FragmentSpec,
  refetchQuery: GraphQLTaggedNode,
): React$ComponentType<$RelayProps<React$ElementConfig<TComponent>, RefetchRelayProp>> {
  invariant(
    isObjectEmpty(fragmentSpec) === false,
    'Fragment spec of this refetch container factory cannot be empty.',
  );
  return _createRefetchContainer(Component, fragmentSpec, refetchQuery);
}
