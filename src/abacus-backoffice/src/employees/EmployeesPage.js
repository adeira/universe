// @flow

import { Badge, Entity, EntityField } from '@adeira/sx-design';
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

  return data.listUsers.map((user) => {
    return (
      <Entity key={user.id}>
        <EntityField
          title={
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
        <EntityField title={user.name ?? <MissingData />} />
        <EntityField
          title={
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
