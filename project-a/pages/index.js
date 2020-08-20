// @flow

import * as React from 'react';

import sx from '../src/sx';
import KochkaIcon from '../src/svg/KochkaIcon';

export default function Home(): React.Node {
  return (
    <div className={styles('root')}>
      <div className={styles('logo')}>
        <div className={styles('icon')}>
          <KochkaIcon />
        </div>
        <h1>KOCHKA</h1>
        <h2>CAFÉ</h2>
      </div>
      <div className={styles('info')}>
        <p>
          <a href="https://goo.gl/maps/2jh2w78yFTPEDSrS6">
            Av. Coyoacán 2000, Xoco, Benito Juárez, 03330 Ciudad de México, CDMX, Mexico
          </a>
        </p>
        <p>TODO: opening hours</p>
        <p>TODO: contact (?)</p>
        <p>TODO: social networks</p>
      </div>
    </div>
  );
}

const styles = sx.create({
  root: {},
  logo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0 auto',
  },
  icon: {
    width: 150,
    height: 150,
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});
