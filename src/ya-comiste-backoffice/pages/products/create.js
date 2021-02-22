// @flow

import * as React from 'react';
import { Heading } from '@adeira/sx-design';
import { fbt } from 'fbt';

import Layout from '../../src/Layout';
import CreateProductForm from '../../src/products/CreateProductForm';

export default function ProductsCreatePage(): React.Node {
  return (
    <Layout
      heading={
        <Heading>
          <fbt desc="create a new product page heading">Create a new product</fbt>
        </Heading>
      }
      links={[
        {
          href: '/products',
          title: <fbt desc="go back to products navigation button">Products inventory</fbt>,
        },
      ]}
    >
      <CreateProductForm />
    </Layout>
  );
}
