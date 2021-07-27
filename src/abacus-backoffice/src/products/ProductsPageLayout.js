// @flow

import { rangeMap } from '@adeira/js';
import { Loader, Skeleton, LayoutGrid, LayoutBlock } from '@adeira/sx-design';
import fbt from 'fbt';
import React, { useState, type Node } from 'react';

import LayoutPage from '../LayoutPage';
import LayoutHeadingLink from '../LayoutHeadingLink';
import ProductsCardsInCategory from './ProductsCardsInCategory';
import ProductsCategories from './ProductsCategories';

export default function ProductsPageLayout(): Node {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <LayoutPage
      isBeta={true}
      heading={<fbt desc="products inventory title">Products inventory</fbt>}
      description={
        <fbt desc="products inventory description">
          All products available across all our products are here.
        </fbt>
      }
      actionButtons={
        <LayoutHeadingLink href="/products/create">
          <fbt desc="link for create a new product">Create a new product</fbt>
        </LayoutHeadingLink>
      }
    >
      <LayoutBlock>
        <React.Suspense fallback={<Loader />}>
          <ProductsCategories
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </React.Suspense>

        <React.Suspense
          fallback={
            <LayoutGrid>
              {rangeMap(12, (i) => (
                <Skeleton key={i} />
              ))}
            </LayoutGrid>
          }
        >
          <ProductsCardsInCategory selectedCategory={selectedCategory} />
        </React.Suspense>
      </LayoutBlock>
    </LayoutPage>
  );
}
