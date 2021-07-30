// @flow

import React, { type Element, type Node } from 'react';

import ProductsAddonsLayout from '../../src/products/ProductsAddonsLayout';
import LayoutApp from '../../src/LayoutApp';

export default function ProductAddonsPage(): Node {
  return <ProductsAddonsLayout />;
}

ProductAddonsPage.getLayout = (
  page: Element<typeof ProductAddonsPage>,
): Element<typeof LayoutApp> => <LayoutApp>{page}</LayoutApp>;
