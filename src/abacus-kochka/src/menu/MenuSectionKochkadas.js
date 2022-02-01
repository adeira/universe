// @flow

import { graphql, useFragment } from '@adeira/relay';
import React, { type Node } from 'react';
import fbt from 'fbt';

import MenuHeading from './components/MenuHeading';
import MenuRow from './components/MenuRow';
import type { MenuSectionKochkadas$key } from './__generated__/MenuSectionKochkadas.graphql';

type Props = {
  +menuData: MenuSectionKochkadas$key,
};

export default function MenuSectionKochkadas(props: Props): Node {
  const data = useFragment(
    graphql`
      fragment MenuSectionKochkadas on MenuQuery {
        kochkadasMenu: menu(clientLocale: $clientLocale, section: KOCHKADAS) {
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
        <fbt desc="kochkadas subtitle in our menu">Kochkadas</fbt>
      </MenuHeading>

      {data.kochkadasMenu.map((kochkada) => (
        <MenuRow key={kochkada.id} menuRowData={kochkada} />
      ))}
    </>
  );
}
