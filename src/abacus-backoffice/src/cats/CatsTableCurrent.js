// @flow

import { graphql, useFragment } from '@adeira/relay';
import { MissingData, Table, Tooltip, DateTime, Text, LayoutBlock } from '@adeira/sx-design';
import fbt from 'fbt';
import React, { type Node } from 'react';

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
    <LayoutBlock spacing="none">
      <Text as="h2">
        <fbt desc="title of a section of currently available cats">
          Currently available cats (<fbt:param name="numberOfCurrentlyAvailableCats">
            {cats.currentCats.length}
          </fbt:param>)
        </fbt>
      </Text>
      <p>
        <fbt desc="description of a section of currently available cats">
          List of cats currently living in KOCHKA Café.
        </fbt>
      </p>
      <Table
        columns={[
          {
            Header: <fbt desc="order of the cat (table header)">Order</fbt>,
            accessor: 'order',
          },
          {
            Header: <fbt desc="name of the cat (table header)">Name of the cat</fbt>,
            accessor: 'name',
          },
          {
            Header: (
              <fbt desc="date when the cat castration was performed (table header)">
                Date of castration
              </fbt>
            ),
            accessor: 'date_of_castration',
          },
          {
            Header: (
              <fbt desc="date of the last deworming (table header)">Date of last deworming</fbt>
            ),
            accessor: 'date_of_deworming',
          },
          {
            Header: <fbt desc="rabies vaccination (table header)">Rabies vaccination</fbt>,
            accessor: 'date_of_rabies_vaccination',
          },
          {
            Header: (
              <fbt desc="vaccination triple/cuadruple felina (table header)">
                Vaccination &quot;triple/cuadruple felina&quot;
              </fbt>
            ),
            accessor: 'date_of_cuadruple_feline_vacination',
          },
          {
            Header: (
              <fbt desc="vaccination leucemia felina (table header)">
                Vaccination &quot;leucemia felina&quot;
              </fbt>
            ),
            accessor: 'date_of_leucamia_vacination',
          },
        ]}
        data={cats.currentCats.map((cat) => {
          return {
            order: `#${cat.order}`,
            name: (
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
            date_of_castration:
              // TODO: display with warning/error when around 4 months old
              cat.dateOfCastration != null ? (
                <DateTime value={cat.dateOfCastration} />
              ) : (
                <MissingData />
              ),
            date_of_deworming:
              // TODO: display with warning/error
              cat.dateOfDeworming != null ? (
                <DateTime value={cat.dateOfDeworming} />
              ) : (
                <MissingData />
              ),
            date_of_rabies_vaccination:
              cat.dateOfVaccinationRabies != null ? (
                <DateTime value={cat.dateOfVaccinationRabies} />
              ) : (
                <MissingData />
              ),
            date_of_cuadruple_feline_vacination: <TableCellTripleCuadrupleFelina data={cat} />,
            date_of_leucamia_vacination:
              cat.dateOfVaccinationLeucemiaFelina != null ? (
                <DateTime value={cat.dateOfVaccinationLeucemiaFelina} />
              ) : (
                <MissingData />
              ),
          };
        })}
      />
    </LayoutBlock>
  );
}
