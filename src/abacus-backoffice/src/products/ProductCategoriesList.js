// @flow

import { useLazyLoadQuery, graphql } from '@adeira/relay';
import React, { type Node } from 'react';
import { Entity, EntityField, Text } from '@adeira/sx-design';

import useApplicationLocale from '../useApplicationLocale';
import type { ProductCategoriesListQuery } from './__generated__/ProductCategoriesListQuery.graphql';

export default function ProductCategoriesList(): Node {
  const applicationLocale = useApplicationLocale();
  const data = useLazyLoadQuery<ProductCategoriesListQuery>(
    graphql`
      query ProductCategoriesListQuery($clientLocale: SupportedLocale!) {
        commerce {
          categories: searchAllProductCategories(clientLocale: $clientLocale) {
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

  return data.commerce.categories.reduce((acc, category) => {
    if (category) {
      acc.push(
        <Entity key={category.id}>
          <EntityField title={<Text transform="capitalize">{category.name}</Text>} />
        </Entity>,
      );
    }
    return acc;
  }, []);
}
