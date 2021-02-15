// @flow

import { graphql, QueryRenderer } from '@adeira/relay';
import * as React from 'react';
import fbt from 'fbt';

import Layout from '../src/Layout';
import Link from '../src/Link';

export default function ProductsPage(): React.Node {
  return (
    <Layout>
      <Link href="/products/create">
        <fbt desc="link for create a new product">Create a new product</fbt>
      </Link>

      <hr />

      <div>TODO (add/edit/delete product + prices, upload photos)</div>

      {/* TODO: search even inactive products in BO! */}
      <QueryRenderer
        /* eslint-disable relay/unused-fields */
        query={graphql`
          query productsQuery {
            searchAllProducts(clientLocale: en_US, priceSortDirection: LOW_TO_HIGH) {
              id
              name
              description
              images
              unitLabel
              price {
                unitAmount
                unitAmountCurrency
              }
            }
          }
        `}
        /* eslint-enable relay/unused-fields */
        onResponse={(relayProps) => {
          return <pre>{JSON.stringify(relayProps, null, 2)}</pre>;
        }}
      />
    </Layout>
  );
}
