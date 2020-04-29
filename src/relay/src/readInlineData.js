// @flow

import { readInlineData as _readInlineData } from 'react-relay';

import type { GraphQLTaggedNode } from './types.flow';

opaque type FragmentReference = empty;

export default function readInlineData<
  TRef: FragmentReference,
  TData,
  TKey: ?{ +$data?: TData, +$fragmentRefs: TRef, ... },
>(fragment: GraphQLTaggedNode, fragmentRef: TKey): ?TData {
  // $FlowFixMe errors after upgrading to relay 9.1.0
  return _readInlineData(fragment, fragmentRef);
}
