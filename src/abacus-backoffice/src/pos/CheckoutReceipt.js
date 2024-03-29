// @flow

import Icon from '@adeira/icons';
import sx from '@adeira/sx';
import { Button, LayoutInline, Money, Text, SupportedCurrencies } from '@adeira/sx-design';
import React, { type Node } from 'react';

import useSelectedItemsApi from './recoil/selectedItemsState';

type Props = {
  +disableButtons?: boolean,
};

export default function CheckoutReceipt(props: Props): Node {
  const { selectedItems, increaseUnits, decreaseUnits } = useSelectedItemsApi();

  return (
    <div className={styles('summary')}>
      {selectedItems.map((item) => {
        return (
          <div key={item.__compositeID} className={styles('summaryRow')}>
            <LayoutInline justifyContent="space-between">
              <div>
                <Text as="span">{item.units}&times;</Text> {item.itemTitle}
              </div>
              <Money
                priceUnitAmount={
                  item.itemUnitAmount / 100 // adjusted for centavo
                }
                priceUnitAmountCurrency={
                  SupportedCurrencies.MXN // TODO
                }
              />
            </LayoutInline>

            <div>
              {item.itemAddons != null
                ? item.itemAddons.map((itemAddon) => (
                    <LayoutInline key={itemAddon.itemAddonID} justifyContent="space-between">
                      <Text as="small">{itemAddon.itemAddonTitle}</Text>
                      <Text as="small">
                        <Money
                          priceUnitAmount={
                            itemAddon.itemAddonExtraPrice / 100 // adjusted for centavo
                          }
                          priceUnitAmountCurrency={
                            SupportedCurrencies.MXN // TODO
                          }
                        />
                      </Text>
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
    fontSize: '1.2rem',
  },
  summaryRowQuantity: {
    fontSize: '1.5rem',
  },
  summaryRowTotal: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBlockStart: '2rem',
    fontSize: '1.5rem',
  },
});
