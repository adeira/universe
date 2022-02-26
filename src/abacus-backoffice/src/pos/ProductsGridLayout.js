// @flow

import React, { type Node } from 'react';

import ProductsCategoriesLoader from '../products/ProductsCategoriesLoader';
import ProductsGridCategories from './ProductsGridCategories';

export default function ProductsGridLayout(): Node {
  return (
    <React.Suspense fallback={<ProductsCategoriesLoader />}>
      <ProductsGridCategories />
    </React.Suspense>
  );
}
