// @flow

import React, { type Element, type Node } from 'react';

import ProductsLayout from '../src/products/ProductsLayout';
import ProductsPageLayout from '../src/products/ProductsPageLayout';

export default function ProductsPage(): Node {
  return <ProductsPageLayout />;
}

ProductsPage.getLayout = (page: Element<typeof ProductsPage>): Element<typeof ProductsLayout> => (
  <ProductsLayout>{page}</ProductsLayout>
);
