// @flow

import * as React from 'react';
import * as sx from '@adeira/sx';

import { Logo } from './Logo';
import HomepageNavigation from './HomepageNavigation';

export default function Homepage(): React.Node {
  return (
    <div className={styles('background')}>
      <div className={styles('backgroundOverlay')}>
        <HomepageNavigation />
        <div className={styles('root')}>
          <div className={styles('center')}>
            <Logo />
          </div>
          <div className={styles('bottomInfo')}>
            {/* <p>TODO: contact (?)</p> */}
            {/* <p>TODO: social networks</p> */}
            <div>Monday - Friday 8am - 6pm</div>
            <a href="https://goo.gl/maps/2jh2w78yFTPEDSrS6">
              Av. Coyoacán 2000, Xoco, Benito Juárez, 03330 Ciudad de México, CDMX, Mexico
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
    justifyContent: 'center',
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
