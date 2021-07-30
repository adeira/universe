// @flow

import fbt from 'fbt';
import * as React from 'react';

import LayoutPage from '../LayoutPage';

export default function LedgerPageLayout(): React.Node {
  return (
    <LayoutPage isBeta={true} heading={<fbt desc="ledger page title">Ledger</fbt>}>
      TODO
    </LayoutPage>
  );
}
