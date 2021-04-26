// @flow

import { Heading } from '@adeira/sx-design';
import fbt from 'fbt';
import * as React from 'react';

import Layout from '../Layout';
import LayoutHeading from '../LayoutHeading';

export default function LedgerPageLayout(): React.Node {
  return (
    <Layout>
      <LayoutHeading
        heading={
          <Heading>
            <fbt desc="ledger page title">Ledger</fbt>
          </Heading>
        }
      />

      <pre>TODO</pre>
    </Layout>
  );
}
