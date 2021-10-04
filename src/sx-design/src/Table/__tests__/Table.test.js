/**
 * @flow
 * @jest-environment jsdom
 */

import React from 'react';
import fbt from 'fbt';

import Table from '../Table';
import Text from '../../Text/Text';
import { render, initFbt } from '../../test-utils';

beforeEach(() => {
  initFbt();
});

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

  expect(getByText('Column 1')).toBeInTheDocument();
  expect(getByText('Column 2')).toBeInTheDocument();

  expect(getByText('Row 1, column 1')).toBeInTheDocument();
  expect(getByText('Row 1, column 2')).toBeInTheDocument();
  expect(getByText('Row 2, column 1')).toBeInTheDocument();
  expect(getByText('Row 2, column 2')).toBeInTheDocument();
});

it('renders complex headers and cells without any issues', () => {
  const { getByText } = render(
    <Table
      columns={[
        {
          Header: (
            <fbt desc="c1" doNotExtract={true}>
              Column 1
            </fbt>
          ),
          accessor: 'col1',
        },
        { Header: () => null, accessor: 'col2' },
      ]}
      data={[
        {
          col1: (
            <fbt desc="r1c1" doNotExtract={true}>
              Row 1, column 1
            </fbt>
          ),
          col2: <Text>Row 1, column 2</Text>,
        },
        {
          col1: <Text>Row 2, column 1</Text>,
          col2: (
            <fbt desc="r2c2" doNotExtract={true}>
              Row 2, column 2
            </fbt>
          ),
        },
      ]}
    />,
  );

  expect(getByText('Column 1')).toBeInTheDocument();
  // Column 2 is `null`

  expect(getByText('Row 1, column 1')).toBeInTheDocument();
  expect(getByText('Row 1, column 2')).toBeInTheDocument();
  expect(getByText('Row 2, column 1')).toBeInTheDocument();
  expect(getByText('Row 2, column 2')).toBeInTheDocument();
});
