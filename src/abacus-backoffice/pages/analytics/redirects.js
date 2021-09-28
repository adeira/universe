// @flow

import React, { type Element, type Node } from 'react';

import AnalyticsRedirectsPageLayout from '../../src/analytics/AnalyticsRedirectsPageLayout';
import LayoutApp from '../../src/LayoutApp';

export default function AnalyticsRedirectsPage(): Node {
  return <AnalyticsRedirectsPageLayout />;
}

AnalyticsRedirectsPage.getLayout = (
  page: Element<typeof AnalyticsRedirectsPage>,
): Element<typeof LayoutApp> => <LayoutApp>{page}</LayoutApp>;
