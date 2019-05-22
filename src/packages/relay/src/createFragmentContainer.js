// @flow

import { createFragmentContainer as _createFragmentContainer } from 'react-relay';

import type {
  FragmentSpec,
  $RelayProps,
  $EnvironmentFromProps,
} from './types.flow';

export type RelayProp = {|
  +environment: $EnvironmentFromProps,
|};

export default function createFragmentContainer<
  TComponent: React$ComponentType<any>,
>(
  Component: TComponent,
  fragmentSpec: FragmentSpec, // this is intentionally different to force the best practices
): React$ComponentType<
  $RelayProps<React$ElementConfig<TComponent>, RelayProp>,
> {
  return _createFragmentContainer(Component, fragmentSpec);
}
