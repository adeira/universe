// @flow

import fbt from 'fbt';
import * as React from 'react';

import LayoutPage from '../LayoutPage';
import CatsPage from './CatsPage';

export default function CatsPageLayout(): React.Node {
  return (
    <LayoutPage
      isBeta={true}
      heading={<fbt desc="list of all our cats title">List of all our cats</fbt>}
    >
      <CatsPage />
    </LayoutPage>
  );
}
