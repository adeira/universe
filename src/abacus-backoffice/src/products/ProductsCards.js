// @flow

import { graphql, useFragment } from '@adeira/relay';
import { ProductCard, LayoutGrid } from '@adeira/sx-design';
import React, { type Node } from 'react';

import Link from '../Link';
import type { ProductsCardsData$key } from './__generated__/ProductsCardsData.graphql';

type Props = {
  +dataProducts: ProductsCardsData$key,
};

export default function ProductsCards(props: Props): Node {
  const products = useFragment<ProductsCardsData$key>(
    graphql`
      fragment ProductsCardsData on Product @relay(plural: true) {
        id
        key
        name
        imageCover {
          blurhash
          url
        }
        price {
          unitAmount
          unitAmountCurrency
        }
      }
    `,
    props.dataProducts,
  );

  return (
    <LayoutGrid>
      {products.map((product) => {
        if (product == null) {
          return null; // TODO: 🤔
        }

        return (
          <Link key={product.id} href={`/products/edit/${product.key}`}>
            <ProductCard
              title={product.name}
              priceUnitAmount={product.price.unitAmount / 100}
              /* $FlowFixMe[incompatible-type]: This comment suppresses an error when upgrading to
               * Relay Hooks. To see the error delete this comment and run Flow. */
              priceUnitAmountCurrency={product.price.unitAmountCurrency}
              imgBlurhash={product.imageCover?.blurhash}
              imgSrc={product.imageCover?.url}
              imgAlt={product.name}
            />
          </Link>
        );
      }) ?? null}
    </LayoutGrid>
  );
}
