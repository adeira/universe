// @flow

import { graphql, useFragment } from '@adeira/relay';
import { MissingData, Table } from '@adeira/sx-design';
import fbt from 'fbt';
import { type Node } from 'react';

import type { CatsTableCurrentFragment$key } from './__generated__/CatsTableCurrentFragment.graphql';

type Props = {
  +data: CatsTableCurrentFragment$key,
};

export default function CatsTableCurrent(props: Props): Node {
  const cats = useFragment(
    graphql`
      fragment CatsTableCurrentFragment on CatsQuery {
        currentCats: listAllCats(allCatsFilter: { adopted: false }) {
          order
          name
          dateOfCastration
          dateOfDeworming
        }
      }
    `,
    props.data,
  );

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
      ]}
      data={cats.currentCats.map((cat) => {
        return {
          col1: `#${cat.order}`,
          col2: cat.name,
          col3: cat.dateOfCastration ?? <MissingData />, // TODO: display with warning/error when around 4 months old
          col4: cat.dateOfDeworming ?? <MissingData />, // TODO: display with warning/error
        };
      })}
    />
  );
}
