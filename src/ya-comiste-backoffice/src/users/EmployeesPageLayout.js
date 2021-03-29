// @flow

import { Heading } from '@adeira/sx-design';
import fbt from 'fbt';
import * as React from 'react';

import Layout from '../Layout';
import LayoutHeading from '../LayoutHeading';
import EmployeesPage from './EmployeesPage';

export default function EmployeesPageLayout(): React.Node {
  return (
    <Layout>
      <LayoutHeading
        heading={
          <Heading>
            <fbt desc="list of employees title">List of employees</fbt>
          </Heading>
        }
      />

      <pre>TODO (view employees, change permissions)</pre>

      <EmployeesPage />
    </Layout>
  );
}
