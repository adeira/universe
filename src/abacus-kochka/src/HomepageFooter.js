// @flow

import { Link } from '@adeira/sx-design';
import * as React from 'react';
import sx from '@adeira/sx';
import fbt from 'fbt';

import LanguageSwitch from './LanguageSwitch';

export default function HomepageFooter(): React.Node {
  return (
    <div className={styles('wrapper')}>
      <strong>
        <fbt desc="opening hours">Tuesday - Sunday 10am - 8pm</fbt>
      </strong>

      <div>
        <Link href="https://goo.gl/maps/PN5JyDDvzUFmZH5r5" xstyle={styles.link}>
          <fbt desc="address">Calle Tonalá 346, Roma Sur, Cuauhtémoc, 06760, CDMX, Mexico</fbt>
        </Link>
      </div>

      <div className={styles('languageSwitch')}>
        <LanguageSwitch />
      </div>
    </div>
  );
}

const styles = sx.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    marginBlock: 10,
  },
  languageSwitch: {
    marginBlockStart: 20,
  },
  link: {
    color: 'rgba(var(--font-color-light))',
  },
});
