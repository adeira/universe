// @flow

import React, { type Node } from 'react';
import { Heading, MissingData, Money, Section } from '@adeira/sx-design';
import sx from '@adeira/sx';
import { useFragment, graphql } from '@adeira/relay';

import type { MenuRow$key } from './__generated__/MenuRow.graphql';

type Props = {
  +menuRowData: MenuRow$key,
};

export default function MenuRow(props: Props): Node {
  const data = useFragment<MenuRow$key>(
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
    <Section xstyle={styles.menuRow}>
      <div className={styles('titlePriceRow')}>
        <Heading>{data.name}</Heading>
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
      <div className={styles('descriptionRow')}>{data.description}</div>
    </Section>
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
  descriptionRow: {
    fontSize: 12,
    color: 'rgba(var(--sx-accent-6))',
  },
});
