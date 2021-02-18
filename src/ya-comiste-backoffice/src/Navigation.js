// @flow

import * as React from 'react';
import fbt from 'fbt';
import sx from '@adeira/sx';

import Link from './Link';
import { LogoutButton } from './AuthButtons';

export default function Navigation(): React.Node {
  return (
    <nav className={styles('navigation')}>
      <Link href="/" xstyle={styles.link}>
        <fbt desc="navigation link to the homepage">Home</fbt>
      </Link>
      <Link href="/products" xstyle={styles.link}>
        <fbt desc="navigation link to products">Products</fbt>
      </Link>
      <Link href="/users" xstyle={styles.link}>
        <fbt desc="navigation link to users">Users</fbt>
      </Link>

      <Link href="/pos" xstyle={styles.link}>
        <fbt desc="navigation link to point of sales">Open POS ↝</fbt>
      </Link>

      <div className={styles('spacing')} />

      <LogoutButton />
    </nav>
  );
}

const styles = sx.create({
  navigation: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f4f7f9',
    color: '#5c6a77',
    padding: '1rem 0 1rem 1rem',
    borderRight: '1px solid #e9eff3',
  },
  link: {
    'paddingTop': 5,
    'paddingBottom': 5,
    'paddingLeft': 10,
    'borderWidth': '1px 0 1px 1px',
    'borderStyle': 'solid',
    'borderColor': 'transparent',
    ':hover': {
      // TODO: do this even for active links (see gitbook design for inspiration)
      backgroundColor: 'white',
      borderColor: '#e9eff3',
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: 4,
      textDecoration: 'none',
    },
  },
  spacing: {
    flex: 1,
  },
});
