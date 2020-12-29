// @flow

import * as React from 'react';
import sx from '@adeira/sx';
import { QueryRenderer, graphql, createEnvironment, createNetworkFetcher } from '@adeira/relay';

const Environment = createEnvironment({
  fetchFn: createNetworkFetcher('http://127.0.0.1:8080/graphql', {
    'X-Client': 'ya-comiste-backoffice',
  }),
});

export default function Navigation(): React.Node {
  return (
    <>
      <div className={styles('navigation')}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a href="#">Products</a>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a href="#">Users</a>
      </div>
      <QueryRenderer
        environment={Environment}
        /* eslint-disable relay/unused-fields */
        query={graphql`
          query NavigationQuery {
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
    </>
  );
}

const styles = sx.create({
  navigation: {
    display: 'flex',
    flexDirection: 'column',
  },
});
