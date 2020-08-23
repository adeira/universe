// @flow strict-local

import * as React from 'react';
import fbt from 'fbt';
import * as sx from '@adeira/sx';

export default function Navigation(): React.Node {
  return (
    <nav className={styles('nav')}>
      <ul className={styles('ul')}>
        <a href="/" className={styles('link')}>
          <li className={styles('li')}>
            <fbt desc="navigation link to homepage">Homepage</fbt>
          </li>
        </a>
        <a href="/rules" className={styles('link')}>
          <li className={styles('li')}>
            <fbt desc="navigation link to rules">Our rules</fbt>
          </li>
        </a>
      </ul>
    </nav>
  );
}

const styles = sx.create({
  nav: {
    paddingTop: '10px',
    paddingBottom: '10px',
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
    'padding': 15,
    'fontSize': 32,
    'borderBottom': '1px solid transparent',
    ':hover': {
      borderBottom: '1px solid white',
    },
    ':focus-within': {
      borderBottom: '1px solid white',
    },
  },
  link: {
    textDecoration: 'none',
  },
});
