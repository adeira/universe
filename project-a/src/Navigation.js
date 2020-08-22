// @flow strict-local

import * as React from 'react';
import fbt from 'fbt';
import * as sx from '@adeira/sx';

export default function Navigation(): React.Node {
  return (
    <nav>
      <ul className={styles('ul')}>
        <li className={styles('li')}>
          <a href="/" className={styles('link')}>
            <fbt desc="navigation link to homepage">Homepage</fbt>
          </a>
        </li>
        <li className={styles('li')}>
          <a href="/rules" className={styles('link')}>
            <fbt desc="navigation link to rules">Our rules</fbt>
          </a>
        </li>
      </ul>
    </nav>
  );
}

const styles = sx.create({
  ul: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    listStyle: 'none',
    padding: 0,
  },
  li: {
    padding: 15,
    fontSize: 32,
  },
  link: {
    'textDecoration': 'none',
    ':hover': {
      textDecoration: 'underline',
    },
  },
});
