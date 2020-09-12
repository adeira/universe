// @flow

import * as React from 'react';
import * as sx from '@adeira/sx';
import fbt from 'fbt';

export default function Footer(): React.Node {
  return (
    <>
      <strong>
        <fbt desc="opening hours">Monday - Friday 8am - 6pm</fbt>
      </strong>
      <div className={styles('address')}>
        <a href="https://goo.gl/maps/2jh2w78yFTPEDSrS6">
          <fbt desc="address">
            Av. Coyoacán 2000, Xoco, Benito Juárez, 03330 Ciudad de México, CDMX, Mexico
          </fbt>
        </a>
      </div>
    </>
  );
}

const styles = sx.create({
  address: {
    textAlign: 'center',
  },
});
