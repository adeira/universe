// @flow

import { graphql, useFragment } from '@adeira/relay';
import React, { type Node } from 'react';
import fbt from 'fbt';

import MenuHeading from './components/MenuHeading';
import MenuRow from './components/MenuRow';
import type { MenuSectionTea$key } from './__generated__/MenuSectionTea.graphql';

type Props = {
  +menuData: MenuSectionTea$key,
};

export default function MenuSectionTea(props: Props): Node {
  const data = useFragment(
    graphql`
      fragment MenuSectionTea on MenuQuery {
        teaMenu: menu(clientLocale: $clientLocale, section: TEA) {
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
        <fbt desc="organic tea subtitle in our menu">Organic tea blends</fbt>
      </MenuHeading>

      {data.teaMenu.map((tea) => (
        <MenuRow key={tea.id} menuRowData={tea} />
      ))}
    </>
  );
}
