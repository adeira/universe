// @flow

import * as React from 'react';
import fbt from 'fbt';

import Rules from '../src/Rules';
import Layout from '../src/Layout';

export default function RulesPage(): React.Node {
  return (
    <Layout
      title={<fbt desc="our rules page title">Café rules</fbt>}
      subtitle={<fbt desc="our rules page subtitle">How to be friends with our cats</fbt>}
    >
      <Rules />
    </Layout>
  );
}
