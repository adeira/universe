// @flow

import { Money, MoneyFn } from '@adeira/sx-design';
import { fbt } from 'fbt';
import * as React from 'react';
import sx from '@adeira/sx';

import Link from '../Link';
import useSelectedItemsApi from './recoil/selectedItemsState';

export default function ProductsSelected(): React.Node {
  const { selectedItems, stats, increaseUnits, decreaseUnits } = useSelectedItemsApi();

  return (
    <div className={styles('wrapper')}>
      <div className={styles('selectedItems')}>
        {selectedItems.size === 0 ? (
          <fbt desc="text when nothing is selected in POS">Nothing selected yet</fbt>
        ) : null}
        {selectedItems.map((selectedItem) => (
          <div key={selectedItem.itemID} className={styles('selectedItemRow')}>
            <div className={styles('selectedItemTitle')}>
              <strong>{selectedItem.itemTitle}</strong>
              <br />
              {selectedItem.units}x for{' '}
              <Money priceUnitAmount={selectedItem.itemUnitAmount} priceUnitAmountCurrency="MXN" />{' '}
              per unit
            </div>
            <div className={styles('selectedItemControls')}>
              <button
                type="button"
                className={styles('selectedItemControlButton')}
                onClick={() => increaseUnits(selectedItem.itemID)}
              >
                +
              </button>
              <button
                type="button"
                className={styles('selectedItemControlButton')}
                onClick={() => decreaseUnits(selectedItem.itemID)}
              >
                -
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className={styles('stats')}>
        {/* TODO: https://github.com/facebook/fbt/pull/137 */}
        {fbt(
          `${fbt.param('totalSelectedItems', stats.totalSelectedItems)} items for ${fbt.param(
            'totalPrice',
            MoneyFn({
              locale: 'en-US', // TODO
              priceUnitAmount: stats.totalPrice,
              priceUnitAmountCurrency: 'MXN',
            }),
          )}`,
          'summary of selected items in POS',
        )}
      </div>
      <div className={styles('checkout')}>
        <Link href="/pos/checkout" xstyle={styles.checkoutLink}>
          <fbt desc="checkout button title">Proceed to checkout</fbt>
        </Link>
      </div>
    </div>
  );
}

const styles = sx.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  selectedItems: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  selectedItemRow: {
    'paddingLeft': '1rem',
    'paddingRight': '1rem',
    'paddingBottom': '.5rem',
    'display': 'flex',
    'flexDirection': 'row',
    ':first-child': {
      paddingTop: '1rem',
    },
  },
  selectedItemTitle: {
    width: '100%',
  },
  selectedItemControls: {
    display: 'flex',
    flexDirection: 'row',
  },
  selectedItemControlButton: {
    width: 45,
    height: 45,
  },
  stats: {
    padding: '1rem',
    backgroundColor: 'darkorange',
  },
  checkout: {
    padding: '1rem',
    backgroundColor: 'var(--ycbo-success-background)',
  },
  checkoutLink: {
    fontSize: 25,
    color: 'white',
  },
});
