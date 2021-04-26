// @flow

import sx from '@adeira/sx';
import { MoneyFn } from '@adeira/sx-design';
import React, { type Node } from 'react';

import useSelectedItemsApi from './recoil/selectedItemsState';

type Props = {
  +tint: string,
};

export default function POSCheckoutSummary(props: Props): Node {
  const { stats, selectedItems } = useSelectedItemsApi();

  return (
    <div className={styles('summary')} style={{ backgroundColor: props.tint }}>
      <samp>
        {selectedItems.map((item) => {
          return (
            <React.Fragment key={item.itemID}>
              {item.units}x &quot;{item.itemTitle}&quot; each{' '}
              {MoneyFn({
                priceUnitAmount: item.itemUnitAmount,
                priceUnitAmountCurrency: 'MXN',
                locale: 'en-US', // TODO
              })}
              <br />
            </React.Fragment>
          );
        })}
        <br />
        Total:{' '}
        {MoneyFn({
          priceUnitAmount: stats.totalPrice,
          priceUnitAmountCurrency: 'MXN',
          locale: 'en-US', // TODO
        })}
      </samp>
    </div>
  );
}

const styles = sx.create({
  summary: {
    padding: '1rem 2rem 1rem 2rem',
    margin: '1rem',
    fontSize: '1.5rem',
    maxWidth: 750,
  },
});
