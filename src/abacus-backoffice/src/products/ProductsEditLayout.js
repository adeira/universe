// @flow

import { graphql, useLazyLoadQuery } from '@adeira/relay';
import React, { type Node, useState } from 'react';
import { Image, ButtonLink } from '@adeira/sx-design';
import fbt from 'fbt';
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
  const [imagesToDelete, setImagesToDelete] = useState([]);

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

  const handleImageDelete = (imageName) => {
    setImagesToDelete((prev) => [...prev, imageName]);
  };

  const handleUndoImageDelete = (imageName) => {
    setImagesToDelete((prev) => prev.filter((prevImageName) => prevImageName !== imageName));
  };

  return (
    <ProductEditHeading product={data.commerce.product}>
      <div className={styles('imagesWrapper')}>
        {data.commerce.product.images.map((image) => {
          return (
            <div
              key={image.name} // TODO: expose ID from BE
            >
              <div
                className={styles({
                  imageWrapperDelete: imagesToDelete.includes(image.name) === true,
                })}
              >
                <Image src={image.url} alt={image.name} blurhash={image.blurhash} />
              </div>
              {imagesToDelete.includes(image.name) === false ? (
                <div>
                  {image.name}{' '}
                  <ButtonLink
                    onClick={() => handleImageDelete(image.name)}
                    xstyle={styles.linkDelete}
                  >
                    <fbt desc="delete image button title">delete</fbt>
                  </ButtonLink>
                </div>
              ) : (
                <div>
                  <s>{image.name}</s>{' '}
                  <ButtonLink
                    onClick={() => handleUndoImageDelete(image.name)}
                    xstyle={styles.linkDelete}
                  >
                    <fbt desc="undo delete image button title">undo delete</fbt>
                  </ButtonLink>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <ProductEditForm product={data.commerce.product} imagesToDelete={imagesToDelete} />
    </ProductEditHeading>
  );
}

const styles = sx.create({
  imagesWrapper: {
    display: 'grid',
    gap: '1rem',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    marginBlockEnd: '2rem',
  },
  imageWrapperDelete: {
    filter: 'grayscale(1)',
  },
  linkDelete: {
    color: 'red',
  },
});
