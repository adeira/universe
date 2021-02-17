// @flow

import * as React from 'react';
import { Heading } from '@adeira/sx-design';
import { useRouter } from 'next/router';

import Layout from '../../../src/Layout';

export default function ProductsEditPage(): React.Node {
  const router = useRouter();
  const { productKey } = router.query;

  return (
    <Layout heading={<Heading>Edit product {productKey}</Heading>}>
      <div>TODO: product edit</div>
    </Layout>
  );
}
