// @flow

import sx from '@adeira/sx';
import * as React from 'react';

import '../styles/globals.css';
import Navigation from '../src/Navigation';

export default function MyApp({ Component, pageProps }: $FlowFixMe): React.Node {
  return (
    <div className={styles('mainGrid')}>
      <header className={styles('navigation')}>
        <Navigation />
      </header>
      <main className={styles('main')}>
        <Component {...pageProps} />
      </main>
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
