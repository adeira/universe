// @flow

import * as React from 'react';
import fbt from 'fbt';
import sx from '@adeira/sx';
import Head from 'next/head';

import Heading from '../src/design/Heading';
import ProductCard from '../src/design/ProductCard';
import Skeleton from '../src/design/Skeleton';
import Subpage from '../src/Subpage';

export default function Shop(): React.Node {
  return (
    <>
      <Head>
        <title>
          {/* TODO: translations, reuse main title */}
          KOCHKA café · Shop
        </title>
      </Head>

      <Subpage withJumbotron={false} title={'TODO (replace with full width and categories)'}>
        <div>
          <Heading>
            <fbt desc="shop categories selection title">Categories</fbt>
          </Heading>
        </div>

        <div className={styles('products')}>
          <div className={styles('product')}>
            <Skeleton />
          </div>
          <div className={styles('product')}>
            <Skeleton />
          </div>
          <div className={styles('product')}>
            <Skeleton />
          </div>
        </div>

        <div className={styles('products')}>
          <div className={styles('product')}>
            <ProductCard />
          </div>
          <div className={styles('product')}>
            <ProductCard />
          </div>
          <div className={styles('product')}>
            <ProductCard />
          </div>
        </div>

        <div>
          <Heading>
            <fbt desc="shop relevance selection title">Relevance</fbt>
          </Heading>
        </div>
      </Subpage>
    </>
  );
}

const styles = sx.create({
  products: {
    display: 'flex',
    flexDirection: 'row',
  },
  product: {
    marginRight: 5,
  },
});
