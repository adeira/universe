// @flow

import * as React from 'react';
import fbt from 'fbt';
import sx from '@adeira/sx';
import { graphql } from '@adeira/relay';
import { rangeMap } from '@adeira/js';
import { Skeleton, ProductCard, Heading } from '@adeira/sx-design';

// eslint-disable-next-line camelcase
import LayoutQueryRenderer_DEPRECATED from '../src/LayoutQueryRenderer_DEPRECATED';
import LayoutHeading from '../src/LayoutHeading';
import LayoutHeadingLink from '../src/LayoutHeadingLink';
import Link from '../src/Link';

export default function ProductsPage(): React.Node {
  const CommonHeader = (
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
  );

  return (
    // eslint-disable-next-line react/jsx-pascal-case
    <LayoutQueryRenderer_DEPRECATED
      variables={{}}
      query={graphql`
        query productsQuery {
          commerce {
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
      onResponse={({ commerce: { searchAllProducts: products } }) => {
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
