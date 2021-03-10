// @flow

import * as React from 'react';
import { fbt } from 'fbt';
import { Heading } from '@adeira/sx-design';

import Layout from '../../src/Layout';
import LayoutHeading from '../../src/LayoutHeading';
import LayoutHeadingLink from '../../src/LayoutHeadingLink';
import CreateProductForm from '../../src/products/CreateProductForm';

export default function ProductsCreatePage(): React.Node {
  // TODO: move most of the React code to `src/

  return (
    <Layout>
      <LayoutHeading
        heading={
          <Heading>
            <fbt desc="create a new product page heading">Create a new product</fbt>
          </Heading>
        }
      >
        <LayoutHeadingLink href="/products">
          <fbt desc="go back to products navigation button">Products inventory</fbt>
        </LayoutHeadingLink>
      </LayoutHeading>
      <CreateProductForm />
    </Layout>
  );
}
