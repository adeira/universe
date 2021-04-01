// @flow

import { fbt } from 'fbt';
import React, { type Node } from 'react';
import { graphql, useLazyLoadQuery } from '@adeira/relay';

import LayoutPage from '../LayoutPage';
import LayoutHeadingLink from '../LayoutHeadingLink';
import useApplicationLocale from '../useApplicationLocale';
import ProductCreateForm from './ProductCreateForm';

export default function ProductsCreateLayout(): Node {
  const applicationLocale = useApplicationLocale();

  // eslint-disable-next-line relay/generated-flow-types -- https://github.com/relayjs/eslint-plugin-relay/issues/131
  const data = useLazyLoadQuery(
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
