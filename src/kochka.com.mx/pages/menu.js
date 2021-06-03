// @flow

import * as React from 'react';
import fbt from 'fbt';

import Layout from '../src/Layout';
import Menu from '../src/Menu';

export default function MenuPage(): React.Node {
  return (
    <Layout
      title={<fbt desc="menu page title">Café menu</fbt>}
      subtitle={<fbt desc="menu page subtitle">What do we offer</fbt>}
    >
      <Menu />
    </Layout>
  );
}
