/* eslint-disable relay/must-colocate-fragment-spreads */
// @flow

import type { Node } from 'react';

import { QueryRenderer, graphql, createLocalEnvironment, type GraphQLTaggedNode } from '../index';

function placeholder() {
  return null;
}

type Props = {|
  +query: GraphQLTaggedNode,
  +render: () => Node,
|};

function CustomQueryRenderer(props: Props) {
  const environment = createLocalEnvironment();
  return <QueryRenderer environment={environment} {...props} />;
}

module.exports = {
  minimalUsage(): Node {
    return (
      <CustomQueryRenderer
        query={graphql`
          query CustomQueryRenderer {
            ...AllLocations_data
          }
        `}
        render={placeholder}
      />
    );
  },
  invalidUsage(): Node {
    return (
      <CustomQueryRenderer
        // $FlowExpectedError[incompatible-type]: should be `GraphQLTaggedNode` instead
        query="invalid_query_type"
        render={placeholder}
      />
    );
  },
};
