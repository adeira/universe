// @flow

import { Table } from '@adeira/sx-design';
import * as React from 'react';
import { graphql, useLazyLoadQuery } from '@adeira/relay';
import fbt from 'fbt';

import type { CatsPageQuery } from './__generated__/CatsPageQuery.graphql';

export default function CatsPage(): React.Node {
  const data = useLazyLoadQuery<CatsPageQuery>(graphql`
    query CatsPageQuery {
      cats {
        listAllCats {
          name
        }
      }
    }
  `);

  return (
    <Table
      columns={[
        {
          Header: <fbt desc="order of the cat (table header)">Order</fbt>,
          accessor: 'col1',
        },
        {
          Header: <fbt desc="name of the cat (table header)">Name of the cat</fbt>,
          accessor: 'col2',
        },
        {
          Header: (
            <fbt desc="date when the cat castration was performed (table header)">
              Date of castration
            </fbt>
          ),
          accessor: 'col3',
        },
        {
          Header: (
            <fbt desc="date of the last deworming (table header)">Date of last deworming</fbt>
          ),
          accessor: 'col4',
        },
        {
          Header: <fbt desc="date of the cat adoption (table header)">Date of adoption</fbt>,
          accessor: 'col5',
        },
      ]}
      data={data.cats.listAllCats.map((cat) => {
        return {
          col1: <em>todo</em>,
          col2: cat.name,
          col3: <em>todo</em>,
          col4: <em>todo</em>,
          col5: <em>todo</em>,
        };
      })}
    />
  );
}
