// @flow

import * as React from 'react';
import sx from '@adeira/sx';
import Link from 'next/link';
import fbt from 'fbt';

export default function Navigation(): React.Node {
  return (
    <nav className={styles('navigation')}>
      <Link href="/">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a>
          <fbt desc="navigation link to the homepage">Home</fbt>
        </a>
      </Link>
      <Link href="/products">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a>
          <fbt desc="navigation link to products">Products</fbt>
        </a>
      </Link>
      <Link href="/users">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a>
          <fbt desc="navigation link to users">Users</fbt>
        </a>
      </Link>

      <div className={styles('separator')}>
        <hr />
      </div>

      <Link href="/pos">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a>
          <fbt desc="navigation link to point of sales">POS</fbt>
        </a>
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
