// @flow

import { Money } from '@adeira/sx-design';
import { fbt } from 'fbt';
import * as React from 'react';
import sx from '@adeira/sx';

import Link from '../Link';
import ProductsSelectedRows from './ProductsSelectedRows';
import useSelectedItemsApi from './recoil/selectedItemsState';

export default function ProductsSelected(): React.Node {
  const { stats } = useSelectedItemsApi();

  return (
    <div className={styles('wrapper')}>
      <div className={styles('selectedItems')}>
        <ProductsSelectedRows />
      </div>

      <div className={styles('stats')}>
        <fbt desc="summary of selected items in POS">
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
    overflowY: 'auto',
  },
  stats: {
    backgroundColor: 'rgba(var(--sx-success-light))',
    color: 'white',
    fontSize: '1.5rem',
    padding: '1rem',
  },
  checkout: {
    padding: '1rem',
    backgroundColor: 'rgba(var(--sx-success))',
  },
  checkoutLink: {
    fontSize: '2rem',
    color: 'white',
  },
});
