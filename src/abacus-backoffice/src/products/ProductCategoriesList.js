// @flow

import { useLazyLoadQuery, graphql } from '@adeira/relay';
import React, { type Node } from 'react';
import { Entity, EntityField, LayoutBlock, Text } from '@adeira/sx-design';

import useApplicationLocale from '../useApplicationLocale';

export default function ProductCategoriesList(): Node {
  const applicationLocale = useApplicationLocale();
  // eslint-disable-next-line relay/generated-flow-types -- https://github.com/relayjs/eslint-plugin-relay/issues/131
  const data = useLazyLoadQuery(
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

  return (
    <LayoutBlock>
      {data.commerce.categories.reduce<Array<Node>>((acc, category) => {
        if (category) {
          acc.push(
            <Entity key={category.id}>
              <EntityField title={<Text transform="capitalize">{category.name}</Text>} />
            </Entity>,
          );
        }
        return acc;
      }, [])}
    </LayoutBlock>
  );
}
