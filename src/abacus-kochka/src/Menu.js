// @flow

import { QueryRenderer, graphql } from '@adeira/relay';
import React, { type Node } from 'react';
import sx from '@adeira/sx';

import MenuLoader from './menu/MenuLoader';
import MenuSectionCoffee from './menu/MenuSectionCoffee';
import MenuSectionDumplingSavory from './menu/MenuSectionDumplingSavory';
import MenuSectionDumplingSweet from './menu/MenuSectionDumplingSweet';
import MenuSectionMilkshake from './menu/MenuSectionMilkshake';
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
            ...MenuSectionMilkshake
            ...MenuSectionSpecialities
            ...MenuSectionDumplingSweet
            ...MenuSectionDumplingSavory
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

            <div className={styles('menuGridAreaMilkshakes')}>
              <MenuSectionMilkshake menuData={relayProps.menu} />
            </div>

            <div className={styles('menuGridAreaSpecialities')}>
              <MenuSectionSpecialities menuData={relayProps.menu} />
            </div>

            <div className={styles('menuGridAreaDumplingSweet')}>
              <MenuSectionDumplingSweet menuData={relayProps.menu} />
            </div>

            <div className={styles('menuGridAreaDumplingSavory')}>
              <MenuSectionDumplingSavory menuData={relayProps.menu} />
            </div>
          </div>
        );
      }}
    />
  );
}

const styles = sx.create({
  menuGrid: {
    margin: '0 auto',
    display: 'grid',
    gap: '2rem',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateAreas: `
      "coffee tea"
      "milkshakes specialities"
      "dumplingSweet dumplingSavory"
    `,
  },
  menuGridAreaCoffee: {
    gridArea: 'coffee',
  },
  menuGridAreaTea: {
    gridArea: 'tea',
  },
  menuGridAreaMilkshakes: {
    gridArea: 'milkshakes',
  },
  menuGridAreaSpecialities: {
    gridArea: 'specialities',
  },
  menuGridAreaDumplingSweet: {
    gridArea: 'dumplingSweet',
  },
  menuGridAreaDumplingSavory: {
    gridArea: 'dumplingSavory',
  },
});
