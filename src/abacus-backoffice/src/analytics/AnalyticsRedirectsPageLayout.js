// @flow

import fbt from 'fbt';
import React, { type Node } from 'react';

import LayoutPage from '../LayoutPage';
import AnalyticsRedirectsPage from './AnalyticsRedirectsPage';

export default function AnalyticsRedirectsPageLayout(): Node {
  return (
    <LayoutPage
      isBeta={true}
      heading={<fbt desc="analytics redirects page heading">Analytics: redirects</fbt>}
    >
      <AnalyticsRedirectsPage />
    </LayoutPage>
  );
}
