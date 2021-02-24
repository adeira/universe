// @flow

import React, { type Node } from 'react';
import sx from '@adeira/sx';

import ProductsGrid from './ProductsGrid';
import ProductsSelected from './ProductsSelected';

export default function MainScreen(): Node {
  return (
    <div className={styles('mainGrid')}>
      <div className={styles('left')}>
        <ProductsSelected />
      </div>
      <main className={styles('right')}>
        <ProductsGrid />
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
    backgroundColor: 'white',
    height: '100vh',
  },
  right: {
    flex: 2,
    padding: '1rem',
  },
});
