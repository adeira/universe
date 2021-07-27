// @flow

import React, { type Element, type Node } from 'react';
import { useRouter } from 'next/router';

import LayoutApp from '../../../src/LayoutApp';
import ProductsEditLayout from '../../../src/products/ProductsEditLayout';

export default function ProductsEditPage(): Node {
  const router = useRouter();
  const { productKey } = router.query;

  if (!productKey) {
    // It will be an empty object during pre-rendering, see:
    // https://nextjs.org/docs/api-reference/next/router#router-object
    return null;
  }

  return <ProductsEditLayout productKey={productKey} />;
}

ProductsEditPage.getLayout = (
  page: Element<typeof ProductsEditPage>,
): Element<typeof LayoutApp> => <LayoutApp>{page}</LayoutApp>;
