// @flow

import * as React from 'react';
import * as sx from '@adeira/sx';

import { Logo } from '../src/Logo';

export default function Home(): React.Node {
  return (
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
});
