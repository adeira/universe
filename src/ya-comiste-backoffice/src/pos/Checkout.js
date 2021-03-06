// @flow

import { graphql, useMutation } from '@adeira/relay';
import sx from '@adeira/sx';
import { Money } from '@adeira/sx-design';
import { useRouter } from 'next/router';
import React, { type Node } from 'react';
import { fbt } from 'fbt';

import Link from '../Link';
import useSelectedItemsApi from './recoil/selectedItemsState';
import type { CheckoutMutation } from './__generated__/CheckoutMutation.graphql';

export default function Checkout(): Node {
  const { stats } = useSelectedItemsApi();
  const router = useRouter();

  // TODO:
  const [checkout, isCheckoutPending] = useMutation<CheckoutMutation>(graphql`
    mutation CheckoutMutation {
      pos {
        checkout(
          input: {
            selectedProducts: [
              {
                productKey: "TODO"
                productUnits: -1
                productPriceUnitAmount: -1
                productPriceUnitAmountCurrency: MXN
              }
            ]
          }
        ) {
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
    checkout({
      onCompleted: ({ pos: { checkout } }) => {
        if (checkout.__typename === 'PosCheckoutPayload') {
          // eslint-disable-next-line no-console
          console.warn(checkout); // TODO
          router.push('/pos/checkout/success');
        } else if (checkout.__typename === 'PosCheckoutError') {
          // eslint-disable-next-line no-console
          console.error(checkout); // TODO
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
      // TODO: reset the selected items
      router.push('/pos');
    }
  };

  // TODO:
  //  - send selected products and their prices to the server
  return (
    <div className={styles('root')}>
      <div className={styles('goback')}>
        <Link href="/pos" xstyle={styles.gobackLink}>
          <fbt desc="go back to POS text">⬅ Go back</fbt>
        </Link>
      </div>

      <Money
        locale="en-US" // TODO
        priceUnitAmount={stats.totalPrice}
        priceUnitAmountCurrency={'MXN'} // TODO
      />
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
    color: 'var(--ycbo-color-light)',
  },
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
  question: {
    fontSize: '1.5rem',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '2rem',
  },
  button: {
    margin: '.5rem',
    padding: '1rem',
    fontSize: '1.5rem',
  },
});
