// @flow

import sx from '@adeira/sx';
import { Badge } from '@adeira/sx-design';
import * as React from 'react';
import { graphql, useLazyLoadQuery } from '@adeira/relay';
import fbt from 'fbt';

import MissingData from '../MissingData';
import type { EmployeesPageQuery } from './__generated__/EmployeesPageQuery.graphql';

export default function EmployeesPage(): React.Node {
  const data = useLazyLoadQuery<EmployeesPageQuery>(graphql`
    query EmployeesPageQuery {
      listUsers {
        id
        name
        hasEmailVerified
        isActive
      }
    }
  `);

  return (
    <div className={styles('grid')}>
      {data.listUsers.map((user) => {
        return (
          <React.Fragment key={user.id}>
            <div className={styles('cell')}>
              {user.isActive ? (
                <Badge tint="success">
                  <fbt desc="active user - label title">active</fbt>
                </Badge>
              ) : (
                <Badge tint="warning">
                  <fbt desc="inactive user - label title">inactive</fbt>
                </Badge>
              )}
            </div>
            <div className={styles('cell')}>{user.name ?? <MissingData />}</div>
            <div className={styles('cell')}>
              {user.hasEmailVerified ? (
                <Badge tint="success">
                  <fbt desc="user has email verifies - label title">email verified</fbt>
                </Badge>
              ) : (
                <Badge tint="error">
                  <fbt desc="user doesn't have email verifies - label title">
                    email NOT verified
                  </fbt>
                </Badge>
              )}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}

const styles = sx.create({
  grid: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr auto',
  },
  cell: {
    'paddingTop': '1rem',
    'paddingBottom': '1rem',
    'borderBottom': '1px solid rgba(var(--sx-accent-3))',
    ':not(:last-child)': {
      paddingRight: '1rem',
    },
  },
});
