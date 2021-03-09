// @flow

import * as React from 'react';
import { fbt } from 'fbt';
import { Heading } from '@adeira/sx-design';

import LayoutHeading from '../../src/LayoutHeading';
import LayoutHeadingLink from '../../src/LayoutHeadingLink';
// eslint-disable-next-line camelcase
import LayoutQueryRenderer_DEPRECATED from '../../src/LayoutQueryRenderer_DEPRECATED';
import CreateProductForm from '../../src/products/CreateProductForm';

export default function ProductsCreatePage(): React.Node {
  return (
    // eslint-disable-next-line react/jsx-pascal-case
    <LayoutQueryRenderer_DEPRECATED
      onResponse={() => {
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
            <CreateProductForm />
          </>
        );
      }}
    />
  );
}
