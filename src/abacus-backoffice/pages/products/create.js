// @flow

import React, { type Element, type Node } from 'react';

import ProductsLayout from '../../src/products/ProductsLayout';
import ProductsCreateLayout from '../../src/products/ProductsCreateLayout';

export default function ProductsCreatePage(): Node {
  return <ProductsCreateLayout />;
}

ProductsCreatePage.getLayout = (
  page: Element<typeof ProductsCreatePage>,
): Element<typeof ProductsLayout> => <ProductsLayout>{page}</ProductsLayout>;
