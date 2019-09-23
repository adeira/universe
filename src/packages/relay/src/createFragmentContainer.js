// @flow

import { createFragmentContainer as _createFragmentContainer } from 'react-relay';
import { invariant } from '@kiwicom/js';

import isObjectEmpty from './utils/isObjectEmpty';
import type { FragmentSpec, $RelayProps, Environment } from './types.flow';

export type RelayProp = {|
  +environment: Environment,
|};

export default function createFragmentContainer<TComponent: React$ComponentType<any>>(
  Component: TComponent,
  fragmentSpec: FragmentSpec, // this is intentionally different to force the best practices
): React$ComponentType<$RelayProps<React$ElementConfig<TComponent>, RelayProp>> {
  // TODO: should we do a proper check here and validate the fragment spec?
  invariant(
    isObjectEmpty(fragmentSpec) === false,
    'Fragment spec of this fragment container factory cannot be empty.',
  );
  return _createFragmentContainer(Component, fragmentSpec);
}
