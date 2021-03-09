// @flow

import * as React from 'react';
import { graphql } from '@adeira/relay';
import { useRouter } from 'next/router';

import EditProductForm from '../../../src/products/EditProductForm';
import EditProductHeading from '../../../src/products/EditProductHeading';
// eslint-disable-next-line camelcase
import LayoutQueryRenderer_DEPRECATED from '../../../src/LayoutQueryRenderer_DEPRECATED';

export default function ProductsEditPage(): React.Node {
  const router = useRouter();
  const { productKey } = router.query;

  if (!productKey) {
    // It will be an empty object during prerendering, see:
    // https://nextjs.org/docs/api-reference/next/router#router-object
    return null;
  }

  return (
    // eslint-disable-next-line react/jsx-pascal-case
    <LayoutQueryRenderer_DEPRECATED
      variables={{
        productKey: productKey,
        clientLocale: 'en_US', // TODO: customizable locale
      }}
      query={graphql`
        query ProductKeyGetQuery($clientLocale: SupportedLocale!, $productKey: ID!) {
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
      `}
      onResponse={({ commerce }) => (
        <>
          <EditProductHeading product={commerce.product} />
          <EditProductForm product={commerce.product} />
        </>
      )}
    />
  );
}
