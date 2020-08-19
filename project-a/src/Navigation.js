// @flow strict-local

import * as React from 'react';
import fbt from 'fbt';

import sx from './sx';

export default function Navigation(): React.Node {
  return (
    <nav>
      <ul className={sx(styles.ul)}>
        <li className={sx(styles.li)}>
          <a href="/" className={sx(styles.link)}>
            <fbt desc="navigation link to homepage">Homepage</fbt>
          </a>
        </li>
        <li className={sx(styles.li)}>
          <a href="/rules" className={sx(styles.link)}>
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
    textDecoration: 'none',
  },
});
