// @flow

import * as React from 'react';

import Home from '../src/homepage/Home';
import Layout from '../src/Layout';

export default function Homepage(): React.Node {
  return (
    <Layout>
      <Home />
    </Layout>
  );
}
