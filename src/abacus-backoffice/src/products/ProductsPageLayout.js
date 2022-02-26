// @flow

import fbt from 'fbt';
import React, { type Node } from 'react';

import LayoutPage from '../LayoutPage';
import LayoutHeadingLink from '../LayoutHeadingLink';
import ProductsCategories from './ProductsCategories';
import ProductsCategoriesLoader from './ProductsCategoriesLoader';

export default function ProductsPageLayout(): Node {
  return (
    <LayoutPage
      isBeta={true}
      heading={<fbt desc="products inventory title">Products inventory</fbt>}
      description={
        <fbt desc="products inventory description">
          All products available across all our services are here.
        </fbt>
      }
      actionButtons={
        <LayoutHeadingLink href="/products/create">
          <fbt desc="link for create a new product">Create a new product</fbt>
        </LayoutHeadingLink>
      }
    >
      <React.Suspense fallback={<ProductsCategoriesLoader />}>
        <ProductsCategories />
      </React.Suspense>
    </LayoutPage>
  );
}
