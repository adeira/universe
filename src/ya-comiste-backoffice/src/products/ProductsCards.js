// @flow

import { graphql, useLazyLoadQuery } from '@adeira/relay';
import { ProductCard } from '@adeira/sx-design';
import React, { type Node } from 'react';

import Link from '../Link';
import type { ProductsCardsQuery } from './__generated__/ProductsCardsQuery.graphql';

export default function ProductsCards(): Node {
  const data = useLazyLoadQuery<ProductsCardsQuery>(graphql`
    query ProductsCardsQuery {
      commerce {
        products: searchAllProducts(clientLocale: en_US, priceSortDirection: LOW_TO_HIGH) {
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
      }
    }
  `);

  return (
    data.commerce.products?.map((product) => {
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
          />
        </Link>
      );
    }) ?? null
  );
}
