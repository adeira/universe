// @flow

import * as React from 'react';
import sx from '@adeira/sx';
import { Section } from '@adeira/sx-design';

import Navigation from './Navigation';

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
