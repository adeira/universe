// @flow

import { graphql, useMutation } from '@adeira/relay';
import sx from '@adeira/sx';
import { useRouter } from 'next/router';
import React, { type Node } from 'react';
import { fbt } from 'fbt';

import Link from '../Link';
import CheckoutReceipt from './CheckoutReceipt';
import useSelectedItemsApi, { type AtomItemType } from './recoil/selectedItemsState';
import type { POSCheckoutPageLayoutMutation } from './__generated__/POSCheckoutPageLayoutMutation.graphql';

export default function POSCheckoutPageLayout(): Node {
  const { reset, selectedItems } = useSelectedItemsApi();
  const router = useRouter();

  const [checkout, isCheckoutPending] = useMutation<POSCheckoutPageLayoutMutation>(graphql`
    mutation POSCheckoutPageLayoutMutation($checkoutInput: [PosCheckoutProductInput!]!) {
      pos {
        checkout(input: { selectedProducts: $checkoutInput }) {
          __typename
          ... on PosCheckoutPayload {
            id
          }
          ... on PosCheckoutError {
            message
          }
        }
      }
    }
  `);

  const handleProcessCheckoutClick = () => {
    const selectedItemsArray = ((selectedItems.toJS(): any): $ReadOnlyArray<AtomItemType>);
    checkout({
      variables: {
        checkoutInput: selectedItemsArray.map((item) => ({
          productKey: item.itemID,
          productUnits: item.units,
          productPriceUnitAmount: item.itemUnitAmount,
          productPriceUnitAmountCurrency: 'MXN',
        })),
      },
      onCompleted: ({ pos: { checkout } }) => {
        if (checkout.__typename === 'PosCheckoutPayload') {
          reset();
          router.push('/pos/checkout/success');
        } else if (checkout.__typename === 'PosCheckoutError') {
          router.push('/pos/checkout/failure');
        }
      },
      onError: () => {
        router.push('/pos/checkout/failure');
      },
    });
  };

  const handleResetCheckoutClick = () => {
    if (
      // eslint-disable-next-line no-undef,no-alert
      window.confirm(
        fbt(
          'Are you sure you want to reset the checkout session and start over? All selected items will be removed.',
          'reset checkout session confirmation message',
        ),
      )
    ) {
      reset();
      router.push('/pos/session');
    }
  };

  return (
    <div className={styles('root')}>
      <div className={styles('goback')}>
        <Link href="/pos/session" xstyle={styles.gobackLink}>
          <fbt desc="go back to POS text">⬅ Go back</fbt>
        </Link>
      </div>

      <CheckoutReceipt />

      <div className={styles('question')}>
        <fbt desc="checkout question before continuing">Did you receive the money?</fbt>
      </div>
      <div className={styles('buttons')}>
        <button
          type="button"
          className={styles('button')}
          onClick={handleProcessCheckoutClick}
          disabled={isCheckoutPending}
        >
          <fbt desc="process checkout button text">Yes, finish checkout</fbt>
        </button>
        <button
          type="button"
          className={styles('button')}
          onClick={handleResetCheckoutClick}
          disabled={isCheckoutPending}
        >
          <fbt desc="reset checkout button text">No, start over</fbt>
        </button>
      </div>
    </div>
  );
}

const styles = sx.create({
  goback: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  gobackLink: {
    fontSize: '2rem',
    margin: '1rem',
    color: 'white',
  },
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
  question: {
    fontSize: '1.5rem',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    marginBlockStart: '2rem',
  },
  button: {
    margin: '.5rem',
    padding: '1rem',
    fontSize: '1.5rem',
  },
});
