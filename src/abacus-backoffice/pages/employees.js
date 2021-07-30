// @flow

import React, { type Element, type Node } from 'react';

import EmployeesPageLayout from '../src/employees/EmployeesPageLayout';
import LayoutApp from '../src/LayoutApp';

export default function EmployeesPage(): Node {
  return <EmployeesPageLayout />;
}

EmployeesPage.getLayout = (page: Element<typeof EmployeesPage>): Element<typeof LayoutApp> => (
  <LayoutApp>{page}</LayoutApp>
);
