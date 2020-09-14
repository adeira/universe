// @flow

import * as React from 'react';
import * as sx from '@adeira/sx';

import Heading from './design/Heading';
import SubpageFooter from './SubpageFooter';
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
        <div className={styles('heading')}>
          <Heading>{props.title}</Heading>
        </div>
        {props.children}
      </main>

      <footer className={styles('footer')}>
        <SubpageFooter />
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
    width: '75vw',
    margin: '0 auto',
    minHeight: '40vh',
  },
  heading: {
    marginTop: 20,
    marginBottom: 40,
  },
  footer: {
    color: 'var(--font-color-dark)',
  },
});
