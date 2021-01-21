// @flow

import * as React from 'react';
import fbt from 'fbt';

import Layout from '../src/Layout';
import Link from '../src/Link';

export default function ProductsPage(): React.Node {
  return (
    <Layout>
      <Link href="/products/create">
        <fbt desc="link for create a new product">Create a new product</fbt>
      </Link>

      <hr />

      <div>TODO (add/edit/delete product + prices, upload photos)</div>
    </Layout>
  );
}
