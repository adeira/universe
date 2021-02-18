// @flow

import * as React from 'react';
import fbt from 'fbt';
import sx from '@adeira/sx';
import { graphql, QueryRenderer } from '@adeira/relay';
import { rangeMap } from '@adeira/js';
import { Skeleton, ProductCard, Heading } from '@adeira/sx-design';

import Layout from '../src/Layout';
import Link from '../src/Link';

export default function ProductsPage(): React.Node {
  return (
    <Layout
      heading={
        <Heading>
          <fbt desc="product inventory title">Products inventory</fbt>
        </Heading>
      }
      links={[
        {
          href: '/products/create',
          title: <fbt desc="link for create a new product">Create a new product</fbt>,
        },
      ]}
    >
      <div className={styles('productsGrid')}>
        <QueryRenderer
          query={graphql`
            query productsQuery {
              searchAllProducts(clientLocale: en_US, priceSortDirection: LOW_TO_HIGH) {
                id
                key
                name
                imageCover {
                  blurhash
                }
                price {
                  unitAmount
                  unitAmountCurrency
                }
              }
            }
          `}
          onLoading={() => rangeMap(12, (i) => <Skeleton key={i} />)}
          onResponse={({ searchAllProducts: products }) =>
            products.map((product) => (
              <Link key={product.id} href={`/products/edit/${product.key}`}>
                <ProductCard
                  title={product.name}
                  priceUnitAmount={product.price.unitAmount / 100}
                  priceUnitAmountCurrency={product.price.unitAmountCurrency}
                  imgBlurhash={product.imageCover?.blurhash}
                  // TODO: `imgSrc`
                />
              </Link>
            ))
          }
        />
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
