// @flow

import { readInlineData as _readInlineData } from 'react-relay';

import type { GraphQLTaggedNode } from './types.flow';

export default function readInlineData(
  fragment: GraphQLTaggedNode,
  fragmentRef: GraphQLTaggedNode,
) {
  return _readInlineData(fragment, fragmentRef);
}
