// @flow

import * as React from 'react';
import * as sx from '@adeira/sx';
import fbt from 'fbt';

import Link from '../Link';

export default function Navigation(): React.Node {
  return (
    <nav className={styles('nav')}>
      <ul className={styles('ul')}>
        <li className={styles('li')}>
          <Link href="/menu" className={styles('link')}>
            <fbt desc="navigation link to our menu">Menu</fbt>
          </Link>
        </li>

        <li className={styles('li')}>
          <Link href="/rules" className={styles('link')}>
            <fbt desc="navigation link to rules" preserveWhitespace={true}>
              Our&nbsp;rules
            </fbt>
          </Link>
        </li>

        {/* TODO (eventually): eshop, adoption */}
      </ul>
    </nav>
  );
}

const styles = sx.create({
  nav: {
    paddingTop: 20,
    paddingBottom: 20,
    fontWeight: 100,
  },
  ul: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  li: {
    padding: 0,
    margin: 0,
    fontSize: 30,
    borderBottom: '1px solid transparent',
  },
  link: {
    'textDecoration': 'none',
    'padding': 15,
    'paddingLeft': 20,
    'paddingRight': 20,
    ':hover': {
      borderBottom: '1px solid white',
    },
  },
});
