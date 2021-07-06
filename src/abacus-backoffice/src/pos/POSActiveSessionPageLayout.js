// @flow

import React, { type Node } from 'react';
import sx from '@adeira/sx';

import ProductsGridLayout from './ProductsGridLayout';
import ProductsSelected from './ProductsSelected';

export default function POSActiveSessionPageLayout(): Node {
  return (
    <div className={styles('mainGrid')}>
      <div className={styles('left')}>
        <ProductsSelected />
      </div>
      <main className={styles('right')}>
        <ProductsGridLayout />
      </main>
    </div>
  );
}

const styles = sx.create({
  mainGrid: {
    display: 'flex',
  },
  left: {
    flex: 1,
    position: 'sticky',
    top: 0,
    backgroundColor: 'rgba(var(--sx-accent-1))',
    height: '100vh',
  },
  right: {
    flex: 3,
    padding: '1rem',
    backgroundColor: 'rgba(var(--sx-background))',
  },
});
