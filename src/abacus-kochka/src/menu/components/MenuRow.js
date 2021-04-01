// @flow

import React, { type Node } from 'react';
import { MissingData, Money, Text } from '@adeira/sx-design';
import sx from '@adeira/sx';
import { useFragment, graphql } from '@adeira/relay';

import type { MenuRow$key } from './__generated__/MenuRow.graphql';

type Props = {
  +menuRowData: MenuRow$key,
};

export default function MenuRow(props: Props): Node {
  const data = useFragment(
    graphql`
      fragment MenuRow on Product {
        name
        description
        price {
          unitAmount
          unitAmountCurrency
        }
      }
    `,
    props.menuRowData,
  );

  // Other currencies are currently not supported by FE:
  const unitAmountCurrency = data.price.unitAmountCurrency;
  const isCurrencySupported = (currency): boolean %checks => {
    return currency === 'MXN';
  };

  return (
    <div className={styles('menuRow')}>
      <div className={styles('titlePriceRow')}>
        <Text as="h3" size={20}>
          {data.name}
        </Text>
        <div>
          {isCurrencySupported(unitAmountCurrency) ? (
            <Money
              priceUnitAmount={
                data.price.unitAmount / 100 // adjusted for octavo
              }
              priceUnitAmountCurrency={unitAmountCurrency}
            />
          ) : (
            <MissingData />
          )}
        </div>
      </div>
      {data.description != null ? <Text as="small">{data.description}</Text> : <MissingData />}
    </div>
  );
}

const styles = sx.create({
  menuRow: {
    display: 'flex',
    flexDirection: 'column',
    marginBlockEnd: 15,
  },
  titlePriceRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
