// @flow

import { readInlineData as _readInlineData } from 'react-relay';

import type { GraphQLTaggedNode } from './types.flow';

opaque type FragmentReference = empty;

export default function readInlineData<
  TRef: FragmentReference,
  TData,
  TKey: ?{ +$data?: TData, +$fragmentRefs: TRef, ... },
>(fragment: GraphQLTaggedNode, fragmentRef: TKey): ?TData {
  return _readInlineData(fragment, fragmentRef);
}
