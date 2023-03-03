// @flow

import sx from '@adeira/sx';
import { fbt } from 'fbt';
import { useRouter } from 'next/router';
import React, { type Node } from 'react';
import { Button } from '@adeira/sx-design';

import useSelectedItemsApi from './recoil/selectedItemsState';

export default function POSCheckoutFailurePageLayout(): Node {
  const { reset } = useSelectedItemsApi();
  const router = useRouter();

  const handleStartNewPOSSessionClick = () => {
    reset();
    /* $FlowFixMe[unused-promise] This comment suppresses an error when
     * upgrading Flow to version 0.201.0. To see the error delete this comment
     * and run Flow. */
    router.push('/pos/session');
  };

  return (
    <div className={styles('root')}>
      <div className={styles('ohNo')}>
        <fbt desc="oh no failure checkout message">Oh no! Something is broken. 🤨</fbt>
      </div>

      <div className={styles('help')}>
        <fbt desc="checkout failure help message">
          The order was <strong>not</strong> recorded!
        </fbt>
      </div>

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
