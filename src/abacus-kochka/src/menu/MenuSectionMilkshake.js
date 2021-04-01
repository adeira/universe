// @flow

import { graphql, useFragment } from '@adeira/relay';
import React, { type Node } from 'react';
import fbt from 'fbt';

import MenuHeading from './components/MenuHeading';
import MenuRow from './components/MenuRow';
import type { MenuSectionMilkshake$key } from './__generated__/MenuSectionMilkshake.graphql';

type Props = {
  +menuData: MenuSectionMilkshake$key,
};

export default function MenuSectionMilkshake(props: Props): Node {
  const data = useFragment(
    graphql`
      fragment MenuSectionMilkshake on MenuQuery {
        milkshakesMenu: menu(clientLocale: $clientLocale, section: MILKSHAKES) {
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
        <fbt desc="milkshakes subtitle in our menu">Milkshakes</fbt>
      </MenuHeading>

      {data.milkshakesMenu.map((milkshake) => (
        <MenuRow key={milkshake.id} menuRowData={milkshake} />
      ))}
    </>
  );
}
