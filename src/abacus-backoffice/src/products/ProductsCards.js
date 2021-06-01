// @flow

import { graphql, useLazyLoadQuery } from '@adeira/relay';
import sx from '@adeira/sx';
import { Note, ProductCard } from '@adeira/sx-design';
import { fbt } from 'fbt';
import React, { type Node } from 'react';

import Link from '../Link';
import useApplicationLocale from '../useApplicationLocale';
import type { ProductsCardsQuery } from './__generated__/ProductsCardsQuery.graphql';

export default function ProductsCards(): Node {
  const applicationLocale = useApplicationLocale();
  const data = useLazyLoadQuery<ProductsCardsQuery>(
    graphql`
      query ProductsCardsQuery($clientLocale: SupportedLocale!) {
        commerce {
          products: searchAllProducts(
            clientLocale: $clientLocale
            priceSortDirection: LOW_TO_HIGH
          ) {
            id
            key
            name
            imageCover {
              blurhash
              url
            }
            price {
              unitAmount
              unitAmountCurrency
            }
          }
        }
      }
    `,
    {
      clientLocale: applicationLocale.graphql,
    },
  );

  if (data.commerce.products.length === 0) {
    return (
      <Note tint="warning">
        <fbt desc="empty shop message">There are no products yet.</fbt>
      </Note>
    );
  }

  return (
    <div className={styles('productsGrid')}>
      {data.commerce.products.map((product) => {
        if (product == null) {
          return null; // TODO: 🤔
        }

        return (
          <Link key={product.id} href={`/products/edit/${product.key}`}>
            <ProductCard
              title={product.name}
              priceUnitAmount={product.price.unitAmount / 100}
              /* $FlowFixMe[incompatible-type]: This comment suppresses an error when upgrading to
               * Relay Hooks. To see the error delete this comment and run Flow. */
              priceUnitAmountCurrency={product.price.unitAmountCurrency}
              imgBlurhash={product.imageCover?.blurhash}
              imgSrc={product.imageCover?.url}
              imgAlt={product.name}
            />
          </Link>
        );
      }) ?? null}
    </div>
  );
}

const styles = sx.create({
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '1rem',
  },
});
