// @flow

import { graphql, useFragment } from '@adeira/relay';
import React, { type Node } from 'react';
import fbt from 'fbt';

import MenuHeading from './components/MenuHeading';
import MenuRow from './components/MenuRow';
import type { MenuSectionSpecialities$key } from './__generated__/MenuSectionSpecialities.graphql';

type Props = {
  +menuData: MenuSectionSpecialities$key,
};

export default function MenuSectionSpecialities(props: Props): Node {
  const data = useFragment(
    graphql`
      fragment MenuSectionSpecialities on MenuQuery {
        specialitiesMenu: menu(clientLocale: $clientLocale, section: SPECIALITIES) {
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
        <fbt desc="specialities subtitle in our menu">Specialities</fbt>
      </MenuHeading>

      {data.specialitiesMenu.map((speciality) => (
        <MenuRow key={speciality.id} menuRowData={speciality} />
      ))}
    </>
  );
}
