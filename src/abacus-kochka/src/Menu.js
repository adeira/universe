// @flow

import { graphql, useFragment } from '@adeira/relay';
import { MediaQueryDevice } from '@adeira/sx-design';
import fbt from 'fbt';
import React, { type Node } from 'react';
import sx from '@adeira/sx';

import Layout from './Layout';
import MenuSectionCiabattas from './menu/MenuSectionCiabattas';
import MenuSectionCoffee from './menu/MenuSectionCoffee';
import MenuSectionKochkadas from './menu/MenuSectionKochkadas';
import MenuSectionOthers from './menu/MenuSectionOthers';
import MenuSectionSpecialities from './menu/MenuSectionSpecialities';
import MenuSectionTea from './menu/MenuSectionTea';
import type { MenuFragment$key } from './__generated__/MenuFragment.graphql';

type Props = {
  +relayFragmentRef: MenuFragment$key,
};

export const MenuQuery = graphql`
  query MenuQuery($clientLocale: SupportedLocale!) {
    ...MenuFragment
  }
`;

export default function Menu(props: Props): Node {
  const data = useFragment(
    graphql`
      fragment MenuFragment on Query {
        menu {
          ...MenuSectionCoffee
          ...MenuSectionTea
          ...MenuSectionSpecialities
          ...MenuSectionOthers
          ...MenuSectionKochkadas
          ...MenuSectionCiabattas
        }
      }
    `,
    props.relayFragmentRef,
  );

  return (
    <Layout
      title={<fbt desc="menu page title">Café menu</fbt>}
      subtitle={<fbt desc="menu page subtitle">What do we offer</fbt>}
    >
      <div className={styles('menuGrid')}>
        <div className={styles('menuGridAreaCoffee')}>
          <MenuSectionCoffee menuData={data.menu} />
        </div>

        <div className={styles('menuGridAreaTea')}>
          <MenuSectionTea menuData={data.menu} />
        </div>

        <div className={styles('menuGridAreaSpecialities')}>
          <MenuSectionSpecialities menuData={data.menu} />
        </div>

        <div className={styles('menuGridAreaOthers')}>
          <MenuSectionOthers menuData={data.menu} />
        </div>

        <div className={styles('menuGridAreaKochkadas')}>
          <MenuSectionKochkadas menuData={data.menu} />
        </div>

        <div className={styles('menuGridAreaCiabattas')}>
          <MenuSectionCiabattas menuData={data.menu} />
        </div>
      </div>
    </Layout>
  );
}

const styles = sx.create({
  menuGrid: {
    margin: '0 auto',
    display: 'grid',
    gap: '2rem',
    gridTemplateAreas: `
      "coffee"
      "tea"
      "specialities"
      "others"
      "kochkadas"
      "ciabattas"
    `,
    [MediaQueryDevice.DESKTOP]: {
      gridTemplateColumns: '1fr 1fr',
      gridTemplateAreas: `
        "coffee tea"
        "specialities others"
        "kochkadas ciabattas"
      `,
    },
  },
  menuGridAreaCoffee: {
    gridArea: 'coffee',
  },
  menuGridAreaTea: {
    gridArea: 'tea',
  },
  menuGridAreaSpecialities: {
    gridArea: 'specialities',
  },
  menuGridAreaOthers: {
    gridArea: 'others',
  },
  menuGridAreaKochkadas: {
    gridArea: 'kochkadas',
  },
  menuGridAreaCiabattas: {
    gridArea: 'ciabattas',
  },
});
