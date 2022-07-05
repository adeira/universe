// @flow

import { graphql, useFragment } from '@adeira/relay';
import fbt from 'fbt';
import React, { type Node } from 'react';

import Layout from '../Layout';
import ProductPageLayoutContent from './ProductPageLayoutContent';
import type { ProductPageLayoutFragment$key } from './__generated__/ProductPageLayoutFragment.graphql';

type Props = {
  +relayFragmentRef: ProductPageLayoutFragment$key,
};

export const ProductPageLayoutQuery = graphql`
  query ProductPageLayoutQuery($clientLocale: SupportedLocale!, $productKey: ID!) {
    ...ProductPageLayoutFragment
  }
`;

export default function ProductPageLayout(props: Props): Node {
  const data = useFragment(
    graphql`
      fragment ProductPageLayoutFragment on Query {
        commerce {
          ...ProductPageLayoutContentFragment
        }
      }
    `,
    props.relayFragmentRef,
  );

  return (
    <Layout
      withFullWidth={true}
      title={<fbt desc="shop page title">Online shop</fbt>}
      subtitle={
        <fbt desc="shop page subtitle">Support our cats by buying some of our products</fbt>
      }
    >
      <ProductPageLayoutContent relayFragmentRef={data.commerce} />
    </Layout>
  );
}
