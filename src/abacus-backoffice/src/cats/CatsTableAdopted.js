// @flow

import { MissingData, Table, DateTime, LayoutBlock, Text } from '@adeira/sx-design';
import fbt from 'fbt';
import { useFragment, graphql } from '@adeira/relay';
import React, { type Node } from 'react';

import TableCellTripleCuadrupleFelina from './TableCellTripleCuadrupleFelina';
import type { CatsTableAdoptedFragment$key } from './__generated__/CatsTableAdoptedFragment.graphql';

type Props = {
  +data: CatsTableAdoptedFragment$key,
};

export default function CatsTableAdopted(props: Props): Node {
  const cats = useFragment(
    graphql`
      fragment CatsTableAdoptedFragment on CatsQuery {
        adoptedCats: listAllCats(allCatsFilter: { adopted: true }) {
          order
          name
          dateOfCastration
          dateOfDeworming
          dateOfAdoption
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
        <fbt desc="title of a section of already adopted cats">
          Adopted cats (<fbt:param name="numberOfAdoptedCats">{cats.adoptedCats.length}</fbt:param>)
        </fbt>
      </Text>
      <p>
        <fbt desc="description of a section of already adopted cats">
          List of cats that are no longer in KOCHKA Café because they were adopted.
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
            Header: <fbt desc="date of the cat adoption (table header)">Date of adoption</fbt>,
            accessor: 'date_of_adoption',
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
        data={cats.adoptedCats.map((cat) => {
          return {
            order: `#${cat.order}`,
            name: cat.name,
            date_of_castration:
              cat.dateOfCastration != null ? (
                <DateTime value={cat.dateOfCastration} />
              ) : (
                <MissingData />
              ),
            date_of_deworming:
              cat.dateOfDeworming != null ? (
                <DateTime value={cat.dateOfDeworming} />
              ) : (
                <MissingData />
              ),
            date_of_adoption:
              cat.dateOfAdoption != null ? (
                <DateTime value={cat.dateOfAdoption} />
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
