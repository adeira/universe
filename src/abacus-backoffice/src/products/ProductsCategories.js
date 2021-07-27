// @flow

import { graphql, useLazyLoadQuery } from '@adeira/relay';
import { Tabs, Text } from '@adeira/sx-design';
import React, { type Node } from 'react';
import fbt from 'fbt';

import useApplicationLocale from '../useApplicationLocale';
import type { ProductsCategoriesQuery } from './__generated__/ProductsCategoriesQuery.graphql';

type Props = {
  +selectedCategory: string | null,
  +setSelectedCategory: (string | null) => void,
};

export default function ProductsCategories(props: Props): Node {
  const applicationLocale = useApplicationLocale();
  const data = useLazyLoadQuery<ProductsCategoriesQuery>(
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

  return (
    <Tabs
      // $FlowFixMe[incompatible-type]: https://github.com/adeira/universe/pull/2804
      selected={props.selectedCategory}
      setSelected={props.setSelectedCategory}
      tabs={[
        {
          title: <fbt desc="title of a button to filter products by all categories">All</fbt>,
          // $FlowFixMe[incompatible-type]: https://github.com/adeira/universe/pull/2804
          value: null,
        },
        ...data.commerce.productCategories.reduce((acc, category) => {
          if (category != null) {
            acc.push({
              title: <Text transform="capitalize">{category.name}</Text>,
              value: category.id,
            });
          }
          return acc;
        }, []),
      ]}
    />
  );
}
