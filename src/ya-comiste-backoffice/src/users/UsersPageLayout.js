// @flow

import { Heading } from '@adeira/sx-design';
import fbt from 'fbt';
import * as React from 'react';

import Layout from '../Layout';
import LayoutHeading from '../LayoutHeading';
import UsersPage from './UsersPage';

export default function UsersPageLayout(): React.Node {
  return (
    <Layout>
      <LayoutHeading
        heading={
          <Heading>
            <fbt desc="list of users title">List of users</fbt>
          </Heading>
        }
      />

      <pre>TODO (view users, change permissions)</pre>

      <UsersPage />
    </Layout>
  );
}
