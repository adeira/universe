// @flow

import React, { type Element, type Node } from 'react';

import LayoutApp from '../src/LayoutApp';
import ProductsPageLayout from '../src/products/ProductsPageLayout';

export default function ProductsPage(): Node {
  return <ProductsPageLayout />;
}

ProductsPage.getLayout = (page: Element<typeof ProductsPage>): Element<typeof LayoutApp> => (
  <LayoutApp>{page}</LayoutApp>
);
