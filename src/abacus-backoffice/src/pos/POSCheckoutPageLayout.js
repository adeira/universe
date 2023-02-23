// @flow

import { graphql, useMutation } from '@adeira/relay';
import sx from '@adeira/sx';
import Icon from '@adeira/icons';
import { Button, MoneyFn, SupportedCurrencies, Text, Money, LinkButton } from '@adeira/sx-design';
import { useRouter } from 'next/router';
import Image from 'next/image';
import React, { useState, type Node } from 'react';
import { fbt } from 'fbt';
import NextLink from 'next/link';

import useApplicationLocale from '../useApplicationLocale';
import MoneyBillSelector from './MoneyBillSelector';
import MoneyCoinSelector from './MoneyCoinSelector';
import useSelectedItemsApi, { type AtomItemType } from './recoil/selectedItemsState';
import type { POSCheckoutPageLayoutMutation } from './__generated__/POSCheckoutPageLayoutMutation.graphql';

export default function POSCheckoutPageLayout(): Node {
  const [receivedMoney, setReceivedMoney] = useState(0);
  const applicationLocale = useApplicationLocale();
  const { stats, reset, selectedItems } = useSelectedItemsApi();
  const router = useRouter();
  const { bcp47 } = useApplicationLocale();

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
          productPriceUnitAmountCurrency: 'MXN', // TODO
          productAddons:
            item.itemAddons?.map((addon) => ({
              productAddonId: addon.itemAddonID,
              productAddonExtraPriceUnitAmount: addon.itemAddonExtraPrice,
              productAddonExtraPriceUnitAmountCurrency: 'MXN', // TODO
            })) ?? [],
        })),
      },
      onCompleted: ({ pos: { checkout } }) => {
        if (checkout.__typename === 'PosCheckoutPayload') {
          reset();
          /* $FlowFixMe[unused-promise-in-sync-scope] This comment suppresses
           * an error when upgrading Flow to version 0.200.0. To see the error
           * delete this comment and run Flow. */
          router.push('/pos/checkout/success');
        } else if (checkout.__typename === 'PosCheckoutError') {
          /* $FlowFixMe[unused-promise-in-sync-scope] This comment suppresses
           * an error when upgrading Flow to version 0.200.0. To see the error
           * delete this comment and run Flow. */
          router.push('/pos/checkout/failure');
        }
      },
      onError: () => {
        /* $FlowFixMe[unused-promise-in-sync-scope] This comment suppresses an
         * error when upgrading Flow to version 0.200.0. To see the error
         * delete this comment and run Flow. */
        router.push('/pos/checkout/failure');
      },
    });
  };

  const handleIncrease = (value: number) => setReceivedMoney((prevValue) => prevValue + value);
  const handleDecrease = (value: number) =>
    setReceivedMoney((prevValue) => Math.max(prevValue - value, 0));

  return (
    <div className={styles('root')}>
      <div className={styles('topRow')}>
        <LinkButton
          href="/pos/session"
          tint="secondary"
          nextLinkComponent={NextLink}
          prefix={<Icon name="backward" />}
        >
          <fbt desc="go back to POS text">Go back</fbt>
        </LinkButton>

        <Button
          onClick={handleProcessCheckoutClick}
          isDisabled={isCheckoutPending}
          tint="default"
          suffix={<Icon name="check" />}
        >
          <fbt desc="finish checkout button text">Finish checkout</fbt>
        </Button>
      </div>

      <div className={styles('moneySelector')}>
        <div className={styles('billSelector')}>
          <MoneyBillSelector
            billImage={
              <Image src="/money/MXN/20.png" width={159} height={86} alt="20 MXN" priority={true} />
            }
            onIncrease={() => handleIncrease(20)}
            onDecrease={() => handleDecrease(20)}
          />
          <MoneyBillSelector
            billImage={
              <Image src="/money/MXN/50.png" width={165} height={86} alt="50 MXN" priority={true} />
            }
            onIncrease={() => handleIncrease(50)}
            onDecrease={() => handleDecrease(50)}
          />
          <MoneyBillSelector
            billImage={
              <Image
                src="/money/MXN/100.png"
                width={174}
                height={86}
                alt="100 MXN"
                priority={true}
              />
            }
            onIncrease={() => handleIncrease(100)}
            onDecrease={() => handleDecrease(100)}
          />
          <MoneyBillSelector
            billImage={
              <Image
                src="/money/MXN/200.png"
                width={184}
                height={86}
                alt="200 MXN"
                priority={true}
              />
            }
            onIncrease={() => handleIncrease(200)}
            onDecrease={() => handleDecrease(200)}
          />
          <MoneyBillSelector
            billImage={
              <Image
                src="/money/MXN/500.png"
                width={194}
                height={86}
                alt="500 MXN"
                priority={true}
              />
            }
            onIncrease={() => handleIncrease(500)}
            onDecrease={() => handleDecrease(500)}
          />
          <MoneyBillSelector
            billImage={
              <Image
                src="/money/MXN/1000.png"
                width={200}
                height={86}
                alt="1000 MXN"
                priority={true}
              />
            }
            onIncrease={() => handleIncrease(1000)}
            onDecrease={() => handleDecrease(1000)}
          />
        </div>

        <div className={styles('coinSelector')}>
          <MoneyCoinSelector
            value={MoneyFn({
              priceUnitAmount: 0.5,
              priceUnitAmountCurrency: SupportedCurrencies.MXN,
              locale: bcp47,
            })}
            onIncrease={() => handleIncrease(0.5)}
            onDecrease={() => handleDecrease(0.5)}
          />
          <MoneyCoinSelector
            value={MoneyFn({
              priceUnitAmount: 1,
              priceUnitAmountCurrency: SupportedCurrencies.MXN,
              locale: bcp47,
            })}
            onIncrease={() => handleIncrease(1)}
            onDecrease={() => handleDecrease(1)}
          />
          <MoneyCoinSelector
            value={MoneyFn({
              priceUnitAmount: 2,
              priceUnitAmountCurrency: SupportedCurrencies.MXN,
              locale: bcp47,
            })}
            onIncrease={() => handleIncrease(2)}
            onDecrease={() => handleDecrease(2)}
          />
          <MoneyCoinSelector
            value={MoneyFn({
              priceUnitAmount: 5,
              priceUnitAmountCurrency: SupportedCurrencies.MXN,
              locale: bcp47,
            })}
            onIncrease={() => handleIncrease(5)}
            onDecrease={() => handleDecrease(5)}
          />
          <MoneyCoinSelector
            value={MoneyFn({
              priceUnitAmount: 10,
              priceUnitAmountCurrency: SupportedCurrencies.MXN,
              locale: bcp47,
            })}
            onIncrease={() => handleIncrease(10)}
            onDecrease={() => handleDecrease(10)}
          />
        </div>

        <div className={styles('moneySelectorSummary')}>
          <div>
            Total:{' '}
            <Text size={32}>
              <Money
                priceUnitAmount={stats.totalPrice / 100} // adjusted for centavo
                priceUnitAmountCurrency={SupportedCurrencies.MXN} // TODO
              />
            </Text>
          </div>
          <div>
            Received:{' '}
            <Text size={24} weight={200}>
              <Money
                priceUnitAmount={receivedMoney}
                priceUnitAmountCurrency={SupportedCurrencies.MXN} // TODO
              />
            </Text>
          </div>
          <div>
            Return:{' '}
            <Text size={24}>
              <Money
                priceUnitAmount={Math.max(receivedMoney - stats.totalPrice / 100, 0)} // adjusted for centavo
                priceUnitAmountCurrency={SupportedCurrencies.MXN} // TODO
              />
            </Text>
          </div>
          <div>
            <div>
              +10% ={' '}
              <Money
                priceUnitAmount={(stats.totalPrice * 0.1 + stats.totalPrice) / 100} // adjusted for centavo
                priceUnitAmountCurrency={SupportedCurrencies.MXN} // TODO
              />
            </div>
            <div>
              +15% ={' '}
              <Money
                priceUnitAmount={(stats.totalPrice * 0.15 + stats.totalPrice) / 100} // adjusted for centavo
                priceUnitAmountCurrency={SupportedCurrencies.MXN} // TODO
              />
            </div>
            <div>
              +20% ={' '}
              <Money
                priceUnitAmount={(stats.totalPrice * 0.2 + stats.totalPrice) / 100} // adjusted for centavo
                priceUnitAmountCurrency={SupportedCurrencies.MXN} // TODO
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = sx.create({
  root: {
    '--sx-money-text-color': 'white',
    'color': 'white',
    'backgroundColor': 'rgba(var(--sx-success-light))',
    'height': '100vh',
    'display': 'flex',
    'flexDirection': 'column',
    'alignItems': 'start',
    'justifyContent': 'space-between',
    'padding': 50,
  },
  topRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  moneySelector: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
  },
  billSelector: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 5,
  },
  coinSelector: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 5,
  },
  moneySelectorSummary: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
});
