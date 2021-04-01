// @flow

import { graphql, useFragment } from '@adeira/relay';
import React, { type Node } from 'react';
import fbt from 'fbt';

import MenuHeading from './components/MenuHeading';
import MenuRow from './components/MenuRow';
import type { MenuSectionKochkadaSweet$key } from './__generated__/MenuSectionKochkadaSweet.graphql';

type Props = {
  +menuData: MenuSectionKochkadaSweet$key,
};

export default function MenuSectionKochkadaSweet(props: Props): Node {
  const data = useFragment(
    graphql`
      fragment MenuSectionKochkadaSweet on MenuQuery {
        kochkadaSweetMenu: menu(clientLocale: $clientLocale, section: DUMPLING_SWEET) {
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
        <fbt desc="sweet kochkadas subtitle in our menu">Sweet Kochkadas</fbt>
      </MenuHeading>

      {data.kochkadaSweetMenu.map((kochkada) => (
        <MenuRow key={kochkada.id} menuRowData={kochkada} />
      ))}
    </>
  );
}
