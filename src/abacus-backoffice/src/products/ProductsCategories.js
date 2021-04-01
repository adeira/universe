// @flow

import { graphql, useLazyLoadQuery } from '@adeira/relay';
import { Tabs, Text, type TabsType } from '@adeira/sx-design';
import React, { type Node } from 'react';
import fbt from 'fbt';

import useApplicationLocale from '../useApplicationLocale';

type TabValue = string | null;
type Props = {
  +selectedCategory: TabValue,
  +setSelectedCategory: (string | null) => void,
};

export default function ProductsCategories(props: Props): Node {
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

  return (
    <Tabs
      selected={props.selectedCategory}
      /* $FlowFixMe[incompatible-type]: `Tabs` component can call `setSelected` callback with number
       * when there is a number in values (but in this case there is not). */
      setSelected={props.setSelectedCategory}
      tabs={[
        {
          title: <fbt desc="title of a button to filter products by all categories">All</fbt>,
          value: null,
        },
        ...data.commerce.productCategories.reduce<TabsType>((acc, category) => {
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
