// @flow

import React, { type Element, type Node } from 'react';

import LayoutApp from '../src/LayoutApp';
import POSAllSessionsPageLayout from '../src/pos/POSAllSessionsPageLayout';

export default function POSPage(): Node {
  return <POSAllSessionsPageLayout />;
}

POSPage.getLayout = (page: Element<typeof POSPage>): Element<typeof LayoutApp> => (
  <LayoutApp>{page}</LayoutApp>
);
