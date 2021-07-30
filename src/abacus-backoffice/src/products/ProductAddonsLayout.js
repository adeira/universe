// @flow

import { rangeMap } from '@adeira/js';
import { LayoutGrid, Skeleton } from '@adeira/sx-design';
import fbt from 'fbt';
import React, { type Node } from 'react';

import LayoutPage from '../LayoutPage';
import ProductAddons from './ProductAddons';

export default function ProductAddonsLayout(): Node {
  return (
    <LayoutPage
      isBeta={true}
      heading={<fbt desc="product add-ons title">Product add-ons</fbt>}
      description={
        <fbt desc="description of product add-ons">
          Product add-ons are additional items that can be attached to any product, but, they cannot
          be bought individually. For example: milk and sweetener for coffee are product add-ons
          whereas coffee is a product.
        </fbt>
      }
    >
      <React.Suspense
        fallback={
          <LayoutGrid>
            {rangeMap(12, (i) => (
              <Skeleton key={i} />
            ))}
          </LayoutGrid>
        }
      >
        <ProductAddons />
      </React.Suspense>
    </LayoutPage>
  );
}
