// @flow

import sx from '@adeira/sx';
import { fbt } from 'fbt';
import React, { type Node } from 'react';
import { graphql, useLazyLoadQuery } from '@adeira/relay';
import { Note, ProductCard } from '@adeira/sx-design';

import refineSupportedCurrencies from '../refineSupportedCurrencies';
import useApplicationLocale from '../useApplicationLocale';
import useSelectedItemsApi from './recoil/selectedItemsState';
import type { ProductsGridPosQuery } from './__generated__/ProductsGridPosQuery.graphql';

type Props = {
  +selectedCategory: string | null,
};

export default function ProductsGrid(props: Props): Node {
  const applicationLocale = useApplicationLocale();
  const { select } = useSelectedItemsApi();
  const data = useLazyLoadQuery<ProductsGridPosQuery>(
    graphql`
      query ProductsGridPosQuery(
        $clientLocale: SupportedLocale!
        $priceSortDirection: PriceSortDirection!
        $categories: [ID!]
      ) {
        commerce {
          products: searchAllPublishedProducts(
            clientLocale: $clientLocale
            priceSortDirection: $priceSortDirection
            categories: $categories
            visibility: POS
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
      priceSortDirection: 'LOW_TO_HIGH', // TODO (?)
      categories:
        props.selectedCategory != null
          ? [props.selectedCategory] // we currently support only one category on FE but server supports any number of categories
          : undefined,
    },
    {
      fetchPolicy: 'store-and-network', // always lazily fetch newest products
    },
  );

  const handleItemClick = (productID, product) => {
    select({
      itemID: productID,
      itemTitle: product.name,
      itemUnitAmount: product.price.unitAmount,
      units: 1,
    });
  };

  if (data.commerce.products.length === 0) {
    return (
      <Note tint="warning">
        <fbt desc="empty shop (POS) message">There are no products yet.</fbt>
      </Note>
    );
  }

  return data.commerce.products.map((product) => {
    if (product == null) {
      return null; // TODO: 🤔
    }

    return (
      <button
        type="button"
        key={product.id}
        className={styles('productButton')}
        onClick={() => handleItemClick(product.key, product)}
      >
        <ProductCard
          title={product.name}
          priceUnitAmount={
            product.price.unitAmount / 100 // adjusted for centavo
          }
          priceUnitAmountCurrency={refineSupportedCurrencies(product.price.unitAmountCurrency)}
          imgBlurhash={product.imageCover?.blurhash}
          imgSrc={product.imageCover?.url}
          imgAlt={product.name}
        />
      </button>
    );
  });
}

const styles = sx.create({
  productButton: {
    margin: 0,
    padding: 0,
    textAlign: 'inherit',
    cursor: 'pointer',
    border: 'none',
  },
});
