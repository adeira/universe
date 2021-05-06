// @flow

import { graphql, useLazyLoadQuery } from '@adeira/relay';
import React, { type Node } from 'react';
import { Image } from '@adeira/sx-design';

import EditProductForm from './EditProductForm';
import EditProductHeading from './EditProductHeading';
import useApplicationLocale from '../useApplicationLocale';
import type { ProductsEditLayoutQuery } from './__generated__/ProductsEditLayoutQuery.graphql';

type Props = {
  +productKey: string,
};

export default function ProductsEditLayout(props: Props): Node {
  const applicationLocale = useApplicationLocale();
  const data = useLazyLoadQuery<ProductsEditLayoutQuery>(
    graphql`
      query ProductsEditLayoutQuery($clientLocale: SupportedLocale!, $productKey: ID!) {
        commerce {
          product: getUnpublishedProductByKey(
            clientLocale: $clientLocale
            productKey: $productKey
          ) {
            ...EditProductHeading
            images {
              name
              blurhash
              url
            }
            ...EditProductFormFragment
          }
        }
      }
    `,
    {
      productKey: props.productKey,
      clientLocale: applicationLocale.graphql,
    },
  );

  return (
    <>
      <EditProductHeading product={data.commerce.product} />
      {data.commerce.product.images.map((image) => {
        return (
          <Image
            key={image.name} // TODO: expose ID from BE
            src={image.url}
            blurhash={image.blurhash}
            width={250}
            height={250}
          />
        );
      })}
      <EditProductForm product={data.commerce.product} />
    </>
  );
}
