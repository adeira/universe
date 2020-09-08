// @flow

import * as React from 'react';
import * as sx from '@adeira/sx';

import Homepage from '../src/Homepage';
import HomepageNavigation from '../src/HomepageNavigation';

export default function IndexPage(): React.Node {
  return (
    <div className={styles('background')}>
      <div className={styles('backgroundOverlay')}>
        <HomepageNavigation />
        <Homepage />
      </div>
    </div>
  );
}

const styles = sx.create({
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
