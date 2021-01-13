// @flow

import * as React from 'react';
import sx from '@adeira/sx';
import Link from 'next/link';

export default function Navigation(): React.Node {
  return (
    <nav className={styles('navigation')}>
      <Link href="/">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a>Home</a>
      </Link>
      <Link href="/products">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a>Products</a>
      </Link>
      <Link href="/users">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a>Users</a>
      </Link>
    </nav>
  );
}

const styles = sx.create({
  navigation: {
    display: 'flex',
    flexDirection: 'column',
  },
});
