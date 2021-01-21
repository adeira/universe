// @flow

import * as React from 'react';
import sx from '@adeira/sx';
import fbt from 'fbt';

import Link from './Link';

export default function Navigation(): React.Node {
  return (
    <nav className={styles('navigation')}>
      <Link href="/">
        <fbt desc="navigation link to the homepage">Home</fbt>
      </Link>
      <Link href="/products">
        <fbt desc="navigation link to products">Products</fbt>
      </Link>
      <Link href="/users">
        <fbt desc="navigation link to users">Users</fbt>
      </Link>

      <div className={styles('separator')}>
        <hr />
      </div>

      <Link href="/pos">
        <fbt desc="navigation link to point of sales">POS</fbt>
      </Link>
    </nav>
  );
}

const styles = sx.create({
  navigation: {
    display: 'flex',
    flexDirection: 'column',
  },
  separator: {
    width: '100%',
  },
});
