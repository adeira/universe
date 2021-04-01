// @flow

import React, { type Node } from 'react';
import fbt from 'fbt';
import { useFragment, graphql } from '@adeira/relay';

import MenuHeading from './components/MenuHeading';
import MenuRow from './components/MenuRow';
import type { MenuSectionCoffee$key } from './__generated__/MenuSectionCoffee.graphql';

type Props = {
  +menuData: MenuSectionCoffee$key,
};

export default function MenuSectionCoffee(props: Props): Node {
  const data = useFragment(
    graphql`
      fragment MenuSectionCoffee on MenuQuery {
        coffeeMenu: menu(clientLocale: $clientLocale, section: COFFEE) {
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
        <fbt desc="coffee subtitle in our menu">Coffee drinks</fbt>
      </MenuHeading>

      {data.coffeeMenu.map((coffee) => (
        <MenuRow key={coffee.id} menuRowData={coffee} />
      ))}
    </>
  );
}
