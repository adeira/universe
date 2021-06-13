// @flow

import sx from '@adeira/sx';
import React, { type Node } from 'react';
import { Skeleton } from '@adeira/sx-design';
import { rangeMap } from '@adeira/js';

import ProductsGrid from './ProductsGrid';

export default function ProductsGridLayout(): Node {
  return (
    <div className={styles('productsGrid')}>
      <React.Suspense
        fallback={rangeMap(12, (i) => (
          <Skeleton key={i} />
        ))}
      >
        <ProductsGrid />
      </React.Suspense>
    </div>
  );
}

const styles = sx.create({
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 250px)',
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
