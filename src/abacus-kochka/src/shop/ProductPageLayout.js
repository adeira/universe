// @flow

import fbt from 'fbt';
import React, { type Node } from 'react';

import Layout from '../Layout';
import ProductPageLayoutContent from './ProductPageLayoutContent';

type Props = {
  +productKey: string,
};

export default function ProductPageLayout(props: Props): Node {
  return (
    <Layout
      withFullWidth={true}
      title={<fbt desc="shop page title">Online shop</fbt>}
      subtitle={
        <fbt desc="shop page subtitle">Support our cats by buying some of our products</fbt>
      }
    >
      <ProductPageLayoutContent productKey={props.productKey} />
    </Layout>
  );
}
