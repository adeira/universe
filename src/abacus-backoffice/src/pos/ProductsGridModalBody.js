// @flow

import React, { useState, type Node } from 'react';
import { fbt } from 'fbt';
import { Button, FilterChip, FilterChips, LayoutBlock, MoneyFn } from '@adeira/sx-design';
import { usePreloadedQuery, graphql, type PreloadedQuery } from '@adeira/relay';

import refineSupportedCurrencies from '../refineSupportedCurrencies';
import useApplicationLocale from '../useApplicationLocale';
import useSelectedItemsApi from './recoil/selectedItemsState';
import { type ProductsGridModalBodyQuery } from './__generated__/ProductsGridModalBodyQuery.graphql';

type Props = {
  +isOpen: boolean,
  +onClose: () => void,
  +productKey: string,
  +preloadedQueryRef: PreloadedQuery<ProductsGridModalBodyQuery>,
};

export default function ProductsGridModalBody(props: Props): Node {
  const [selectedProductAddons, setSelectedProductAddons] = useState(new Map());
  const { select } = useSelectedItemsApi();
  const { bcp47 } = useApplicationLocale();

  const {
    commerce: { product },
  } = usePreloadedQuery<ProductsGridModalBodyQuery>(
    graphql`
      query ProductsGridModalBodyQuery($clientLocale: SupportedLocale!, $productKey: ID!) {
        commerce {
          product: getPublishedProductByKey(clientLocale: $clientLocale, productKey: $productKey) {
            name
            price {
              unitAmount
            }
            selectedAddons(clientLocale: $clientLocale) {
              id
              name
              priceExtra {
                unitAmount
                unitAmountCurrency
              }
            }
          }
        }
      }
    `,
    props.preloadedQueryRef,
  );

  const handleFiltersChange = (selectedAddonIds) => {
    const newSelectedProductAddons = new Map();
    for (const selectedAddonId of selectedAddonIds) {
      const addon = product.selectedAddons.find(
        (addon) => addon != null && addon.id === selectedAddonId,
      );
      if (addon != null) {
        newSelectedProductAddons.set(selectedAddonId, {
          itemAddonID: selectedAddonId,
          itemAddonTitle: addon.name,
          itemAddonExtraPrice: addon.priceExtra.unitAmount, // TODO: we currently don't take currency into account
        });
      }
    }
    setSelectedProductAddons(newSelectedProductAddons);
  };

  return (
    <LayoutBlock spacing="large">
      <FilterChips onFiltersChange={handleFiltersChange}>
        {product.selectedAddons.reduce((acc, addon) => {
          if (addon != null) {
            acc.push(
              <FilterChip
                key={addon.id}
                value={addon.id}
                title={addon.name}
                description={MoneyFn({
                  priceUnitAmount: addon.priceExtra.unitAmount / 100, // adjusted for centavo
                  priceUnitAmountCurrency: refineSupportedCurrencies(
                    addon.priceExtra.unitAmountCurrency,
                  ),
                  locale: bcp47,
                })}
              />,
            );
          }
          return acc;
        }, [])}
      </FilterChips>

      <Button
        tint="success"
        onClick={() => {
          select({
            itemID: props.productKey,
            itemTitle: product.name,
            itemUnitAmount: product.price.unitAmount,
            itemAddons: Array.from(selectedProductAddons.values()),
            units: 1,
          });
        }}
      >
        {selectedProductAddons.size > 0 ? (
          <fbt desc="confirm selected product addons button title">
            Confirm selection (<fbt:param name="numberOfSelectedProducts">
              {selectedProductAddons.size}
            </fbt:param>{' '}
            addons)
          </fbt>
        ) : (
          <fbt desc="confirm selected product without addons button title">
            Confirm selection (no addons)
          </fbt>
        )}
      </Button>
    </LayoutBlock>
  );
}
