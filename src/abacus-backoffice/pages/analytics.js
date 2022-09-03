// @flow

import React, { type Element, type Node } from 'react';

import AnalyticsDailyReports from '../src/analytics/AnalyticsDailyReports';
import AnalyticsLayout from '../src/analytics/AnalyticsLayout';

export default function AnalyticsPage(): Node {
  return <AnalyticsDailyReports />;
}

AnalyticsPage.getLayout = (
  page: Element<typeof AnalyticsPage>,
): Element<typeof AnalyticsLayout> => <AnalyticsLayout>{page}</AnalyticsLayout>;
