// @flow

import React, { type Element, type Node } from 'react';

import ProductAddonsLayout from '../../src/products/ProductAddonsLayout';
import LayoutApp from '../../src/LayoutApp';

export default function ProductAddonsPage(): Node {
  return <ProductAddonsLayout />;
}

ProductAddonsPage.getLayout = (
  page: Element<typeof ProductAddonsPage>,
): Element<typeof LayoutApp> => <LayoutApp>{page}</LayoutApp>;
