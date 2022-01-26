// @flow

import { MissingData, Table, Tooltip } from '@adeira/sx-design';
import fbt from 'fbt';
import { type Node } from 'react';
import { useFragment, graphql } from '@adeira/relay';

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
          dateOfVaccinationTripleFelina
          dateOfVaccinationCuadrupleFelina
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
          Header: <fbt desc="date of the cat adoption (table header)">Date of adoption</fbt>,
          accessor: 'col5',
        },
        {
          Header: <fbt desc="rabies vaccination (table header)">Rabies vaccination</fbt>,
          accessor: 'col6',
        },
        {
          Header: (
            <fbt desc="vaccination triple felina (table header)">
              Vaccination &quot;triple felina&quot;
            </fbt>
          ),
          accessor: 'col7',
        },
        {
          Header: () => (
            <Tooltip
              title={
                <fbt desc="tooltip explanation of the cuadruple felina vaccination">
                  Vaccine against rhinotracheitis, calicivirus, panleukopenia and clamidiosis.
                </fbt>
              }
            >
              <fbt desc="vaccination cuadruple felina (table header)">
                Vaccination &quot;cuadruple felina&quot;
              </fbt>
            </Tooltip>
          ),
          accessor: 'col8',
        },
      ]}
      data={cats.adoptedCats.map((cat) => {
        return {
          col1: `#${cat.order}`,
          col2: cat.name,
          col3: cat.dateOfCastration ?? <MissingData />,
          col4: cat.dateOfDeworming ?? <MissingData />,
          col5: cat.dateOfAdoption ?? <MissingData />,
          col6: cat.dateOfVaccinationRabies ?? <MissingData />,
          col7: cat.dateOfVaccinationTripleFelina ?? <MissingData />,
          col8: cat.dateOfVaccinationCuadrupleFelina ?? <MissingData />,
        };
      })}
    />
  );
}
