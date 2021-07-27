// @flow

import React, { type Element, type Node } from 'react';

import LayoutApp from '../../src/LayoutApp';
import ProductCategoriesLayout from '../../src/products/ProductCategoriesLayout';

export default function ProductCategoriesPage(): Node {
  return <ProductCategoriesLayout />;
}

ProductCategoriesPage.getLayout = (
  page: Element<typeof ProductCategoriesPage>,
): Element<typeof LayoutApp> => <LayoutApp>{page}</LayoutApp>;
