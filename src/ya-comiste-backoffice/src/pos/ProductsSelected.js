// @flow

import { fbt } from 'fbt';
import * as React from 'react';
import sx from '@adeira/sx';

import Link from '../Link';
import useSelectedItemsApi from './recoil/selectedItemsState';

export default function ProductsSelected(): React.Node {
  const { selectedItems, stats } = useSelectedItemsApi();

  return (
    <div className={styles('wrapper')}>
      <div className={styles('selectedItems')}>
        {/* TODO (selected products, +- buttons) */}
        <pre>{JSON.stringify(selectedItems, null, 2)}</pre>
      </div>
      <div className={styles('stats')}>
        {/* TODO: https://github.com/facebook/fbt/pull/137 */}
        {fbt(
          `Selected ${fbt.param(
            'totalSelectedItems',
            stats.totalSelectedItems,
          )} items for ${fbt.param('totalPrice', stats.totalPrice)} MXN`,
          'summary of selected items in POS',
        )}
      </div>
      <div className={styles('checkout')}>
        <Link href="/pos/checkout">
          <fbt desc="checkout button title">Checkout</fbt>
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
    padding: '1rem',
    backgroundColor: 'lightgray',
  },
  stats: {
    padding: '1rem',
    backgroundColor: 'darkorange',
  },
  checkout: {
    padding: '1rem',
    backgroundColor: '#3b85ff',
  },
});
