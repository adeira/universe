// @flow

import fbt from 'fbt';
import React, { type Node } from 'react';
import { Loader } from '@adeira/sx-design';

import LayoutPage from '../LayoutPage';
import ProductCategoriesList from './ProductCategoriesList';

export default function ProductCategoriesLayout(): Node {
  return (
    <LayoutPage
      isBeta={true}
      heading={<fbt desc="products categories title">Products categories</fbt>}
    >
      <React.Suspense fallback={<Loader />}>
        <ProductCategoriesList />
      </React.Suspense>
    </LayoutPage>
  );
}
