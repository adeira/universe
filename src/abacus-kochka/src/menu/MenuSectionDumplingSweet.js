// @flow

import { graphql, useFragment } from '@adeira/relay';
import React, { type Node } from 'react';
import fbt from 'fbt';

import MenuHeading from './components/MenuHeading';
import MenuRow from './components/MenuRow';
import type { MenuSectionDumplingSweet$key } from './__generated__/MenuSectionDumplingSweet.graphql';

type Props = {
  +menuData: MenuSectionDumplingSweet$key,
};

export default function MenuSectionDumplingSweet(props: Props): Node {
  const data = useFragment<MenuSectionDumplingSweet$key>(
    graphql`
      fragment MenuSectionDumplingSweet on MenuQuery {
        sumplingSweetMenu: menu(clientLocale: $clientLocale, section: DUMPLING_SWEET) {
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
        <fbt desc="sweet dumplings subtitle in our menu">Sweet Dumplings</fbt>
      </MenuHeading>

      {data.sumplingSweetMenu.map((dumpling) => (
        <MenuRow key={dumpling.id} menuRowData={dumpling} />
      ))}
    </>
  );
}
