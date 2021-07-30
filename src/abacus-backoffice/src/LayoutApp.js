// @flow

import React, { type Node } from 'react';
import sx from '@adeira/sx';
import { ErrorBoundary, Loader } from '@adeira/sx-design';

import Navigation from './Navigation';

type Props = {
  +children: Node,
};

export default function LayoutApp(props: Props): Node {
  return (
    <div className={styles('mainGrid')}>
      <div className={styles('navigation')}>
        <Navigation />
      </div>

      <main className={styles('main')}>
        <ErrorBoundary>
          <React.Suspense fallback={<Loader />}>{props.children}</React.Suspense>
        </ErrorBoundary>
      </main>
    </div>
  );
}

const styles = sx.create({
  mainGrid: {
    display: 'flex',
    flexDirection: 'row',
    minHeight: '100vh',
  },
  navigation: {
    flex: 1,
    width: '200px',
    position: 'fixed',
    backgroundColor: 'rgba(var(--sx-accent-1))',
  },
  main: {
    flex: 1,
    marginInlineStart: '200px',
    padding: '1rem',
    backgroundColor: 'rgba(var(--sx-background))',
  },
});
