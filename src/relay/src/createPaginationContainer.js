// @flow

import type { ComponentType, ElementConfig } from 'react';
import {
  createPaginationContainer as _createPaginationContainer,
  type RelayPaginationProp as _RelayPaginationProp,
} from 'react-relay';
import { invariant, isObjectEmpty } from '@adeira/js';
import type { ConnectionConfig } from 'react-relay/ReactRelayPaginationContainer.js.flow';

import type { FragmentSpec, $RelayProps } from './types.flow';

export type PaginationRelayProp = _RelayPaginationProp;

export default function createPaginationContainer<Props: { ... }, TComponent: ComponentType<Props>>(
  Component: TComponent,
  fragmentSpec: FragmentSpec,
  connectionConfig: ConnectionConfig,
): ComponentType<$RelayProps<ElementConfig<TComponent>, PaginationRelayProp>> {
  invariant(
    isObjectEmpty(fragmentSpec) === false,
    'Fragment spec of this pagination container factory cannot be empty.',
  );
  return _createPaginationContainer(Component, fragmentSpec, connectionConfig);
}
