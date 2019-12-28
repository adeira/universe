// @flow

import { useFragment as _useFragment } from 'react-relay/hooks';

import type { GraphQLTaggedNode } from '../types.flow';

// NOTE: These declares ensure that the type of the returned data is:
//   - non-nullable if the provided ref type is non-nullable
//   - nullable if the provided ref type is nullable
//   - TODO

/*::

declare function useFragment<TKey: { +$data?: mixed, ... }>(
  fragmentInput: GraphQLTaggedNode,
  fragmentRef: TKey,
): $Call<<TFragmentData>({ +$data?: TFragmentData, ... }) => TFragmentData, TKey>;

declare function useFragment<TKey: ?{ +$data?: mixed, ... }>(
  fragmentInput: GraphQLTaggedNode,
  fragmentRef: TKey,
): $Call<<TFragmentData>(?{ +$data?: TFragmentData, ... }) => ?TFragmentData, TKey>;

*/

export default function useFragment(
  fragmentInput: GraphQLTaggedNode,
  fragmentRef: ?$ReadOnlyArray<{ +$data?: mixed, ... }> | ?{ +$data?: mixed, ... },
) {
  return _useFragment(fragmentInput, fragmentRef);
}
