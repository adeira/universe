// @flow

import sx from '@adeira/sx';
import { fbt } from 'fbt';
import React, { useState, type Node } from 'react';
import { graphql, useLazyLoadQuery, useQueryLoader } from '@adeira/relay';
import { LayoutGrid, Note, ProductCard } from '@adeira/sx-design';

import refineSupportedCurrencies from '../refineSupportedCurrencies';
import useApplicationLocale from '../useApplicationLocale';
import ProductsGridModal from './ProductsGridModal';
import useSelectedItemsApi from './recoil/selectedItemsState';
import ProductsGridModalBodyQuery from './__generated__/ProductsGridModalBodyQuery.graphql';

type Props = {
  +selectedCategory: string | null,
};

export default function ProductsGrid(props: Props): Node {
  const [addonsModal, setAddonsModal] = useState({
    isOpen: false,
    productKey: null,
  });
  const applicationLocale = useApplicationLocale();
  const { select } = useSelectedItemsApi();
  // eslint-disable-next-line relay/generated-flow-types -- https://github.com/relayjs/eslint-plugin-relay/issues/131
  const data = useLazyLoadQuery(
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
            hasSelectedAddons
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

  const [modalPreloadedQueryRef, preloadModalQuery] = useQueryLoader(
    ProductsGridModalBodyQuery,
    undefined,
  );

  const handleItemClick = (productKey: string, product) => {
    if (product.hasSelectedAddons === true) {
      preloadModalQuery(
        {
          clientLocale: applicationLocale.graphql,
          productKey: productKey,
        },
        { fetchPolicy: 'store-and-network' },
      );
      setAddonsModal({
        isOpen: true,
        productKey: productKey,
      });
    } else {
      select({
        itemID: productKey,
        itemTitle: product.name,
        itemUnitAmount: product.price.unitAmount,
        units: 1,
      });
    }
  };

  if (data.commerce.products.length === 0) {
    return (
      <Note tint="warning">
        <fbt desc="empty shop (POS) message">There are no products yet.</fbt>
      </Note>
    );
  }

  return (
    <>
      {modalPreloadedQueryRef != null && addonsModal.productKey != null ? (
        <ProductsGridModal
          isOpen={addonsModal.isOpen}
          onClose={() => setAddonsModal({ isOpen: false })}
          preloadedQueryRef={modalPreloadedQueryRef}
          productKey={addonsModal.productKey}
        />
      ) : null}

      <LayoutGrid>
        {data.commerce.products.map((product) => {
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
                priceUnitAmountCurrency={refineSupportedCurrencies(
                  product.price.unitAmountCurrency,
                )}
                imgBlurhash={product.imageCover?.blurhash}
                imgSrc={product.imageCover?.url}
                imgAlt={product.name}
              />
            </button>
          );
        })}
      </LayoutGrid>
    </>
  );
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
