// @flow

import { graphql, useLazyLoadQuery } from '@adeira/relay';
import { Note, Entity, EntityField, Money, Badge, LayoutBlock } from '@adeira/sx-design';
import { fbt } from 'fbt';
import React, { type Node } from 'react';

import refineSupportedCurrencies from '../refineSupportedCurrencies';
import useApplicationLocale from '../useApplicationLocale';

export default function ProductAddons(): Node {
  const applicationLocale = useApplicationLocale();
  // eslint-disable-next-line relay/generated-flow-types -- https://github.com/relayjs/eslint-plugin-relay/issues/131
  const data = useLazyLoadQuery(
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
      <Note tint="warning" notePrefix={<fbt desc="warning note prefix">Warning</fbt>}>
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
              title={
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
