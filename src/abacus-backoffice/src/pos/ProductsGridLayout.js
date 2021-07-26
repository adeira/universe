// @flow

import React, { useState, type Node } from 'react';
import { LayoutBlock, LayoutGrid, Loader, Skeleton } from '@adeira/sx-design';
import { rangeMap } from '@adeira/js';
import sx from '@adeira/sx';

import ProductsGrid from './ProductsGrid';
import ProductsCategories from '../products/ProductsCategories';

export default function ProductsGridLayout(): Node {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <LayoutBlock>
      <div className={styles('stickyHeader')}>
        <React.Suspense fallback={<Loader />}>
          <ProductsCategories
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </React.Suspense>
      </div>

      <div className={styles('scrollingBody')}>
        <LayoutGrid>
          <React.Suspense
            fallback={rangeMap(12, (i) => (
              <Skeleton key={i} />
            ))}
          >
            <ProductsGrid selectedCategory={selectedCategory} />
          </React.Suspense>
        </LayoutGrid>
      </div>
    </LayoutBlock>
  );
}

const styles = sx.create({
  stickyHeader: {
    position: 'sticky',
    top: 0,
    zIndex: 2,
    backgroundColor: 'rgba(var(--sx-background))',
  },
  scrollingBody: {
    zIndex: 1,
  },
});
