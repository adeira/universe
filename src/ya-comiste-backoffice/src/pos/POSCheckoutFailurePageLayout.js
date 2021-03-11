// @flow

import sx from '@adeira/sx';
import { fbt } from 'fbt';
import { useRouter } from 'next/router';
import React, { type Node } from 'react';

import LinkButton from '../LinkButton';
import POSCheckoutSummary from './POSCheckoutSummary';
import useSelectedItemsApi from './recoil/selectedItemsState';

export default function POSCheckoutFailurePageLayout(): Node {
  const { reset } = useSelectedItemsApi();
  const router = useRouter();

  const handleStartNewPOSSessionClick = () => {
    reset();
    router.push('/pos');
  };

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
        <POSCheckoutSummary tint="#ba3838" />
      </div>
      <LinkButton onClick={handleStartNewPOSSessionClick} xstyle={styles.link}>
        <fbt desc="start a new POS session button">Start a new POS session</fbt>
      </LinkButton>
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
    marginBottom: '2rem',
  },
  link: {
    borderRadius: '4px',
    fontSize: '1rem',
    padding: '1rem',
    margin: '1rem',
    backgroundColor: 'var(--ycbo-color-light)',
  },
});
