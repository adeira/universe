// @flow

import fbt from 'fbt';
import * as React from 'react';

import LayoutPage from '../LayoutPage';
import IndexPage from './IndexPage';

export default function IndexPageLayout(): React.Node {
  return (
    <LayoutPage
      isBeta={true}
      heading={<fbt desc="quick analytics (stats) on the Abacus homepage">Quick analytics</fbt>}
      description={
        <fbt desc="quick analytics description message">
          Hi! Here you can see a quick overview of the most important metrics for our business.
        </fbt>
      }
    >
      <IndexPage />
    </LayoutPage>
  );
}
