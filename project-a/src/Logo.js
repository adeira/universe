// @flow

import * as React from 'react';
import * as sx from '@adeira/sx';

import Heading from './components/Heading';
import KochkaIcon from './svg/KochkaIcon';

export function Logo(): React.Node {
  return (
    <div className={styles('logo')}>
      <KochkaIcon />

      <div className={styles('text')}>
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
  logo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  text: {
    marginTop: 60,
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
