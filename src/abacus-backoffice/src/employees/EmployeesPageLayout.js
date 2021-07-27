// @flow

import fbt from 'fbt';
import * as React from 'react';

import LayoutPage from '../LayoutPage';
import EmployeesPage from './EmployeesPage';

export default function EmployeesPageLayout(): React.Node {
  return (
    <LayoutPage isBeta={true} heading={<fbt desc="list of employees title">List of employees</fbt>}>
      <EmployeesPage />
    </LayoutPage>
  );
}
