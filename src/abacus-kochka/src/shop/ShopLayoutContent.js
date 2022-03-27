// @flow

import * as React from 'react';
import { graphql, useLazyLoadQuery } from '@adeira/relay';
import { ProductCard, Note, LayoutGrid, SupportedCurrencies } from '@adeira/sx-design';
import { fbt } from 'fbt';
import { useRecoilValue } from 'recoil';

import LinkInternal from '../LinkInternal';
import useViewerContext from '../hooks/useViewerContext';
import filtersAtom from './recoil/filtersAtom';

export default function ShopLayoutContent(): React.Node {
  const viewerContext = useViewerContext();
  const filters = useRecoilValue(filtersAtom);

  const {
    commerce: { products },
    // eslint-disable-next-line relay/generated-flow-types -- https://github.com/relayjs/eslint-plugin-relay/issues/131
  } = useLazyLoadQuery(
    graphql`
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
    `,
    {
      clientLocale: viewerContext.languageTag.graphql,
      priceSortDirection: filters.relevance.price,
    },
    { fetchPolicy: 'store-and-network' },
  );

  if (products.length === 0) {
    return (
      <Note tint="warning" notePrefix={<fbt desc="warning note prefix">Warning</fbt>}>
        <fbt desc="empty shop message">There are no products yet.</fbt>
      </Note>
    );
  }

  return (
    <LayoutGrid minColumnWidth="200px">
      {products.map((product) => {
        if (product == null) {
          return null;
        }

        const unitAmountCurrency = SupportedCurrencies.cast(product.price.unitAmountCurrency);
        if (unitAmountCurrency == null) {
          return null;
        }

        return (
          <LinkInternal key={product.key} href={`/shop/${product.key}`}>
            <ProductCard
              priceUnitAmount={
                product.price.unitAmount / 100 // adjusted for centavo
              }
              priceUnitAmountCurrency={unitAmountCurrency}
              title={product.name}
              imgBlurhash={product.imageCover?.blurhash}
              imgSrc={product.imageCover?.url}
              imgAlt={product.name}
            />
          </LinkInternal>
        );
      })}
    </LayoutGrid>
  );
}
