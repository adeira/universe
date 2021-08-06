// @flow

import { graphql, useLazyLoadQuery } from '@adeira/relay';
import { Note, Entity, EntityField, Money, Badge, LayoutBlock } from '@adeira/sx-design';
import { fbt } from 'fbt';
import React, { type Node } from 'react';

import refineSupportedCurrencies from '../refineSupportedCurrencies';
import useApplicationLocale from '../useApplicationLocale';
import type { ProductAddonsQuery } from './__generated__/ProductAddonsQuery.graphql';

export default function ProductAddons(): Node {
  const applicationLocale = useApplicationLocale();
  const data = useLazyLoadQuery<ProductAddonsQuery>(
    graphql`
      query ProductAddonsQuery($clientLocale: SupportedLocale!) {
        commerce {
          productAddons: searchAllProductAddons(clientLocale: $clientLocale) {
            id
            name
            priceExtra {
              unitAmount
              unitAmountCurrency
            }
          }
        }
      }
    `,
    {
      clientLocale: applicationLocale.graphql,
    },
  );

  if (data.commerce.productAddons.length === 0) {
    return (
      <Note tint="warning">
        <fbt desc="empty product add-ons message">There are no product add-ons yet.</fbt>
      </Note>
    );
  }

  return (
    <LayoutBlock>
      {data.commerce.productAddons.map((productAddon) => {
        if (productAddon == null) {
          return null;
        }
        return (
          <Entity key={productAddon.id}>
            <EntityField title={productAddon.name} />
            <EntityField
              description={
                productAddon.priceExtra.unitAmount === 0 ? (
                  <Badge>
                    <fbt desc="free product add-on badge">free</fbt>
                  </Badge>
                ) : (
                  <Money
                    priceUnitAmount={
                      productAddon.priceExtra.unitAmount / 100 // adjusted for centavo
                    }
                    priceUnitAmountCurrency={refineSupportedCurrencies(
                      productAddon.priceExtra.unitAmountCurrency,
                    )}
                  />
                )
              }
            />
          </Entity>
        );
      })}
    </LayoutBlock>
  );
}
