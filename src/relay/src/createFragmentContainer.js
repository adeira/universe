// @flow

import * as React from 'react';
import { createFragmentContainer as _createFragmentContainer } from 'react-relay';
import { invariant, isObjectEmpty } from '@adeira/js';

import type { FragmentSpec, $RelayProps } from './types.flow';
import type { Environment } from './runtimeTypes.flow';

export type RelayProp = {|
  +environment: Environment,
|};

export default function createFragmentContainer<
  Props: { ... },
  TComponent: React.ComponentType<Props>,
>(
  Component: TComponent,
  fragmentSpec: FragmentSpec, // this is intentionally different to force the best practices
): React.ComponentType<$RelayProps<React.ElementConfig<TComponent>, RelayProp>> {
  // TODO: should we do a proper check here and validate the fragment spec?
  invariant(
    isObjectEmpty(fragmentSpec) === false,
    'Fragment spec of this fragment container factory cannot be empty.',
  );
  return _createFragmentContainer(Component, fragmentSpec);
}
