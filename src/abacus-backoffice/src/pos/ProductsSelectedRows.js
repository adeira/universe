// @flow

import { Note } from '@adeira/sx-design';
import { fbt } from 'fbt';
import * as React from 'react';
import sx from '@adeira/sx';

import CheckoutReceipt from './CheckoutReceipt';
import useSelectedItemsApi from './recoil/selectedItemsState';

export default function ProductsSelectedRows(): React.Node {
  const { selectedItems } = useSelectedItemsApi();

  return selectedItems.size === 0 ? (
    <div className={styles('nothingSelected')}>
      <Note notePrefix={<fbt desc="default note prefix">Note</fbt>}>
        <fbt desc="text when nothing is selected in POS">nothing selected yet</fbt>
      </Note>
    </div>
  ) : (
    <CheckoutReceipt disableTotal={true} />
  );
}

const styles = sx.create({
  nothingSelected: {
    margin: '1rem',
  },
});
