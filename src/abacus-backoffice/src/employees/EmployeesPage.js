// @flow

import { Badge, Entity, EntityField, MissingData } from '@adeira/sx-design';
import * as React from 'react';
import { graphql, useLazyLoadQuery } from '@adeira/relay';
import fbt from 'fbt';

import type { EmployeesPageQuery } from './__generated__/EmployeesPageQuery.graphql';

export default function EmployeesPage(): React.Node {
  const data = useLazyLoadQuery<EmployeesPageQuery>(graphql`
    query EmployeesPageQuery {
      auth {
        listUsers {
          id
          name
          hasEmailVerified
          isActive
        }
      }
    }
  `);

  return data.auth.listUsers.map((user) => {
    return (
      <Entity key={user.id}>
        <EntityField
          description={
            user.isActive ? (
              <Badge tint="success">
                <fbt desc="active user - label title">active</fbt>
              </Badge>
            ) : (
              <Badge tint="warning">
                <fbt desc="inactive user - label title">inactive</fbt>
              </Badge>
            )
          }
        />
        <EntityField description={user.name ?? <MissingData />} />
        <EntityField
          description={
            user.hasEmailVerified ? (
              <Badge tint="success">
                <fbt desc="user has email verifies - label title">email verified</fbt>
              </Badge>
            ) : (
              <Badge tint="error">
                <fbt desc="user doesn't have email verifies - label title">email NOT verified</fbt>
              </Badge>
            )
          }
        />
      </Entity>
    );
  });
}
