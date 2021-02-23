// @flow

import * as React from 'react';
import fbt from 'fbt';
import sx from '@adeira/sx';
import { graphql } from '@adeira/relay';
import { Heading } from '@adeira/sx-design';

import LayoutHeading from '../src/LayoutHeading';
import LayoutQueryRenderer from '../src/LayoutQueryRenderer';

export default function UsersPage(): React.Node {
  const CommonHeader = (
    <LayoutHeading
      heading={
        <Heading>
          <fbt desc="list of users title">List of users</fbt>
        </Heading>
      }
    />
  );

  return (
    <LayoutQueryRenderer
      query={graphql`
        query usersQuery {
          listUsers {
            id
            type
          }
        }
      `}
      onLoading={() => CommonHeader}
      onResponse={({ listUsers: users }) => {
        return (
          <>
            {CommonHeader}
            <pre>TODO (view users, change permissions)</pre>
            {users.map((user) => {
              return (
                <div key={user.id} className={styles('row')}>
                  <div>{user.id}</div>
                  <div>{user.type}</div>
                </div>
              );
            })}
          </>
        );
      }}
    />
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
