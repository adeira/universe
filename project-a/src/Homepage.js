// @flow

import * as React from 'react';
import * as sx from '@adeira/sx';
import fbt from 'fbt';

import { Logo } from './Logo';
import Navigation from './Homepage/Navigation';
import SocialMediaIcons from './Homepage/SocialMediaIcons';

export default function Homepage(): React.Node {
  return (
    <div className={styles('background')}>
      <div className={styles('backgroundOverlay')}>
        <Navigation />
        <div className={styles('root')}>
          <div className={styles('center')}>
            <Logo />

            <div>
              <fbt desc="catch phrase">REAL CATS + COFFEE + DUMPLINGS</fbt>
            </div>
          </div>

          <div className={styles('bottomInfo')}>
            {/* <p>TODO: contact (?)</p> */}
            <SocialMediaIcons />
            <strong>
              <fbt desc="opening hours">Monday - Friday 8am - 6pm</fbt>
            </strong>
            <a href="https://goo.gl/maps/2jh2w78yFTPEDSrS6">
              <fbt desc="address">
                Av. Coyoacán 2000, Xoco, Benito Juárez, 03330 Ciudad de México, CDMX, Mexico
              </fbt>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = sx.create({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  center: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  bottomInfo: {
    flex: 0,
    marginTop: 10,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  background: {
    backgroundImage: 'url(coffee-background.jpg)',
    backgroundSize: 'cover',
  },
  backgroundOverlay: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: 'var(--main-bg-color-transparent)',
  },
});
