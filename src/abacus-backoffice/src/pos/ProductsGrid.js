// @flow

import sx from '@adeira/sx';
import React, { type Node } from 'react';
import { graphql, useLazyLoadQuery } from '@adeira/relay';
import { ProductCard } from '@adeira/sx-design';

import useSelectedItemsApi from './recoil/selectedItemsState';
import type { ProductsGridPosQuery } from './__generated__/ProductsGridPosQuery.graphql';

export default function ProductsGrid(): Node {
  const { select } = useSelectedItemsApi();
  const data = useLazyLoadQuery<ProductsGridPosQuery>(graphql`
    query ProductsGridPosQuery {
      pos {
        products: listPublishedProducts {
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

  const handleItemClick = (productID, product) => {
    select({
      itemID: productID,
      itemTitle: product.name,
      itemUnitAmount: product.price.unitAmount,
      units: 1,
    });
  };

  return (
    data.pos.products?.map((product) => {
      if (product == null) {
        return null; // TODO: 🤔
      }

      return (
        <button
          type="button"
          key={product.id}
          className={styles('productButton')}
          onClick={() => handleItemClick(product.key, product)}
        >
          <ProductCard
            title={product.name}
            priceUnitAmount={
              product.price.unitAmount / 100 // adjusted for centavo
            }
            /* $FlowFixMe[incompatible-type]: This comment suppresses an error when upgrading to
             * Relay Hooks. To see the error delete this comment and run Flow. */
            priceUnitAmountCurrency={product.price.unitAmountCurrency}
            imgBlurhash={product.imageCover?.blurhash}
            imgSrc={product.imageCover?.url}
            imgAlt={product.name}
          />
        </button>
      );
    }) ?? null
  );
}

const styles = sx.create({
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '1rem',
  },
  productButton: {
    margin: 0,
    padding: 0,
    textAlign: 'inherit',
    cursor: 'pointer',
    border: 'none',
  },
});
