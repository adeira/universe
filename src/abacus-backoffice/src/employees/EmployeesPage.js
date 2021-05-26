// @flow

import sx from '@adeira/sx';
import * as React from 'react';
import { graphql, useLazyLoadQuery } from '@adeira/relay';

import type { EmployeesPageQuery } from './__generated__/EmployeesPageQuery.graphql';

export default function EmployeesPage(): React.Node {
  // TODO: do not list all users but employees only
  const data = useLazyLoadQuery<EmployeesPageQuery>(graphql`
    query EmployeesPageQuery {
      listUsers {
        id
      }
    }
  `);

  return data.listUsers.map((user) => {
    return (
      <div key={user.id} className={styles('row')}>
        <div>{user.id}</div>
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
    borderBottom: '1px solid rgb(233, 239, 243)',
  },
});
