// @flow

import fbt from 'fbt';
import React, { type Node } from 'react';

import LayoutPage from '../LayoutPage';

export default function ProductsAddonsLayout(): Node {
  return (
    <LayoutPage
      isBeta={true}
      heading={<fbt desc="products add-ons title">Products add-ons</fbt>}
      description={
        <fbt desc="description of products add-ons">
          Products add-ons are additional items that can be attached to any product, but, they
          cannot be bought individually. For example: milk and sweetener for coffee are product
          add-ons whereas coffee is a product.
        </fbt>
      }
    >
      TODO
    </LayoutPage>
  );
}
