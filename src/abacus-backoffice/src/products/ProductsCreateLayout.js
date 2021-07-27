// @flow

import { fbt } from 'fbt';
import React, { type Node } from 'react';
import { graphql, useLazyLoadQuery } from '@adeira/relay';

import LayoutPage from '../LayoutPage';
import LayoutHeadingLink from '../LayoutHeadingLink';
import useApplicationLocale from '../useApplicationLocale';
import ProductCreateForm from './ProductCreateForm';
import type { ProductsCreateLayoutQuery } from './__generated__/ProductsCreateLayoutQuery.graphql';

export default function ProductsCreateLayout(): Node {
  const applicationLocale = useApplicationLocale();

  const data = useLazyLoadQuery<ProductsCreateLayoutQuery>(
    graphql`
      query ProductsCreateLayoutQuery($clientLocale: SupportedLocale!) {
        commerce {
          ...ProductCreateFormData
        }
      }
    `,
    {
      clientLocale: applicationLocale.graphql,
    },
  );

  return (
    <LayoutPage
      heading={<fbt desc="create a new product page heading">Create a new product</fbt>}
      actionButtons={
        <LayoutHeadingLink href="/products">
          <fbt desc="go back to products navigation button">Products inventory</fbt>
        </LayoutHeadingLink>
      }
    >
      <ProductCreateForm commerceData={data.commerce} />
    </LayoutPage>
  );
}
