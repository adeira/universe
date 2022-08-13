// @flow

import React, { type Element, type Node } from 'react';

import ProductsLayout from '../../src/products/ProductsLayout';
import ProductCategoriesLayout from '../../src/products/ProductCategoriesLayout';

export default function ProductCategoriesPage(): Node {
  return <ProductCategoriesLayout />;
}

ProductCategoriesPage.getLayout = (
  page: Element<typeof ProductCategoriesPage>,
): Element<typeof ProductsLayout> => <ProductsLayout>{page}</ProductsLayout>;
