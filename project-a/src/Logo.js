// @flow

import * as React from 'react';
import * as sx from '@adeira/sx';

import Heading from './design/Heading';
import KochkaIcon from './design/svg/KochkaIcon';

export default function Logo(): React.Node {
  return (
    <div className={styles('logoWrapper')}>
      <KochkaIcon />

      <div className={styles('heading')}>
        <Heading className={styles('kochka')}>
          KOCHKA
          <span className={styles('cafe')}>
            {/* TODO: this should be even lighter (fontWeight:100) */}
            CAFÉ
          </span>
        </Heading>
      </div>
    </div>
  );
}

const styles = sx.create({
  logoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  heading: {
    marginTop: 40,
    fontFamily: 'GidoleKochka',
  },
  kochka: {
    fontSize: 60,
    letterSpacing: '.8rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  cafe: {
    fontSize: 25,
    letterSpacing: '.4rem',
  },
});
