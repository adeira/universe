// @flow

import * as React from 'react';
import { fbt } from 'fbt';
import { QueryRenderer, graphql } from '@adeira/relay';
import { Heading } from '@adeira/sx-design';
import { useRouter } from 'next/router';

import Layout from '../../../src/Layout';
import EditProductForm from '../../../src/products/EditProductForm';

export default function ProductsEditPage(): React.Node {
  const router = useRouter();
  const { productKey } = router.query;

  if (!productKey) {
    // It will be an empty object during prerendering, see:
    // https://nextjs.org/docs/api-reference/next/router#router-object
    return null;
  }

  return (
    <Layout
      heading={<Heading>Edit product {productKey}</Heading>}
      links={[
        {
          href: '/products',
          title: <fbt desc="go back to products navigation button">Products inventory</fbt>,
        },
        {
          href: '#TODO',
          title: <fbt desc="delete product navigation button">Delete product (TODO)</fbt>,
          // TODO: withConfirmation=true
          titleStyle: {
            color: 'darkred',
          },
        },
      ]}
    >
      <QueryRenderer
        variables={{
          productId: productKey,
          clientLocale: 'en_US', // TODO: customizable locale
        }}
        query={graphql`
          query ProductKeyQuery($clientLocale: SupportedLocale!, $productId: ID!) {
            product: getProduct(clientLocale: $clientLocale, productId: $productId) {
              ...EditProductFormFragment
            }
          }
        `}
        onResponse={(relayProps) => <EditProductForm product={relayProps.product} />}
      />
    </Layout>
  );
}
