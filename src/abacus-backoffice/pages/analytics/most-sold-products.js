// @flow

import React, { type Element, type Node } from 'react';

import AnalyticsMostSoldProductsPageLayout from '../../src/analytics/AnalyticsMostSoldProductsPageLayout';
import LayoutApp from '../../src/LayoutApp';

export default function AnalyticsMostSoldProductsPage(): Node {
  return <AnalyticsMostSoldProductsPageLayout />;
}

AnalyticsMostSoldProductsPage.getLayout = (
  page: Element<typeof AnalyticsMostSoldProductsPage>,
): Element<typeof LayoutApp> => <LayoutApp>{page}</LayoutApp>;
