// @flow

import * as React from 'react';
import { graphql, QueryRenderer } from '@adeira/relay';

import Layout from '../src/Layout';

export default function Home(): React.Node {
  return (
    <Layout>
      <QueryRenderer
        /* eslint-disable relay/unused-fields */
        query={graphql`
          query pagesQuery {
            whoami {
              id
              humanReadableType
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
