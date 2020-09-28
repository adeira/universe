// @flow

import * as React from 'react';
import * as sx from '@adeira/sx';
import fbt from 'fbt';

import Link from './Link';

export default function SubpageNavigation(): React.Node {
  return (
    <nav className={styles('navigation')}>
      <div>
        <Link href="/" className={styles('link')}>
          <fbt desc="subpage navigation link to homepage">Homepage</fbt>
        </Link>
      </div>
      <div>
        <Link href="/menu" className={styles('link')}>
          <fbt desc="subpage navigation link to menu">Menu</fbt>
        </Link>

        <Link href="/rules" className={styles('link')}>
          <fbt desc="subpage navigation link to our rules">Our rules</fbt>
        </Link>
      </div>
    </nav>
  );
}

const styles = sx.create({
  navigation: {
    backgroundColor: 'var(--main-bg-color-dark)',
    padding: 10,
    display: 'flex',
    justifyContent: 'space-between',
    position: 'sticky',
    top: 0,
    zIndex: 1,
  },
  link: {
    'fontSize': 20,
    'paddingRight': 15,
    'textDecoration': 'none',
    ':last-child': {
      paddingRight: 0,
    },
    ':hover': {
      textDecoration: 'underline',
    },
  },
});
