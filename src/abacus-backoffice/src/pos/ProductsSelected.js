// @flow

import { Money } from '@adeira/sx-design';
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
              <div>
                {selectedItem.units} &times;{' '}
                <Money
                  priceUnitAmount={
                    selectedItem.itemUnitAmount / 100 // adjusted for centavo
                  }
                  priceUnitAmountCurrency="MXN"
                />{' '}
                ={' '}
                <Money
                  priceUnitAmount={
                    selectedItem.units * (selectedItem.itemUnitAmount / 100) // adjusted for centavo
                  }
                  priceUnitAmountCurrency="MXN"
                />
              </div>
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
        <fbt desc="summary of selected items in POS">
          <fbt:param name="totalSelectedItems">{stats.totalSelectedItems}</fbt:param> items for{' '}
          <fbt:param name="totalPrice">
            <Money
              priceUnitAmount={
                stats.totalPrice / 100 // adjusted for centavo
              }
              priceUnitAmountCurrency="MXN"
            />
          </fbt:param>
        </fbt>
      </div>
      <div className={styles('checkout')}>
        <Link
          href="/pos/checkout"
          disabled={stats.totalSelectedItems === 0}
          xstyle={styles.checkoutLink}
        >
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
    'paddingInline': '1rem',
    'paddingBlockEnd': '.5rem',
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
    backgroundColor: 'rgba(var(--sx-success-light))',
  },
  checkout: {
    padding: '1rem',
    backgroundColor: 'rgba(var(--sx-success))',
  },
  checkoutLink: {
    fontSize: 25,
    color: 'white',
  },
});
