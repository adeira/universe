// @flow

import { rangeMap } from '@adeira/js';
import { graphql, useLazyLoadQuery } from '@adeira/relay';
import { Tabs, Text, LayoutGrid, Skeleton, LayoutBlock } from '@adeira/sx-design';
import React, { type Node, useState } from 'react';

import useApplicationLocale from '../useApplicationLocale';
import ProductsCardsInCategory from './ProductsCardsInCategory';

/**
 * This component first loads all available categories to render them and then it loads all products
 * for the first category (or for the selected category).
 */
export default function ProductsCategories(): Node {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const applicationLocale = useApplicationLocale();
  // eslint-disable-next-line relay/generated-flow-types -- https://github.com/relayjs/eslint-plugin-relay/issues/131
  const data = useLazyLoadQuery(
    graphql`
      query ProductsCategoriesQuery($clientLocale: SupportedLocale!) {
        commerce {
          productCategories: searchAllProductCategories(clientLocale: $clientLocale) {
            id
            name
          }
        }
      }
    `,
    {
      clientLocale: applicationLocale.graphql,
    },
  );

  const firstProductCategory = data.commerce.productCategories[0]?.id ?? null;

  return (
    <LayoutBlock>
      <Tabs
        selected={selectedCategory ?? firstProductCategory}
        setSelected={setSelectedCategory}
        tabs={data.commerce.productCategories.reduce((acc, category) => {
          if (category != null) {
            acc.push({
              title: <Text transform="capitalize">{category.name}</Text>,
              value: category.id,
            });
          }
          return acc;
        }, [])}
      />

      <React.Suspense
        fallback={
          <LayoutGrid>
            {rangeMap(12, (i) => (
              <Skeleton key={i} />
            ))}
          </LayoutGrid>
        }
      >
        <ProductsCardsInCategory selectedCategory={selectedCategory ?? firstProductCategory} />
      </React.Suspense>
    </LayoutBlock>
  );
}
