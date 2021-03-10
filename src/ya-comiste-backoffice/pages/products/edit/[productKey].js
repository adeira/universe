// @flow

import * as React from 'react';
import { useRouter } from 'next/router';

import Layout from '../../../src/Layout';
import ProductsEditLayout from '../../../src/products/ProductsEditLayout';

export default function ProductsEditPage(): React.Node {
  const router = useRouter();
  const { productKey } = router.query;

  if (!productKey) {
    // It will be an empty object during pre-rendering, see:
    // https://nextjs.org/docs/api-reference/next/router#router-object
    return null;
  }

  return (
    <Layout>
      <ProductsEditLayout productKey={productKey} />
    </Layout>
  );
}
