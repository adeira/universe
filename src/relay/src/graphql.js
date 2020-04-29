// @flow

import { graphql as _graphql } from 'react-relay';

import type { GraphQLTaggedNode } from './types.flow';

export default function graphql(strings: $ReadOnlyArray<string>): GraphQLTaggedNode {
  // $FlowFixMe errors after upgrading to relay 9.1.0
  return _graphql(strings);
}
