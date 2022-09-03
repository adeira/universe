// @flow

import React, { type Element, type Node } from 'react';

import AnalyticsLayout from '../../src/analytics/AnalyticsLayout';
import AnalyticsRedirectsPageLayout from '../../src/analytics/AnalyticsRedirectsPageLayout';

export default function AnalyticsRedirectsPage(): Node {
  return <AnalyticsRedirectsPageLayout />;
}

AnalyticsRedirectsPage.getLayout = (
  page: Element<typeof AnalyticsRedirectsPage>,
): Element<typeof AnalyticsLayout> => <AnalyticsLayout>{page}</AnalyticsLayout>;
