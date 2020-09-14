// @flow

import * as React from 'react';
import * as sx from '@adeira/sx';

import Heading from './design/Heading';
import Footer from './Footer';
import SubpageHeader from './SubpageHeader';
import SubpageNavigation from './SubpageNavigation';

type Props = {|
  +children: React.Node,
  +title: React.Node,
|};

export default function Subpage(props: Props): React.Node {
  return (
    <div className={styles('wrapper')}>
      <SubpageNavigation />
      <SubpageHeader />

      <main id="main" className={styles('main')}>
        {/* TODO: H1! */}
        <Heading>{props.title}</Heading>
        {props.children}
      </main>

      <footer className={styles('footer')}>
        <Footer />
      </footer>
    </div>
  );
}

const styles = sx.create({
  wrapper: {
    padding: 0,
    margin: 0,
  },
  main: {
    color: 'var(--font-color-dark)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  footer: {
    color: 'var(--font-color-dark)',
  },
});
