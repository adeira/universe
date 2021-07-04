// @flow

import React, { type Node } from 'react';
import sx from '@adeira/sx';
import { ErrorBoundary, Section } from '@adeira/sx-design';
import { fbt } from 'fbt';

import Navigation from './Navigation';

type Props = {
  +children: Node,
};

export default function Layout(props: Props): Node {
  return (
    <div className={styles('mainGrid')}>
      <div className={styles('navigation')}>
        <Navigation />
      </div>

      <main className={styles('main')}>
        <ErrorBoundary>
          <Section>
            <React.Suspense
              fallback={<fbt desc="loading message when loading some data">Loading…</fbt>}
            >
              {props.children}
            </React.Suspense>
          </Section>
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
  },
  main: {
    flex: 1,
    marginInlineStart: '200px',
    padding: '1rem',
  },
});
