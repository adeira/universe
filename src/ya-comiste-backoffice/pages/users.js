// @flow

import * as React from 'react';
import sx from '@adeira/sx';
import { graphql, QueryRenderer } from '@adeira/relay';
import { Heading } from '@adeira/sx-design';

import Layout from '../src/Layout';

export default function UsersPage(): React.Node {
  return (
    <Layout heading={<Heading>List of users</Heading>}>
      <div>TODO (view users, change permissions)</div>
      <QueryRenderer
        query={graphql`
          query usersQuery {
            listUsers {
              id
              type
            }
          }
        `}
        onResponse={({ listUsers: users }) => {
          return users.map((user) => {
            return (
              <div key={user.id} className={styles('row')}>
                <div>{user.id}</div>
                <div>{user.type}</div>
              </div>
            );
          });
        }}
      />
    </Layout>
  );
}

const styles = sx.create({
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: '.5rem',
    paddingBottom: '.5rem',
    borderBottom: '1px solid lightgrey',
  },
});
