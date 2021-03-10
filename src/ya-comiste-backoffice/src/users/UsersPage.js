// @flow

import sx from '@adeira/sx';
import * as React from 'react';
import { graphql, useLazyLoadQuery } from '@adeira/relay';

import type { UsersPageQuery } from './__generated__/UsersPageQuery.graphql';

export default function UsersPage(): React.Node {
  const data = useLazyLoadQuery<UsersPageQuery>(graphql`
    query UsersPageQuery {
      listUsers {
        id
        type
      }
    }
  `);

  return data.listUsers.map((user) => {
    return (
      <div key={user.id} className={styles('row')}>
        <div>{user.id}</div>
        <div>{user.type}</div>
      </div>
    );
  });
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
