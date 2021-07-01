// @flow

import sx from '@adeira/sx';
import { MoneyFn } from '@adeira/sx-design';
import React, { type Node } from 'react';
import fbt from 'fbt';

import useSelectedItemsApi from './recoil/selectedItemsState';

export default function CheckoutReceipt(): Node {
  const { stats, selectedItems } = useSelectedItemsApi();

  return (
    <div className={styles('summary')}>
      {selectedItems.map((item) => {
        return (
          <div key={item.itemID} className={styles('summaryRow')}>
            <div>{item.itemTitle}</div>
            <div className={styles('summaryRowQuantity')}>
              <div>{item.units}</div>
              <div>&times;</div>
              <div>
                {MoneyFn({
                  priceUnitAmount: item.itemUnitAmount / 100, // adjusted for centavo
                  priceUnitAmountCurrency: 'MXN',
                  locale: 'en-US', // TODO
                })}
              </div>
              <div>=</div>
              <div>
                {MoneyFn({
                  priceUnitAmount: item.units * (item.itemUnitAmount / 100), // adjusted for centavo
                  priceUnitAmountCurrency: 'MXN',
                  locale: 'en-US', // TODO
                })}
              </div>
            </div>
          </div>
        );
      })}
      <div className={styles('summaryRowTotal')}>
        <div>
          <fbt desc="total price title">Total:</fbt>
        </div>
        <div>
          {MoneyFn({
            priceUnitAmount: stats.totalPrice / 100, // adjusted for centavo
            priceUnitAmountCurrency: 'MXN',
            locale: 'en-US', // TODO
          })}
        </div>
      </div>
    </div>
  );
}

const styles = sx.create({
  summary: {
    fontFamily: 'monospace',
    backgroundColor: 'rgba(var(--sx-background))',
    color: 'rgba(var(--sx-foreground))',
    padding: '1rem',
    margin: '1rem',
    fontSize: '1rem',
    width: 400,
    textAlign: 'left',
  },
  summaryRow: {
    display: 'flex',
    flexDirection: 'column',
    marginBlock: '.5rem',
  },
  summaryRowQuantity: {
    display: 'flex',
    justifyContent: 'space-between',
    marginInlineStart: '2rem',
  },
  summaryRowTotal: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBlockStart: '2rem',
    fontSize: 'larger',
  },
});
