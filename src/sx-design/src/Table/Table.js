// @flow

import React, { type Node } from 'react';
import { useTable } from 'react-table';
import sx from '@adeira/sx';

// https://react-table.tanstack.com/docs/api/useTable#column-options
type Column = {
  +accessor: string,
  +Header: Fbt,
};

// https://react-table.tanstack.com/docs/api/useTable#table-options
type Props = {
  +columns: $ReadOnlyArray<Column>,
  +data: $ReadOnlyArray<{ +[string]: Fbt }>,
};

/**
 * A simple component for tabular data base on: https://react-table.tanstack.com/
 *
 * Important: both `columns` and `data` properties must be properly memoized to avoid unnecessary
 * and expensive table re-rendering. For example:
 *
 * ```js
 * const columns = React.useMemo(() => [
 *    { Header: 'Column 1', accessor: 'col1' },
 *    { Header: 'Column 2', accessor: 'col2' },
 * ], []);
 * ```
 */
export default function Table(props: Props): Node {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns: props.columns,
    data: props.data,
  });

  return (
    <table className={styles('table')} {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup, index) => {
          return (
            <tr key={index} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => {
                return (
                  <th key={column.id} className={styles('th')} {...column.getHeaderProps()}>
                    {column.render('Header')}
                  </th>
                );
              })}
            </tr>
          );
        })}
      </thead>

      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr key={row.id} {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td
                    key={`${cell.row.id}#${cell.column.id}`}
                    className={styles('td')}
                    {...cell.getCellProps()}
                  >
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

const styles = sx.create({
  table: {
    borderCollapse: 'separate',
    borderSpacing: 0,
    width: '100%',
  },
  th: {
    'backgroundColor': 'rgba(var(--sx-accent-1))',
    'color': 'rgba(var(--sx-accent-6))',
    'fontSize': '.8rem',
    'fontWeight': 400,
    'textAlign': 'start',
    'textTransform': 'uppercase',
    'padding': '10px 12px',
    'borderBlock': '1px solid rgba(var(--sx-accent-2))',
    ':first-child': {
      borderInlineStart: '1px solid rgba(var(--sx-accent-2))',
      borderStartStartRadius: 'var(--sx-radius)',
      borderEndStartRadius: 'var(--sx-radius)',
    },
    ':last-child': {
      borderInlineEnd: '1px solid rgba(var(--sx-accent-2))',
      borderEndEndRadius: 'var(--sx-radius)',
      borderStartEndRadius: 'var(--sx-radius)',
    },
  },
  td: {
    padding: '10px 12px',
    borderBlockEnd: '1px solid rgba(var(--sx-accent-1))',
    color: 'rgba(var(--sx-foreground))',
  },
});
