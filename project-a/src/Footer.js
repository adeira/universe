// @flow

import * as React from 'react';
import sx from '@adeira/sx';
import fbt from 'fbt';

import LanguageSwitch from './LanguageSwitch';

export default function Footer(): React.Node {
  return (
    <div className={styles('wrapper')}>
      <strong>
        <fbt desc="opening hours">Monday - Friday 8am - 6pm</fbt>
      </strong>

      <div>
        <a href="https://goo.gl/maps/2jh2w78yFTPEDSrS6">
          <fbt desc="address">
            Av. Coyoacán 2000, Xoco, Benito Juárez, 03330 Ciudad de México, CDMX, Mexico
          </fbt>
        </a>
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
    marginTop: 10,
    marginBottom: 10,
  },
  languageSwitch: {
    marginTop: 20,
  },
});
