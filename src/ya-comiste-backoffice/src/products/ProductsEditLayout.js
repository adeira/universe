// @flow

import { graphql, useLazyLoadQuery } from '@adeira/relay';
import React, { type Node } from 'react';

import EditProductForm from './EditProductForm';
import EditProductHeading from './EditProductHeading';
import type { ProductsEditLayoutQuery } from './__generated__/ProductsEditLayoutQuery.graphql';

type Props = {
  +productKey: string,
};

export default function ProductsEditLayout(props: Props): Node {
  const data = useLazyLoadQuery<ProductsEditLayoutQuery>(
    graphql`
      query ProductsEditLayoutQuery($clientLocale: SupportedLocale!, $productKey: ID!) {
        commerce {
          product: getUnpublishedProductByKey(
            clientLocale: $clientLocale
            productKey: $productKey
          ) {
            ...EditProductHeading
            ...EditProductFormFragment
          }
        }
      }
    `,
    {
      productKey: props.productKey,
      clientLocale: 'en_US', // TODO: customizable locale
    },
  );

  return (
    <>
      <EditProductHeading product={data.commerce.product} />
      <EditProductForm product={data.commerce.product} />
    </>
  );
}
