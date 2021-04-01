// @flow

import { Badge, MissingData, Table } from '@adeira/sx-design';
import * as React from 'react';
import { graphql, useLazyLoadQuery } from '@adeira/relay';
import fbt from 'fbt';

export default function EmployeesPage(): React.Node {
  // eslint-disable-next-line relay/generated-flow-types -- https://github.com/relayjs/eslint-plugin-relay/issues/131
  const data = useLazyLoadQuery(graphql`
    query EmployeesPageQuery {
      auth {
        listUsers {
          name
          hasEmailVerified
          isActive
        }
      }
    }
  `);

  return (
    <Table
      columns={[
        { Header: <fbt desc="status of an employee record">Status</fbt>, accessor: 'col1' },
        { Header: <fbt desc="name of the employee">Name</fbt>, accessor: 'col2' },
        { Header: () => null, accessor: 'col3' },
      ]}
      data={data.auth.listUsers.map((user) => {
        return {
          col1: user.isActive ? (
            <Badge tint="success">
              <fbt desc="active user - label title">active</fbt>
            </Badge>
          ) : (
            <Badge tint="warning">
              <fbt desc="inactive user - label title">inactive</fbt>
            </Badge>
          ),
          col2: user.name ?? <MissingData />,
          col3: user.hasEmailVerified ? (
            <Badge tint="success">
              <fbt desc="user has email verifies - label title">email verified</fbt>
            </Badge>
          ) : (
            <Badge tint="error">
              <fbt desc="user doesn't have email verifies - label title">email NOT verified</fbt>
            </Badge>
          ),
        };
      })}
    />
  );
}
