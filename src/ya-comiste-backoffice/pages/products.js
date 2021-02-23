// @flow

import * as React from 'react';
import fbt from 'fbt';
import sx from '@adeira/sx';
import { graphql } from '@adeira/relay';
import { rangeMap } from '@adeira/js';
import { Skeleton, ProductCard, Heading } from '@adeira/sx-design';

import LayoutQueryRenderer from '../src/LayoutQueryRenderer';
import LayoutHeading from '../src/LayoutHeading';
import Link from '../src/Link';

export default function ProductsPage(): React.Node {
  const CommonHeader = (
    <LayoutHeading
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
    />
  );

  return (
    <LayoutQueryRenderer
      variables={{}}
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
      onLoading={() => {
        return (
          <>
            {CommonHeader}
            <div className={styles('productsGrid')}>
              {rangeMap(12, (i) => (
                <Skeleton key={i} />
              ))}
            </div>
          </>
        );
      }}
      onResponse={({ searchAllProducts: products }) => {
        return (
          <>
            {CommonHeader}
            <div className={styles('productsGrid')}>
              {products.map((product) => (
                <Link key={product.id} href={`/products/edit/${product.key}`}>
                  <ProductCard
                    title={product.name}
                    priceUnitAmount={product.price.unitAmount / 100}
                    priceUnitAmountCurrency={product.price.unitAmountCurrency}
                    imgBlurhash={product.imageCover?.blurhash}
                    locale="en-US" // TODO
                    // TODO: `imgSrc`
                  />
                </Link>
              ))}
            </div>
          </>
        );
      }}
    />
  );
}

const styles = sx.create({
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '1rem',
  },
});
