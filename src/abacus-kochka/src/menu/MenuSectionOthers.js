// @flow

import { graphql, useFragment } from '@adeira/relay';
import React, { type Node } from 'react';
import fbt from 'fbt';

import MenuHeading from './components/MenuHeading';
import MenuRow from './components/MenuRow';
import type { MenuSectionOthers$key } from './__generated__/MenuSectionOthers.graphql';

type Props = {
  +menuData: MenuSectionOthers$key,
};

export default function MenuSectionOthers(props: Props): Node {
  const data = useFragment(
    graphql`
      fragment MenuSectionOthers on MenuQuery {
        othersMenu: menu(clientLocale: $clientLocale, section: OTHERS) {
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
        <fbt desc="others subtitle in our menu">Others</fbt>
      </MenuHeading>

      {data.othersMenu.map((other) => (
        <MenuRow key={other.id} menuRowData={other} />
      ))}
    </>
  );
}
