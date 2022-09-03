// @flow

import React, { type Element, type Node } from 'react';

import AnalyticsLayout from '../../src/analytics/AnalyticsLayout';
import AnalyticsMostLeastSoldProductsPageLayout from '../../src/analytics/AnalyticsMostLeastSoldProductsPageLayout';

export default function AnalyticsMostSoldProductsPage(): Node {
  return <AnalyticsMostLeastSoldProductsPageLayout />;
}

AnalyticsMostSoldProductsPage.getLayout = (
  page: Element<typeof AnalyticsMostSoldProductsPage>,
): Element<typeof AnalyticsLayout> => <AnalyticsLayout>{page}</AnalyticsLayout>;
