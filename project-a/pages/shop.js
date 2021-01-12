// @flow

import * as React from 'react';
import fbt from 'fbt';
import sx from '@adeira/sx';

import Heading from '../src/design/Heading';
// import ProductCard from '../src/design/ProductCard';
import Section from '../src/design/Section';
import Skeleton from '../src/design/Skeleton';
import Link from '../src/Link';
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
            <Link href="#todo">Tktk</Link>
          </div>
          <div>
            <Link href="#todo">Shop All</Link>
          </div>
        </div>

        <div className={styles('productsGrid')}>
          {/* Loading screen (first Skeleton, then Blurhash, then the actual image): */}
          {rangeMap(12, (i) => (
            <Link href={`/shop/${'todo'}`}>
              <Skeleton key={i} />
            </Link>
          ))}
        </div>

        <div>
          <Heading>
            <fbt desc="shop relevance selection title">Relevance</fbt>
          </Heading>
          <div>
            <Link href="#todo">Price: Low to high</Link>
          </div>
          <div>
            <Link href="#todo">Price: High to low</Link>
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
