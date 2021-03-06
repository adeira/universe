// @flow

import React, { type Node } from 'react';
import sx from '@adeira/sx';
import { fbt } from 'fbt';

import Link from '../../../src/Link';

export default function POSCheckoutSuccessPage(): Node {
  // TODO: make sure that this page is not directly accessible without going through the checkout first

  return (
    <div className={styles('root')}>
      <div>
        <fbt desc="well done checkout success message">Well done!</fbt>{' '}
        <span role="img" aria-label="thumbs up">
          👍
        </span>
        <div className={styles('help')}>
          <fbt desc="success checkout help message">
            You can now go back and serve another customer!
          </fbt>
        </div>
      </div>
      <Link href="/pos" xstyle={styles.link}>
        <fbt desc="start a new POS session button">Start a new POS session</fbt>
      </Link>
    </div>
  );
}

const styles = sx.create({
  root: {
    fontSize: '3rem',
    color: 'var(--ycbo-color-light)',
    backgroundColor: 'var(--ycbo-success-background)',
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
    backgroundColor: 'var(--ycbo-color-light)',
  },
  help: {
    fontSize: '1rem',
    maxWidth: 750,
    marginTop: '2rem',
    marginBottom: '3rem',
  },
});
