// @flow

import { graphql as _graphql } from 'react-relay';

import type { GraphQLTaggedNode } from './types.flow';

export default function graphql(
  strings: $ReadOnlyArray<string>,
): GraphQLTaggedNode {
  return _graphql(strings);
}
