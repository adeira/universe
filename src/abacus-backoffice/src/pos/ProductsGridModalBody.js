// @flow

import React, { useState, type Node } from 'react';
import { fbt } from 'fbt';
import { Button, LayoutBlock, LayoutInline, MoneyFn } from '@adeira/sx-design';
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

  const toggleSelectedAddon = (addonId, addonName, addonExtraPrice) => {
    setSelectedProductAddons((previousIds) => {
      const copyPreviousIds = new Map(previousIds);
      if (previousIds.has(addonId)) {
        // the ID was already selected before => remove it (toggle)
        copyPreviousIds.delete(addonId);
      } else {
        copyPreviousIds.set(addonId, {
          itemAddonID: addonId,
          itemAddonTitle: addonName,
          itemAddonExtraPrice: addonExtraPrice, // TODO: we currently don't take currency into account
        });
      }
      return copyPreviousIds;
    });
  };

  return (
    <LayoutBlock>
      <LayoutInline>
        {product.selectedAddons.map((addon) => {
          if (!addon) {
            return null; // TODO: (?)
          }
          return (
            <Button
              key={addon.id}
              size="large"
              tint={selectedProductAddons.has(addon.id) ? 'secondary' : 'default'}
              onClick={() => toggleSelectedAddon(addon.id, addon.name, addon.priceExtra.unitAmount)}
              // $FlowFixMe[incompatible-type]: https://github.com/adeira/universe/pull/3091
            >
              {addon.name} (
              {MoneyFn({
                priceUnitAmount: addon.priceExtra.unitAmount / 100, // adjusted for centavo
                priceUnitAmountCurrency: refineSupportedCurrencies(
                  addon.priceExtra.unitAmountCurrency,
                ),
                locale: bcp47,
              })}
              )
            </Button>
          );
        })}
      </LayoutInline>

      <hr />

      <Button
        tint="success"
        size="large"
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
