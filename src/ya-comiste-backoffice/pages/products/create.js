// @flow

import * as React from 'react';
import { fbt } from 'fbt';
import { Heading } from '@adeira/sx-design';

import LayoutHeading from '../../src/LayoutHeading';
import LayoutQueryRenderer from '../../src/LayoutQueryRenderer';
import CreateProductForm from '../../src/products/CreateProductForm';

export default function ProductsCreatePage(): React.Node {
  return (
    <LayoutQueryRenderer
      onResponse={() => {
        return (
          <>
            <LayoutHeading
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
            />
            <CreateProductForm />
          </>
        );
      }}
    />
  );
}
