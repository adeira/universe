// @flow

import type { ComponentType, ElementConfig } from 'react';
import { createFragmentContainer as _createFragmentContainer, type Environment } from 'react-relay';
import { invariant, isObjectEmpty } from '@adeira/js';

import type { FragmentSpec, $RelayProps } from './types.flow';

export type RelayProp = {
  +environment: Environment,
};

/**
 * @deprecated use `useFragment` instead
 */
export default function createFragmentContainer<Props: { ... }, TComponent: ComponentType<Props>>(
  Component: TComponent,
  fragmentSpec: FragmentSpec, // this is intentionally different to force the best practices
): ComponentType<$RelayProps<ElementConfig<TComponent>, RelayProp>> {
  // TODO: should we do a proper check here and validate the fragment spec?
  invariant(
    isObjectEmpty(fragmentSpec) === false,
    'Fragment spec of this fragment container factory cannot be empty.',
  );
  return _createFragmentContainer(Component, fragmentSpec);
}
