// @flow

import Icon from '@adeira/icons';
import sx from '@adeira/sx';
import { Button, LayoutInline, MoneyFn, Text } from '@adeira/sx-design';
import React, { type Node } from 'react';
import fbt from 'fbt';

import useApplicationLocale from '../useApplicationLocale';
import useSelectedItemsApi from './recoil/selectedItemsState';

type Props = {
  +disableButtons?: boolean,
};

export default function CheckoutReceipt(props: Props): Node {
  const { stats, selectedItems, increaseUnits, decreaseUnits } = useSelectedItemsApi();
  const { bcp47 } = useApplicationLocale();

  return (
    <div className={styles('summary')}>
      {selectedItems.map((item) => {
        return (
          <div key={item.__compositeID} className={styles('summaryRow')}>
            <LayoutInline justifyContent="space-between">
              <div>
                <Text as="small">{item.units}&times;</Text> {item.itemTitle}
              </div>
              <div>
                <Text as="small">{item.units}&times;</Text>{' '}
                {MoneyFn({
                  priceUnitAmount: item.itemUnitAmount / 100, // adjusted for centavo
                  priceUnitAmountCurrency: 'MXN', // TODO
                  locale: bcp47,
                })}
              </div>
            </LayoutInline>

            <div>
              {item.itemAddons != null
                ? item.itemAddons.map((itemAddon) => (
                    <LayoutInline key={itemAddon.itemAddonID} justifyContent="space-between">
                      <div>
                        <Text as="small">{itemAddon.itemAddonTitle}</Text>
                      </div>

                      <div>
                        <Text as="small">
                          {MoneyFn({
                            priceUnitAmount: itemAddon.itemAddonExtraPrice / 100, // adjusted for centavo
                            priceUnitAmountCurrency: 'MXN', // TODO
                            locale: bcp47,
                          })}
                        </Text>
                      </div>
                    </LayoutInline>
                  ))
                : null}
            </div>

            {!props.disableButtons && (
              <LayoutInline>
                <Button
                  aria-label="minus"
                  size="small"
                  tint="secondary"
                  onClick={() => decreaseUnits(item.__compositeID)}
                >
                  <Icon name="minus" />
                </Button>
                <Button
                  aria-label="plus"
                  size="small"
                  tint="secondary"
                  onClick={() => increaseUnits(item.__compositeID)}
                >
                  <Icon name="plus" />
                </Button>
              </LayoutInline>
            )}
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
            priceUnitAmountCurrency: 'MXN', // TODO
            locale: bcp47,
          })}
        </div>
      </div>
    </div>
  );
}

const styles = sx.create({
  summary: {
    fontFamily: 'monospace',
    padding: '1rem',
    fontSize: '1rem',
    textAlign: 'start',
    color: 'rgba(var(--sx-foreground))',
  },
  summaryRow: {
    display: 'flex',
    flexDirection: 'column',
    marginBlockEnd: '1.2rem',
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
