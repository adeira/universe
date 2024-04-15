// @flow

import fbt from 'fbt';
import React, { type Node } from 'react';

import Table from './Table';
import { initFbt } from '../test-utils';

export default {
  component: Table,
  title: 'Components/Table',
  tags: ['autodocs'],
};

initFbt();

const demoColumns = [
  {
    Header: (
      <fbt desc="column 1" doNotExtract={true}>
        Column 1
      </fbt>
    ),
    accessor: 'col1', // accessor is the "key" in the data
  },
  { Header: 'Column 2', accessor: 'col2' },
  { Header: 'Column 3', accessor: 'col3' },
];

const demoData = [
  {
    col1: (
      <fbt desc="r1c1" doNotExtract={true}>
        Row 1, column 1
      </fbt>
    ),
    col2: 'Row 1, column 2',
    col3: 'Row 1, column 3',
  },
  { col1: 'Row 2, column 1', col2: 'Row 2, column 2', col3: 'Row 2, column 3' },
  { col1: 'Row 3, column 1', col2: 'Row 3, column 2', col3: 'Row 3, column 3' },
  { col1: 'Row 4, column 1', col2: 'Row 4, column 2', col3: 'Row 4, column 3' },
  { col1: 'Row 5, column 1', col2: 'Row 5, column 2', col3: 'Row 5, column 3' },
];

const DefaultTemplate = () => {
  const columns = React.useMemo(() => demoColumns, []);
  const data = React.useMemo(() => demoData, []);
  return <Table columns={columns} data={data} />;
};

export const Default = {
  render: (): Node => <DefaultTemplate />,
};
