// @flow

import { graphql, QueryRenderer } from '@adeira/relay';
import * as React from 'react';

import Layout from '../src/Layout';

export default function UsersPage(): React.Node {
  return (
    <Layout>
      <div>TODO (view users, change permissions)</div>
      <QueryRenderer
        /* eslint-disable relay/unused-fields */
        query={graphql`
          query usersQuery {
            listUsers {
              id
            }
          }
        `}
        /* eslint-enable relay/unused-fields */
        onResponse={(relayProps) => {
          return <pre>{JSON.stringify(relayProps, null, 2)}</pre>;
        }}
      />
    </Layout>
  );
}
