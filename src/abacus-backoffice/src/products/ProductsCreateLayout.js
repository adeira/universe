// @flow

import { fbt } from 'fbt';
import React, { type Node } from 'react';
import { Heading } from '@adeira/sx-design';

import LayoutHeading from '../LayoutHeading';
import LayoutHeadingLink from '../LayoutHeadingLink';
import ProductCreateForm from './ProductCreateForm';

export default function ProductsCreateLayout(): Node {
  return (
    <>
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

      <ProductCreateForm />
    </>
  );
}
