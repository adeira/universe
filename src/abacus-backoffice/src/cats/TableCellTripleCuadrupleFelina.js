// @flow

import { graphql, useFragment } from '@adeira/relay';
import { MissingData, Tooltip } from '@adeira/sx-design';
import { type Node } from 'react';

import type { TableCellTripleCuadrupleFelinaFragment$key } from './__generated__/TableCellTripleCuadrupleFelinaFragment.graphql';

type Props = {
  +data: TableCellTripleCuadrupleFelinaFragment$key,
};

export default function TableCellTripleCuadrupleFelina(props: Props): Node {
  const data = useFragment(
    graphql`
      fragment TableCellTripleCuadrupleFelinaFragment on CatInfo {
        dateOfVaccinationTripleFelina
        dateOfVaccinationCuadrupleFelina
      }
    `,
    props.data,
  );

  if (data.dateOfVaccinationCuadrupleFelina != null) {
    return <Tooltip title="cuadruple felina">{data.dateOfVaccinationCuadrupleFelina}</Tooltip>;
  } else if (data.dateOfVaccinationTripleFelina != null) {
    return <Tooltip title="triple felina">{data.dateOfVaccinationTripleFelina}</Tooltip>;
  }
  return <MissingData />;
}
