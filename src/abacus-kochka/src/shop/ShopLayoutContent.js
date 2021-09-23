// @flow

import { rangeMap } from '@adeira/js';
import * as React from 'react';
import { graphql, QueryRenderer } from '@adeira/relay';
import { ProductCard, Skeleton, Note, Button, LayoutGrid } from '@adeira/sx-design';
import { fbt } from 'fbt';
import { useRecoilValue } from 'recoil';

import LinkInternal from '../LinkInternal';
import useViewerContext from '../hooks/useViewerContext';
import filtersAtom from './recoil/filtersAtom';

export default function ShopLayoutContent(): React.Node {
  const viewerContext = useViewerContext();
  const filters = useRecoilValue(filtersAtom);

  return (
    <QueryRenderer
      query={graphql`
        query ShopLayoutContentQuery(
          $clientLocale: SupportedLocale!
          $priceSortDirection: PriceSortDirection!
        ) {
          commerce {
            products: searchAllPublishedProducts(
              clientLocale: $clientLocale
              priceSortDirection: $priceSortDirection
              visibility: ESHOP
            ) {
              key
              name
              price {
                unitAmount
                unitAmountCurrency
              }
              imageCover {
                blurhash
                url
              }
            }
          }
        }
      `}
      variables={{
        clientLocale: viewerContext.languageTag.graphql,
        priceSortDirection: filters.relevance.price,
      }}
      fetchPolicy="store-and-network"
      onLoading={() => {
        // Loading screen (first Skeleton, then Blurhash, then the actual image):
        return (
          <LayoutGrid minColumnWidth="300px">
            {rangeMap(12, (i) => (
              <Skeleton key={i} />
            ))}
          </LayoutGrid>
        );
      }}
      onSystemError={({ retry }) => {
        return (
          <Note
            tint="error"
            action={
              retry != null ? (
                <Button onClick={retry}>
                  <fbt desc="retry button title">retry</fbt>
                </Button>
              ) : null
            }
          >
            <fbt desc="unable to load eshop products note">unable to load eshop products</fbt>
          </Note>
        );
      }}
      onResponse={({ commerce: { products } }) => {
        if (products.length === 0) {
          return (
            <Note tint="warning">
              <fbt desc="empty shop message">There are no products yet.</fbt>
            </Note>
          );
        }

        return (
          <LayoutGrid minColumnWidth="300px">
            {products.map((product) => {
              return (
                <LinkInternal key={product.key} href={`/shop/${product.key}`}>
                  <ProductCard
                    priceUnitAmount={
                      product.price.unitAmount / 100 // adjusted for centavo
                    }
                    priceUnitAmountCurrency={product.price.unitAmountCurrency}
                    title={product.name}
                    imgBlurhash={product.imageCover.blurhash}
                    imgSrc={product.imageCover.url}
                    imgAlt={product.name}
                  />
                </LinkInternal>
              );
            })}
          </LayoutGrid>
        );
      }}
    />
  );
}
