// @flow

import { usePreloadedQuery, type PreloadedQuery } from '@adeira/relay';
import * as React from 'react';
import type { Context } from 'next';

import LanguageTag from '../../src/LanguageTag';
import relayPreloadQuery from '../../src/relayPreloadQuery';
import ProductPageLayout, { ProductPageLayoutQuery } from '../../src/shop/ProductPageLayout';
import type { ProductPageLayoutQuery as ProductPageLayoutQueryType } from '../../src/shop/__generated__/ProductPageLayoutQuery.graphql';

type Props = {
  +relayPreloadedQueryRefs: {
    +productPageLayoutQuery: PreloadedQuery<ProductPageLayoutQueryType>,
  },
};

export default function ShopProductPage(props: Props): React.Node {
  const data = usePreloadedQuery(
    ProductPageLayoutQuery,
    props.relayPreloadedQueryRefs.productPageLayoutQuery,
  );
  return <ProductPageLayout relayFragmentRef={data} />;
}

export async function getServerSideProps({ locale, params }: Context): Promise<$FlowFixMe> {
  return {
    props: {
      relayPreloadedQueries: {
        productPageLayoutQuery: await relayPreloadQuery<ProductPageLayoutQueryType>(
          ProductPageLayoutQuery,
          {
            clientLocale: LanguageTag.detectLanguageTag(locale).graphql,
            productKey: params.product_key,
          },
        ),
      },
    },
  };
}
