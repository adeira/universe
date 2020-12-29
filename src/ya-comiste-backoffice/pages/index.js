// @flow

import * as React from 'react';
import sx from '@adeira/sx';

import Navigation from '../src/Navigation';

export default function Home(): React.Node {
  return (
    <div className={styles('screen')}>
      <div className={styles('navigationWrapper')}>
        <Navigation />
      </div>
      <div className={styles('main')}>TODO (add/edit/delete product + prices, upload photos)</div>
    </div>
  );
}

const styles = sx.create({
  screen: {
    display: 'flex',
    flexDirection: 'row',
  },
  navigationWrapper: {
    backgroundColor: '#ddd',
    padding: 5,
    height: '100vh',
    flex: 2,
  },
  main: {
    backgroundColor: 'white',
    flex: 10,
    padding: 5,
  },
});
