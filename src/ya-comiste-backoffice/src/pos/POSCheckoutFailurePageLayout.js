// @flow

import sx from '@adeira/sx';
import { fbt } from 'fbt';
import React, { type Node } from 'react';

import Link from '../Link';

export default function POSCheckoutFailurePageLayout(): Node {
  return (
    <div className={styles('root')}>
      <div>
        <fbt desc="oh no failure checkout message">Oh no! Something is broken.</fbt>{' '}
        <span role="img" aria-label="emoji with raised eyebrow">
          🤨
        </span>
        <div className={styles('help')}>
          <fbt desc="checkout failure help message">
            What now? Please, write down the checkout items (<strong>
              what, how many, for how much
            </strong>) and continue with the sales to make sure customers are happy. Also, please,{' '}
            <strong>let us know</strong> as soon as possible!
          </fbt>
        </div>
        <div className={styles('selectedItems')}>
          <pre>
            Selected items were:
            {/* TODO */}
          </pre>
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
    backgroundColor: 'var(--ycbo-failure-background)',
    height: '100vh',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  help: {
    fontSize: '1rem',
    maxWidth: 750,
    marginTop: '2rem',
    marginBottom: '3rem',
  },
  selectedItems: {
    fontSize: '1.5rem',
    maxWidth: 750,
  },
  link: {
    borderRadius: '4px',
    fontSize: '1rem',
    padding: '1rem',
    margin: '1rem',
    backgroundColor: 'var(--ycbo-color-light)',
  },
});
