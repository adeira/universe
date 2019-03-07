// @flow

import * as React from 'react';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';

import { QueryRenderer, graphql, type GraphQLTaggedNode } from '../index';

function placeholder() {
  return null;
}

type Props = {|
  +query: GraphQLTaggedNode,
  +render: () => React$Node,
|};

function CustomQueryRenderer(props: Props) {
  const environment = new Environment({
    network: Network.create(() => {}),
    store: new Store(new RecordSource()),
  });

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
