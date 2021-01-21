// @flow

import * as React from 'react';
import fbt from 'fbt';

import Layout from '../src/Layout';
import Link from '../src/Link';

export default function POSPage(): React.Node {
  return (
    <Layout>
      <Link href="/pos/session">
        <fbt desc="start new POS session button title">Start a new POS session</fbt>
      </Link>

      <hr />

      <div>TODO (start/close POS sessions)</div>
    </Layout>
  );
}
