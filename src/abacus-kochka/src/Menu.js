// @flow

import { QueryRenderer, graphql } from '@adeira/relay';
import React, { type Node } from 'react';
import sx from '@adeira/sx';

import MenuLoader from './menu/MenuLoader';
import MenuSectionCiabattas from './menu/MenuSectionCiabattas';
import MenuSectionCoffee from './menu/MenuSectionCoffee';
import MenuSectionKochkadas from './menu/MenuSectionKochkadas';
import MenuSectionOthers from './menu/MenuSectionOthers';
import MenuSectionSpecialities from './menu/MenuSectionSpecialities';
import MenuSectionTea from './menu/MenuSectionTea';
import useViewerContext from './hooks/useViewerContext';

export default function Menu(): Node {
  const viewerContext = useViewerContext();

  return (
    <QueryRenderer
      query={graphql`
        query MenuQuery($clientLocale: SupportedLocale!) {
          menu {
            ...MenuSectionCoffee
            ...MenuSectionTea
            ...MenuSectionSpecialities
            ...MenuSectionOthers
            ...MenuSectionKochkadas
            ...MenuSectionCiabattas
          }
        }
      `}
      variables={{
        clientLocale: viewerContext.languageTag.graphql,
      }}
      fetchPolicy="store-and-network"
      onLoading={() => <MenuLoader />}
      onResponse={(relayProps) => {
        return (
          <div className={styles('menuGrid')}>
            <div className={styles('menuGridAreaCoffee')}>
              <MenuSectionCoffee menuData={relayProps.menu} />
            </div>

            <div className={styles('menuGridAreaTea')}>
              <MenuSectionTea menuData={relayProps.menu} />
            </div>

            <div className={styles('menuGridAreaSpecialities')}>
              <MenuSectionSpecialities menuData={relayProps.menu} />
            </div>

            <div className={styles('menuGridAreaOthers')}>
              <MenuSectionOthers menuData={relayProps.menu} />
            </div>

            <div className={styles('menuGridAreaKochkadas')}>
              <MenuSectionKochkadas menuData={relayProps.menu} />
            </div>

            <div className={styles('menuGridAreaCiabattas')}>
              <MenuSectionCiabattas menuData={relayProps.menu} />
            </div>
          </div>
        );
      }}
    />
  );
}

const styles = sx.create({
  menuGrid: {
    'margin': '0 auto',
    'display': 'grid',
    'gap': '2rem',
    'gridTemplateAreas': `
      "coffee"
      "tea"
      "specialities"
      "others"
      "kochkadas"
      "ciabattas"
    `,
    '@media (min-width: 600px)': {
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
