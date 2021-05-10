// @flow

import { graphql, useLazyLoadQuery } from '@adeira/relay';
import React, { type Node } from 'react';
import { Image } from '@adeira/sx-design';
import sx from '@adeira/sx';

import ProductEditForm from './ProductEditForm';
import ProductEditHeading from './ProductEditHeading';
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
            ...ProductEditHeading
            images {
              name
              blurhash
              url
            }
            ...ProductEditFormData
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
      <ProductEditHeading product={data.commerce.product} />
      <div className={styles('imagesWrapper')}>
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
      </div>
      <ProductEditForm product={data.commerce.product} />
    </>
  );
}

const styles = sx.create({
  imagesWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
});
