// @flow

import sx from '@adeira/sx';
import React, { type Node } from 'react';
import { graphql, QueryRenderer } from '@adeira/relay';
import { ProductCard, Skeleton } from '@adeira/sx-design';
import { rangeMap } from '@adeira/js';

import useSelectedItemsApi from './recoil/selectedItemsState';

export default function ProductsGrid(): Node {
  const { select } = useSelectedItemsApi();

  const handleDemoItemClick = (itemID, unitAmount) => {
    select({
      itemID,
      itemUnitAmount: unitAmount,
    });
  };

  return (
    <QueryRenderer
      query={graphql`
        query ProductsGridPosQuery {
          pos {
            listPublishedProducts {
              id
              key
              name
              imageCover {
                blurhash
              }
              price {
                unitAmount
                unitAmountCurrency
              }
            }
          }
        }
      `}
      onLoading={() => {
        return (
          <div className={styles('productsGrid')}>
            {rangeMap(12, (i) => (
              <Skeleton key={i} />
            ))}
          </div>
        );
      }}
      onResponse={({ pos: { listPublishedProducts: products } }) => {
        return (
          <div className={styles('productsGrid')}>
            {products.map((product) => (
              <button
                type="button"
                key={product.id}
                className={styles('productButton')}
                onClick={() => handleDemoItemClick(product.key, product.price.unitAmount)}
              >
                <ProductCard
                  title={product.name}
                  priceUnitAmount={product.price.unitAmount}
                  priceUnitAmountCurrency={product.price.unitAmountCurrency}
                  imgBlurhash={product.imageCover?.blurhash}
                  locale="en-US" // TODO
                  // TODO: `imgSrc`
                />
              </button>
            ))}
          </div>
        );
      }}
    />
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
  },
});
