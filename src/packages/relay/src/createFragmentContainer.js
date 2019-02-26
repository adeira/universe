// @flow

import { createFragmentContainer as _createFragmentContainer } from 'react-relay';

import type { $RelayProps, FragmentSpec } from './types.flow';

export default function createFragmentContainer<
  TComponent: React$ComponentType<any>,
>(
  Component: TComponent,
  fragmentSpec: FragmentSpec, // this is intentionally different to force the best practices
): React$ComponentType<$RelayProps<React$ElementConfig<TComponent>, void>> {
  return _createFragmentContainer(Component, fragmentSpec);
}
