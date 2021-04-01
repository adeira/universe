// @flow

import { graphql, useLazyLoadQuery } from '@adeira/relay';
import { Note } from '@adeira/sx-design';
import { fbt } from 'fbt';
import React, { type Node } from 'react';

import useApplicationLocale from '../useApplicationLocale';
import ProductsCards from './ProductsCards';

type Props = {
  +selectedCategory: string | null,
};

export default function ProductsCardsInCategory(props: Props): Node {
  const applicationLocale = useApplicationLocale();
  // eslint-disable-next-line relay/generated-flow-types -- https://github.com/relayjs/eslint-plugin-relay/issues/131
  const data = useLazyLoadQuery(
    graphql`
      query ProductsCardsInCategoryQuery(
        $clientLocale: SupportedLocale!
        $priceSortDirection: PriceSortDirection!
        $categories: [ID!]
      ) {
        commerce {
          products: searchAllProducts(
            clientLocale: $clientLocale
            priceSortDirection: $priceSortDirection
            categories: $categories
          ) {
            ...ProductsCardsData
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

  if (data.commerce.products.length === 0) {
    return (
      <Note tint="warning">
        <fbt desc="empty shop message">There are no products yet.</fbt>
      </Note>
    );
  }

  // $FlowFixMe[incompatible-type]: https://github.com/facebook/relay/issues/2545
  return <ProductsCards dataProducts={data.commerce.products} />;
}
