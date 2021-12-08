// @flow

import React, { type Element, type Node } from 'react';

import CatsPageLayout from '../src/cats/CatsPageLayout';
import LayoutApp from '../src/LayoutApp';

export default function CatsPage(): Node {
  return <CatsPageLayout />;
}

CatsPage.getLayout = (page: Element<typeof CatsPage>): Element<typeof LayoutApp> => (
  <LayoutApp>{page}</LayoutApp>
);
