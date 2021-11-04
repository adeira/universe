// @flow

import { graphql, useFragment } from '@adeira/relay';
import { ProductCard, LayoutGrid } from '@adeira/sx-design';
import React, { type Node } from 'react';
import fbt from 'fbt';

import Link from '../Link';
import refineSupportedCurrencies from '../refineSupportedCurrencies';
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
        isPublished
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
              priceUnitAmountCurrency={refineSupportedCurrencies(product.price.unitAmountCurrency)}
              imgBlurhash={product.imageCover?.blurhash}
              imgSrc={product.imageCover?.url}
              imgAlt={product.name}
              warningMessage={
                product.isPublished === false ? (
                  <fbt desc="warning when product is not published">
                    This product has not been published yet and might be invisible publicly.
                  </fbt>
                ) : undefined
              }
              // TODO: error message when some things are missing and need to be fixed
            />
          </Link>
        );
      }) ?? null}
    </LayoutGrid>
  );
}
