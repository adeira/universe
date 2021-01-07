// @flow

import * as React from 'react';
import sx from '@adeira/sx';

import Heading from './design/Heading';
import LayoutFooter from './LayoutFooter';
import LayoutNavigation from './LayoutNavigation';

type Props = {|
  +children: React.Node,
  +title: React.Node,
  +subtitle?: React.Node,
  +withFullWidth?: boolean,
|};

// TODO: rename to Layout
export default function Layout(props: Props): React.Node {
  return (
    <div className={styles('wrapper')}>
      <LayoutNavigation />

      <div className={styles('heading')}>
        <Heading>{props.title}</Heading>
        <div className={styles('subtitle')}>{props.subtitle}</div>
      </div>

      <main id="main" className={styles('main', props.withFullWidth && 'mainFullWidth')}>
        {props.children}
      </main>

      <footer className={styles('footer')}>
        <LayoutFooter />
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
    maxWidth: '45rem',
    margin: '0 auto',
    minHeight: '40vh',
    paddingTop: '5vw',
    paddingBottom: '5vw',
  },
  mainFullWidth: {
    maxWidth: '100%',
    paddingLeft: '1rem',
    paddingRight: '1rem',
  },
  heading: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '2rem',
    paddingBottom: '2rem',
    backgroundColor: 'var(--secondary-color)',
    color: 'var(--font-color-light)',
    backgroundImage: 'url(/plus-pattern.svg)',
    backgroundPosition: '15px 15px',
    backgroundSize: '20px',
  },
  subtitle: {
    color: 'lightgray',
  },
  footer: {
    color: 'var(--font-color-dark)',
    paddingLeft: '1rem',
    paddingRight: '1rem',
  },
});
