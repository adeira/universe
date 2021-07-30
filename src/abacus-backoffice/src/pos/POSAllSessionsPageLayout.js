// @flow

import React, { type Node } from 'react';
import fbt from 'fbt';

import LayoutPage from '../LayoutPage';
import Link from '../Link';

export default function POSAllSessionsPageLayout(): Node {
  return (
    <LayoutPage isBeta={true} heading={<fbt desc="ledger page title">All POS Sessions</fbt>}>
      <Link href="/pos/session" target="_blank">
        <fbt desc="navigation link to point of sales">Open POS session</fbt>
      </Link>
    </LayoutPage>
  );
}
