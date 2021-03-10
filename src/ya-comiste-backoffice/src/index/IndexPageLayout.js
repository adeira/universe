// @flow

import * as React from 'react';

import Layout from '../Layout';
import IndexPage from './IndexPage';

export default function IndexPageLayout(): React.Node {
  return (
    <Layout>
      <IndexPage />
    </Layout>
  );
}
