// @flow

import { graphql, useMutation } from '@adeira/relay';
import sx from '@adeira/sx';
import Icon from '@adeira/icons';
import { Button, LayoutInline } from '@adeira/sx-design';
import { useRouter } from 'next/router';
import React, { type Node } from 'react';
import { fbt } from 'fbt';

import Link from '../Link';
import useApplicationLocale from '../useApplicationLocale';
import CheckoutReceipt from './CheckoutReceipt';
import useSelectedItemsApi, { type AtomItemType } from './recoil/selectedItemsState';
import type { POSCheckoutPageLayoutMutation } from './__generated__/POSCheckoutPageLayoutMutation.graphql';

export default function POSCheckoutPageLayout(): Node {
  const applicationLocale = useApplicationLocale();
  const { reset, selectedItems } = useSelectedItemsApi();
  const router = useRouter();

  const [checkout, isCheckoutPending] = useMutation<POSCheckoutPageLayoutMutation>(graphql`
    mutation POSCheckoutPageLayoutMutation(
      $checkoutInput: [PosCheckoutProductInput!]!
      $clientLocale: SupportedLocale!
    ) {
      pos {
        checkout(input: { selectedProducts: $checkoutInput }, clientLocale: $clientLocale) {
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
        clientLocale: applicationLocale.graphql,
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
      // eslint-disable-next-line no-alert
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
          <Icon name="backward" /> <fbt desc="go back to POS text">Go back</fbt>
        </Link>
      </div>

      <div className={styles('checkoutReceipt')}>
        <CheckoutReceipt disableButtons={true} />
      </div>

      <div className={styles('question')}>
        <fbt desc="checkout question before continuing">Did you receive the money?</fbt>
      </div>

      <LayoutInline>
        <Button onClick={handleProcessCheckoutClick} isDisabled={isCheckoutPending} tint="default">
          <fbt desc="process checkout button text">Yes, finish checkout</fbt>
        </Button>
        <Button onClick={handleResetCheckoutClick} isDisabled={isCheckoutPending} tint="secondary">
          <fbt desc="reset checkout button text">No, start over</fbt>
        </Button>
      </LayoutInline>
    </div>
  );
}

const styles = sx.create({
  root: {
    color: 'white',
    backgroundColor: 'rgba(var(--sx-success-light))',
    height: '100vh',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
  checkoutReceipt: {
    width: 400,
    backgroundColor: 'rgba(var(--sx-background))',
    color: 'rgba(var(--sx-foreground))',
  },
  question: {
    fontSize: '2rem',
    marginBlock: '2rem',
  },
});
