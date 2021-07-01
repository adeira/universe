// @flow

import fbt from 'fbt';
import React, { type Node } from 'react';
import sx from '@adeira/sx';
import { Heading } from '@adeira/sx-design';

import Layout from '../Layout';
import LayoutHeading from '../LayoutHeading';
import LayoutHeadingLink from '../LayoutHeadingLink';

export default function ProductsAddonsLayout(): Node {
  return (
    <Layout>
      <LayoutHeading
        heading={
          <Heading xstyle={styles.heading}>
            <fbt desc="products add-ons title">Products add-ons</fbt>
          </Heading>
        }
        description={
          <fbt desc="description of products add-ons">
            Products add-ons are additional items that can be attached to any product, but, they
            cannot be bought individually. For example: milk and sweetener for coffee are product
            add-ons whereas coffee is a product.
          </fbt>
        }
      >
        <LayoutHeadingLink href="/products/add-ons/create">
          <fbt desc="link for create a new product">Create a new product add-on</fbt>
        </LayoutHeadingLink>
      </LayoutHeading>

      <div>TODO (print all add-ons, create, edit)</div>
    </Layout>
  );
}

const styles = sx.create({
  heading: {
    marginBlockEnd: 0,
  },
});
