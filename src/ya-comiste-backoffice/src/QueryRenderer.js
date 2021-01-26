// @flow

import * as React from 'react';
import {
  createEnvironment,
  createNetworkFetcher,
  QueryRenderer as RelayQueryRenderer,
  type GraphQLTaggedNode,
} from '@adeira/relay';

const Environment = createEnvironment({
  fetchFn: createNetworkFetcher('http://127.0.0.1:8080/graphql', {
    'X-Client': 'ya-comiste-backoffice',
  }),
});

type Props<T> = {|
  +query: GraphQLTaggedNode,
  +onResponse: (T) => React.Node,
|};

export default function QueryRenderer<T>(props: Props<T>): React.Node {
  return (
    <RelayQueryRenderer
      environment={Environment}
      query={props.query}
      onResponse={props.onResponse}
    />
  );
}
