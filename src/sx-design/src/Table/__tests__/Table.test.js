/**
 * @flow
 * @jest-environment jsdom
 */

import React from 'react';

import { render } from '../../test-utils';
import Table from '../Table';

it('renders simple table without any issues', () => {
  const { getByText } = render(
    <Table
      columns={[
        { Header: 'Column 1', accessor: 'col1' },
        { Header: 'Column 2', accessor: 'col2' },
      ]}
      data={[
        { col1: 'Row 1, column 1', col2: 'Row 1, column 2' },
        { col1: 'Row 2, column 1', col2: 'Row 2, column 2' },
      ]}
    />,
  );

  expect(getByText('Column 1')).toBeDefined();
  expect(getByText('Column 2')).toBeDefined();

  expect(getByText('Row 1, column 1')).toBeDefined();
  expect(getByText('Row 1, column 2')).toBeDefined();
  expect(getByText('Row 2, column 1')).toBeDefined();
  expect(getByText('Row 2, column 2')).toBeDefined();
});
