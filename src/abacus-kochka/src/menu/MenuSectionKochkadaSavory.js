// @flow

import { graphql, useFragment } from '@adeira/relay';
import React, { type Node } from 'react';
import fbt from 'fbt';

import MenuHeading from './components/MenuHeading';
import MenuRow from './components/MenuRow';
import type { MenuSectionKochkadaSavory$key } from './__generated__/MenuSectionKochkadaSavory.graphql';

type Props = {
  +menuData: MenuSectionKochkadaSavory$key,
};

export default function MenuSectionKochkadaSavory(props: Props): Node {
  const data = useFragment<MenuSectionKochkadaSavory$key>(
    graphql`
      fragment MenuSectionKochkadaSavory on MenuQuery {
        kochkadaSavoryMenu: menu(clientLocale: $clientLocale, section: DUMPLING_SAVORY) {
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
        <fbt desc="savory kochkadas subtitle in our menu">Savory Kochkadas</fbt>
      </MenuHeading>

      {data.kochkadaSavoryMenu.map((kochkada) => (
        <MenuRow key={kochkada.id} menuRowData={kochkada} />
      ))}
    </>
  );
}
