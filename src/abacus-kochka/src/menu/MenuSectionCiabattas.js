// @flow

import { graphql, useFragment } from '@adeira/relay';
import React, { type Node } from 'react';
import fbt from 'fbt';

import MenuHeading from './components/MenuHeading';
import MenuRow from './components/MenuRow';
import type { MenuSectionCiabattas$key } from './__generated__/MenuSectionCiabattas.graphql';

type Props = {
  +menuData: MenuSectionCiabattas$key,
};

export default function MenuSectionCiabattas(props: Props): Node {
  const data = useFragment(
    graphql`
      fragment MenuSectionCiabattas on MenuQuery {
        ciabattasMenu: menu(clientLocale: $clientLocale, section: CIABATTAS) {
          id
          ...MenuRow
        }
      }
    `,
    props.menuData,
  );

  return (
    <>
      <MenuHeading>
        <fbt desc="ciabattas subtitle in our menu">Ciabattas</fbt>
      </MenuHeading>

      {data.ciabattasMenu.map((ciabatta) => (
        <MenuRow key={ciabatta.id} menuRowData={ciabatta} />
      ))}
    </>
  );
}
