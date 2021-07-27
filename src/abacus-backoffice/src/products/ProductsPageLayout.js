// @flow

import { rangeMap } from '@adeira/js';
import { Heading, Loader, Skeleton, LayoutGrid } from '@adeira/sx-design';
import fbt from 'fbt';
import React, { useState, type Node } from 'react';

import Layout from '../Layout';
import LayoutHeading from '../LayoutHeading';
import LayoutHeadingLink from '../LayoutHeadingLink';
import ProductsCardsInCategory from './ProductsCardsInCategory';
import ProductsCategories from './ProductsCategories';

export default function ProductsPageLayout(): Node {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <Layout>
      <LayoutHeading
        heading={
          <Heading>
            <fbt desc="product inventory title">Products inventory</fbt>
          </Heading>
        }
      >
        <LayoutHeadingLink href="/products/create">
          <fbt desc="link for create a new product">Create a new product</fbt>
        </LayoutHeadingLink>
      </LayoutHeading>

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
    </Layout>
  );
}
