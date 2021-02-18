// @flow

import * as React from 'react';
import sx from '@adeira/sx';
import { Section } from '@adeira/sx-design';

import Navigation from './Navigation';
import StatusBar from './StatusBar';

type Props = {|
  +children: React.Node,
  +heading?: React.Node,
|};

export default function Layout(props: Props): React.Node {
  return (
    <div className={styles('mainGrid')}>
      <div className={styles('navigation')}>
        <Navigation />
      </div>

      <main className={styles('main')}>
        <StatusBar />

        {props.heading ?? null}
        <Section>{props.children}</Section>
      </main>
    </div>
  );
}

const styles = sx.create({
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: '200px 1fr',
    minHeight: '100vh',
  },
  navigation: {
    backgroundColor: '#ddd',
    height: '100%',
    padding: 5,
  },
  main: {
    backgroundColor: 'white',
    padding: '1rem',
  },
});
