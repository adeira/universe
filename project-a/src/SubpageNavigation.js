// @flow

import * as React from 'react';
import * as sx from '@adeira/sx';
import fbt from 'fbt';

import NavigationLink from './NavigationLink';

export default function SubpageNavigation(): React.Node {
  return (
    <nav className={styles('navigation')}>
      <div>
        <NavigationLink href="/" className={styles('link')}>
          <fbt desc="subpage navigation link to homepage">Homepage</fbt>
        </NavigationLink>
      </div>
      <div>
        <NavigationLink href="/menu" className={styles('link')}>
          <fbt desc="subpage navigation link to menu">Menu</fbt>
        </NavigationLink>

        <NavigationLink href="/rules" className={styles('link')}>
          <fbt desc="subpage navigation link to our rules">Our rules</fbt>
        </NavigationLink>
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
