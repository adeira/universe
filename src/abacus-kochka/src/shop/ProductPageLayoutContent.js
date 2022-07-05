// @flow

import { graphql, useFragment } from '@adeira/relay';
import sx from '@adeira/sx';
import {
  Note,
  Text,
  Image,
  Money,
  LayoutBlock,
  MediaQueryDevice,
  SupportedCurrencies,
  MissingData,
} from '@adeira/sx-design';
import fbt from 'fbt';
import React, { type Node } from 'react';

import type { ProductPageLayoutContentFragment$key } from './__generated__/ProductPageLayoutContentFragment.graphql';

type Props = {
  +relayFragmentRef: ProductPageLayoutContentFragment$key,
};

export default function ProductPageLayoutContent(props: Props): Node {
  const { product } = useFragment(
    graphql`
      fragment ProductPageLayoutContentFragment on CommerceQuery {
        product: getPublishedProductByKey(clientLocale: $clientLocale, productKey: $productKey) {
          name
          description
          price {
            unitAmount
            unitAmountCurrency
          }
          images {
            blurhash
            url
          }
        }
      }
    `,
    props.relayFragmentRef,
  );

  const unitAmountCurrency = SupportedCurrencies.cast(product.price.unitAmountCurrency);

  return (
    <div className={styles('layout')}>
      <LayoutBlock>
        {product.images.map((image) => (
          <Image key={image.url} src={image.url} alt={product.name} blurhash={image.blurhash} />
        ))}
      </LayoutBlock>

      <LayoutBlock spacing="large">
        <Text as="h1">{product.name}</Text>

        <Text size={24} weight={400}>
          {unitAmountCurrency == null ? (
            <MissingData />
          ) : (
            <Money
              priceUnitAmount={
                product.price.unitAmount / 100 // adjusted for centavo
              }
              priceUnitAmountCurrency={unitAmountCurrency}
            />
          )}
        </Text>

        <p className={styles('description')}>{product.description}</p>

        <Note tint="warning">
          <fbt desc="not about all our products being available only in person">
            All our products are currently available only in person in our café. We are working on
            making them available online as well.
          </fbt>
        </Note>
      </LayoutBlock>
    </div>
  );
}

const styles = sx.create({
  layout: {
    display: 'grid',
    gap: '2rem',
    [MediaQueryDevice.DESKTOP]: {
      gridTemplateColumns: '1fr 1fr',
    },
  },
  description: {
    paddingBlock: 0,
    marginBlock: 0,
    whiteSpace: 'pre-line',
  },
});
