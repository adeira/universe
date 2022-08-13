// @flow

import React, { type Element, type Node } from 'react';

import ProductAddonsLayout from '../../src/products/ProductAddonsLayout';
import ProductsLayout from '../../src/products/ProductsLayout';

export default function ProductAddonsPage(): Node {
  return <ProductAddonsLayout />;
}

ProductAddonsPage.getLayout = (
  page: Element<typeof ProductAddonsPage>,
): Element<typeof ProductsLayout> => <ProductsLayout>{page}</ProductsLayout>;
