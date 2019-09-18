// @flow

import * as React from 'react';

import { QueryRenderer, graphql, type GraphQLTaggedNode, createLocalEnvironment } from '../index';

function placeholder() {
  return null;
}

type Props = {|
  +query: GraphQLTaggedNode,
  +render: () => React$Node,
|};

function CustomQueryRenderer(props: Props) {
  const environment = createLocalEnvironment();
  return <QueryRenderer environment={environment} {...props} />;
}

module.exports = {
  minimalUsage() {
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
  invalidUsage() {
    return (
      <CustomQueryRenderer
        // $FlowExpectedError: should be `GraphQLTaggedNode` instead
        query="invalid_query_type"
        render={placeholder}
      />
    );
  },
};
