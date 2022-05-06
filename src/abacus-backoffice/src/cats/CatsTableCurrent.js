// @flow

import { graphql, useFragment } from '@adeira/relay';
import { MissingData, Table, Tooltip } from '@adeira/sx-design';
import fbt from 'fbt';
import { type Node } from 'react';

import TableCellTripleCuadrupleFelina from './TableCellTripleCuadrupleFelina';
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
          canBeAdopted
          dateOfCastration
          dateOfDeworming
          dateOfVaccinationRabies
          ...TableCellTripleCuadrupleFelinaFragment
          dateOfVaccinationLeucemiaFelina
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
        {
          Header: <fbt desc="rabies vaccination (table header)">Rabies vaccination</fbt>,
          accessor: 'col5',
        },
        {
          Header: (
            <fbt desc="vaccination triple/cuadruple felina (table header)">
              Vaccination &quot;triple/cuadruple felina&quot;
            </fbt>
          ),
          accessor: 'col6',
        },
        {
          Header: (
            <fbt desc="vaccination leucemia felina (table header)">
              Vaccination &quot;leucemia felina&quot;
            </fbt>
          ),
          accessor: 'col7',
        },
      ]}
      data={cats.currentCats.map((cat) => {
        return {
          col1: `#${cat.order}`,
          col2: (
            <>
              {cat.name}
              {cat.canBeAdopted === false ? (
                <>
                  {' '}
                  <Tooltip
                    title={
                      <fbt desc="explanation of a cat that cannot be adopted">
                        This cat cannot be adopted because it is ours.
                      </fbt>
                    }
                  >
                    ❤️
                  </Tooltip>
                </>
              ) : null}
            </>
          ),
          col3: cat.dateOfCastration ?? <MissingData />, // TODO: display with warning/error when around 4 months old
          col4: cat.dateOfDeworming ?? <MissingData />, // TODO: display with warning/error
          col5: cat.dateOfVaccinationRabies ?? <MissingData />,
          col6: <TableCellTripleCuadrupleFelina data={cat} />,
          col7: cat.dateOfVaccinationLeucemiaFelina ?? <MissingData />,
        };
      })}
    />
  );
}
