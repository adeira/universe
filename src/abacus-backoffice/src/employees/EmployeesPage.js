// @flow

import { Badge, MissingData, Table } from '@adeira/sx-design';
import * as React from 'react';
import { graphql, useLazyLoadQuery } from '@adeira/relay';
import fbt from 'fbt';

import type { EmployeesPageQuery } from './__generated__/EmployeesPageQuery.graphql';

export default function EmployeesPage(): React.Node {
  const data = useLazyLoadQuery<EmployeesPageQuery>(graphql`
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
        // $FlowFixMe[incompatible-type]: https://github.com/adeira/universe/pull/3169
        { Header: () => null, accessor: 'col3' },
      ]}
      data={data.auth.listUsers.map((user) => {
        return {
          col1: user.isActive ? (
            // $FlowFixMe[incompatible-type]: https://github.com/adeira/universe/pull/3169
            <Badge tint="success">
              <fbt desc="active user - label title">active</fbt>
            </Badge>
          ) : (
            // $FlowFixMe[incompatible-type]: https://github.com/adeira/universe/pull/3169
            <Badge tint="warning">
              <fbt desc="inactive user - label title">inactive</fbt>
            </Badge>
          ),
          // $FlowFixMe[incompatible-type]: https://github.com/adeira/universe/pull/3169
          col2: user.name ?? <MissingData />,
          col3: user.hasEmailVerified ? (
            // $FlowFixMe[incompatible-type]: https://github.com/adeira/universe/pull/3169
            <Badge tint="success">
              <fbt desc="user has email verifies - label title">email verified</fbt>
            </Badge>
          ) : (
            // $FlowFixMe[incompatible-type]: https://github.com/adeira/universe/pull/3169
            <Badge tint="error">
              <fbt desc="user doesn't have email verifies - label title">email NOT verified</fbt>
            </Badge>
          ),
        };
      })}
    />
  );
}
