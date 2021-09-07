// @flow

import sx from '@adeira/sx';
import { fbt } from 'fbt';
import React, { type Node } from 'react';

import Link from '../Link';

export default function POSCheckoutSuccessPageLayout(): Node {
  return (
    <div className={styles('root')}>
      <div>
        <fbt desc="well done checkout success message">Well done! 👍</fbt>
        <div className={styles('help')}>
          <fbt desc="success checkout help message">
            You can now go back and serve another customer!
          </fbt>
        </div>
      </div>
      <Link href="/pos/session" xstyle={styles.link}>
        <fbt desc="start a new POS session button">Start a new POS session</fbt>
      </Link>
    </div>
  );
}

const styles = sx.create({
  root: {
    fontSize: '3rem',
    color: 'white',
    backgroundColor: 'rgba(var(--sx-success-light))',
    height: '100vh',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  link: {
    borderRadius: '4px',
    fontSize: '1rem',
    padding: '1rem',
    margin: '1rem',
    backgroundColor: 'white',
  },
  help: {
    fontSize: '1rem',
    maxWidth: 750,
    marginBlockStart: '2rem',
    marginBlockEnd: '3rem',
  },
});
