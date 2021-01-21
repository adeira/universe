// @flow

import * as React from 'react';
import sx from '@adeira/sx';

import Navigation from './Navigation';

type Props = {|
  +children: React.Node,
|};

export default function Layout(props: Props): React.Node {
  return (
    <div className={styles('mainGrid')}>
      <nav className={styles('navigation')}>
        <Navigation />
      </nav>
      <main className={styles('main')}>{props.children}</main>
    </div>
  );
}

const styles = sx.create({
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: '200px 1fr',
    gap: '1rem',
  },
  navigation: {
    backgroundColor: '#ddd',
    height: '100vh',
    padding: 5,
  },
  main: {
    backgroundColor: 'white',
    padding: 5,
  },
});
