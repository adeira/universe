// @flow

import sx from '@adeira/sx';
import { fbt } from 'fbt';
import { useRouter } from 'next/router';
import React, { type Node } from 'react';
import { Button } from '@adeira/sx-design';

import CheckoutReceipt from './CheckoutReceipt';
import useSelectedItemsApi from './recoil/selectedItemsState';

export default function POSCheckoutFailurePageLayout(): Node {
  const { reset } = useSelectedItemsApi();
  const router = useRouter();

  const handleStartNewPOSSessionClick = () => {
    reset();
    router.push('/pos/session');
  };

  return (
    <div className={styles('root')}>
      <div className={styles('ohNo')}>
        <fbt desc="oh no failure checkout message">Oh no! Something is broken. 🤨</fbt>
      </div>

      <div className={styles('help')}>
        <fbt desc="checkout failure help message">
          What now? Please, write down the checkout items (<strong>
            what, how many, for how much
          </strong>) and continue with the sales to make sure customers are happy. Also, please,{' '}
          <strong>let us know</strong> as soon as possible!
        </fbt>
      </div>

      <CheckoutReceipt />

      <Button onClick={handleStartNewPOSSessionClick}>
        <fbt desc="start a new POS session button">Start a new POS session</fbt>
      </Button>
    </div>
  );
}

const styles = sx.create({
  root: {
    color: 'white',
    backgroundColor: 'rgba(var(--sx-error-dark))',
    height: '100vh',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ohNo: {
    fontSize: '3rem',
  },
  help: {
    fontSize: '1rem',
    maxWidth: 750,
    marginBlock: '2rem',
  },
});
