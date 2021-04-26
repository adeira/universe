// @flow

import { rangeMap } from '@adeira/js';
import sx from '@adeira/sx';
import { Heading, Skeleton } from '@adeira/sx-design';
import fbt from 'fbt';
import React, { type Node } from 'react';

import Layout from '../Layout';
import LayoutHeading from '../LayoutHeading';
import LayoutHeadingLink from '../LayoutHeadingLink';
import ProductsCards from './ProductsCards';

export default function ProductsPageLayout(): Node {
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

      <div className={styles('productsGrid')}>
        <React.Suspense
          fallback={rangeMap(12, (i) => (
            <Skeleton key={i} />
          ))}
        >
          <ProductsCards />
        </React.Suspense>
      </div>
    </Layout>
  );
}

const styles = sx.create({
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '1rem',
  },
});
