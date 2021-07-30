// @flow

import React, { type Element, type Node } from 'react';

import LayoutApp from '../../src/LayoutApp';
import ProductsCreateLayout from '../../src/products/ProductsCreateLayout';

export default function ProductsCreatePage(): Node {
  return <ProductsCreateLayout />;
}

ProductsCreatePage.getLayout = (
  page: Element<typeof ProductsCreatePage>,
): Element<typeof LayoutApp> => <LayoutApp>{page}</LayoutApp>;
