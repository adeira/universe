// @flow

import React, { type Element, type Node } from 'react';

import LayoutApp from '../src/LayoutApp';
import LedgerPageLayout from '../src/ledger/LedgerPageLayout';

export default function LedgerPage(): Node {
  return <LedgerPageLayout />;
}

LedgerPage.getLayout = (page: Element<typeof LedgerPage>): Element<typeof LayoutApp> => (
  <LayoutApp>{page}</LayoutApp>
);
