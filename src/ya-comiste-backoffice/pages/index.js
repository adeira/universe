// @flow

import * as React from 'react';
import { graphql } from '@adeira/relay';

import Layout from '../src/Layout';
import QueryRenderer from '../src/QueryRenderer';

export default function Home(): React.Node {
  return (
    <Layout>
      TODO (dashboard)
      <hr />
      <QueryRenderer
        /* eslint-disable relay/unused-fields */
        query={graphql`
          query pagesQuery {
            whoami {
              id
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
