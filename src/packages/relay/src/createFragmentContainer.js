// @flow

import { createFragmentContainer as _createFragmentContainer } from 'react-relay';

import type { FragmentSpec, $RelayProps, Environment } from './types.flow';

export type RelayProp = {|
  +environment: Environment,
|};

export default function createFragmentContainer<TComponent: React$ComponentType<any>>(
  Component: TComponent,
  fragmentSpec: FragmentSpec, // this is intentionally different to force the best practices
): React$ComponentType<$RelayProps<React$ElementConfig<TComponent>, RelayProp>> {
  return _createFragmentContainer(Component, fragmentSpec);
}
