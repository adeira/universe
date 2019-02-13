// @flow

import { createFragmentContainer as _createFragmentContainer } from 'react-relay';

import type { $RelayProps, GeneratedNodeMap } from './types.flow';

export default function createFragmentContainer<
  TComponent: React$ComponentType<any>,
>(
  Component: TComponent,
  fragmentSpec: GeneratedNodeMap, // this is intentionally different to force the best practices
): React$ComponentType<$RelayProps<React$ElementConfig<TComponent>, void>> {
  return _createFragmentContainer(Component, fragmentSpec);
}
