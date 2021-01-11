// @flow

import * as React from 'react';
import { createEnvironment, createNetworkFetcher, graphql, QueryRenderer } from '@adeira/relay';

const Environment = createEnvironment({
  fetchFn: createNetworkFetcher('http://127.0.0.1:8080/graphql', {
    'X-Client': 'ya-comiste-backoffice',
  }),
});

export default function Home(): React.Node {
  return (
    <div>
      TODO (dashboard)
      <hr />
      <QueryRenderer
        environment={Environment}
        /* eslint-disable relay/unused-fields */
        query={graphql`
          query pagesQuery {
            whoami {
              id
            }
          }
        `}
        /* eslint-enable relay/unused-fields */
        onResponse={(relayProps) => {
          return <pre>{JSON.stringify(relayProps, null, 2)}</pre>;
        }}
      />
    </div>
  );
}
