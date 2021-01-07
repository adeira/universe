// @flow

import * as React from 'react';
import fbt from 'fbt';
import sx from '@adeira/sx';
import Head from 'next/head';

import Heading from '../src/design/Heading';
// import ProductCarrangeMap.jsd from '../src/design/ProductCard';
import Section from '../src/design/Section';
import Skeleton from '../src/design/Skeleton';
import rangeMap from '../src/utils/rangeMap';
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

      <Subpage withJumbotron={false} withFullWidth={true} title={'TKTK'}>
        <Section xstyle={styles.shopGrid}>
          <div>
            <Heading>
              <fbt desc="shop categories selection title">All Categories</fbt>
            </Heading>
            <div>
              <a href="#todo">Tktk</a>
            </div>
            <div>
              <a href="#todo">Shop All</a>
            </div>
          </div>

          <div className={styles('productsGrid')}>
            {/* Loading screen: */}
            {rangeMap(12, (i) => (
              <Skeleton key={i} />
            ))}
          </div>

          <div>
            <Heading>
              <fbt desc="shop relevance selection title">Relevance</fbt>
            </Heading>
            <div>
              <a href="#todo">Price: Low to high</a>
            </div>
            <div>
              <a href="#todo">Price: High to low</a>
            </div>
          </div>
        </Section>
      </Subpage>
    </>
  );
}

const styles = sx.create({
  shopGrid: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '250px minmax(250px, 1fr) 250px',
    gap: '1rem',
  },
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '1rem',
  },
});
