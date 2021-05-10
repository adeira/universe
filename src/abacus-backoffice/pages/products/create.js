// @flow

import * as React from 'react';

import Layout from '../../src/Layout';
import ProductsCreateLayout from '../../src/products/ProductsCreateLayout';

export default function ProductsCreatePage(): React.Node {
  return (
    <Layout>
      <ProductsCreateLayout />
    </Layout>
  );
}
