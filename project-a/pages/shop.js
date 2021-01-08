// @flow

import * as React from 'react';
import fbt from 'fbt';
import sx from '@adeira/sx';

import Heading from '../src/design/Heading';
// import ProductCarrangeMap.jsd from '../src/design/ProductCard';
import Section from '../src/design/Section';
import Skeleton from '../src/design/Skeleton';
import rangeMap from '../src/utils/rangeMap';
import Layout from '../src/Layout';

export default function Shop(): React.Node {
  return (
    <Layout
      withFullWidth={true}
      title={<fbt desc="shop page title">Online shop</fbt>}
      subtitle={
        <fbt desc="shop page subtitle">Support our cats by buying some of our products</fbt>
      }
    >
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
    </Layout>
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
