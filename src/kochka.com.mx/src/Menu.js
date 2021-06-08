// @flow

import React, { type Node } from 'react';
import sx from '@adeira/sx';
import { Section } from '@adeira/sx-design';

import MenuSectionCoffee from './menu/MenuSectionCoffee';
import MenuSectionDumplingSavory from './menu/MenuSectionDumplingSavory';
import MenuSectionDumplingSweet from './menu/MenuSectionDumplingSweet';
import MenuSectionMilkshake from './menu/MenuSectionMilkshake';
import MenuSectionSpecialities from './menu/MenuSectionSpecialities';
import MenuSectionTea from './menu/MenuSectionTea';

export default function Menu(): Node {
  return (
    <div className={styles('menuGrid')}>
      <Section xstyle={styles.menuGridAreaCoffee}>
        <MenuSectionCoffee />
      </Section>

      <Section xstyle={styles.menuGridAreaTea}>
        <MenuSectionTea />
      </Section>

      <Section xstyle={styles.menuGridAreaMilkshakes}>
        <MenuSectionMilkshake />
      </Section>

      <Section xstyle={styles.menuGridAreaSpecialities}>
        <MenuSectionSpecialities />
      </Section>

      <Section xstyle={styles.menuGridAreaDumplingSweet}>
        <MenuSectionDumplingSweet />
      </Section>

      <Section xstyle={styles.menuGridAreaDumplingSavory}>
        <MenuSectionDumplingSavory />
      </Section>
    </div>
  );
}

const styles = sx.create({
  menuGrid: {
    margin: '0 auto',
    display: 'grid',
    gap: '2rem',
    gridTemplate: `
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
