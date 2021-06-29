// @flow

import { graphql, useFragment } from '@adeira/relay';
import React, { type Node } from 'react';
import fbt from 'fbt';

import MenuHeading from './components/MenuHeading';
import MenuRow from './components/MenuRow';
import type { MenuSectionDumplingSavory$key } from './__generated__/MenuSectionDumplingSavory.graphql';

type Props = {
  +menuData: MenuSectionDumplingSavory$key,
};

export default function MenuSectionDumplingSavory(props: Props): Node {
  const data = useFragment<MenuSectionDumplingSavory$key>(
    graphql`
      fragment MenuSectionDumplingSavory on MenuQuery {
        dumplingSavoryMenu: menu(clientLocale: $clientLocale, section: DUMPLING_SAVORY) {
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
        <fbt desc="savory dumplings subtitle in our menu">Savory Dumplings</fbt>
      </MenuHeading>

      {data.dumplingSavoryMenu.map((dumpling) => (
        <MenuRow key={dumpling.id} menuRowData={dumpling} />
      ))}
    </>
  );
}
