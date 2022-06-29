// @flow

import * as React from 'react';
import type { Context } from 'next';

import ProductPageLayout from '../../src/shop/ProductPageLayout';

type Props = {
  +productKey: string,
};

export default function ShopProductPage(props: Props): React.Node {
  return <ProductPageLayout productKey={props.productKey} />;
}

export function getServerSideProps(context: Context): { +props: Props } {
  return {
    props: {
      productKey: context.query.product_key,
    },
  };
}
