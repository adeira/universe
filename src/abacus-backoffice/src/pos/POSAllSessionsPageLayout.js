// @flow

import React, { type Node } from 'react';
import { Heading, Note } from '@adeira/sx-design';
import fbt from 'fbt';

import Layout from '../Layout';
import LayoutHeading from '../LayoutHeading';
import Link from '../Link';

export default function POSAllSessionsPageLayout(): Node {
  return (
    <Layout>
      <LayoutHeading
        heading={
          <Heading>
            <fbt desc="ledger page title">All POS Sessions</fbt>
          </Heading>
        }
      />

      <Note tint="warning">work in progress</Note>

      <p>
        <Link href="/pos/session" target="_blank">
          <fbt desc="navigation link to point of sales">Open POS session</fbt>
        </Link>
      </p>
    </Layout>
  );
}
