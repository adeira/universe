// @flow

import React, { type Element, type Node } from 'react';

import IndexPageLayout from '../src/index/IndexPageLayout';
import LayoutApp from '../src/LayoutApp';

export default function IndexPage(): Node {
  return <IndexPageLayout />;
}

IndexPage.getLayout = (page: Element<typeof IndexPage>): Element<typeof LayoutApp> => (
  <LayoutApp>{page}</LayoutApp>
);
