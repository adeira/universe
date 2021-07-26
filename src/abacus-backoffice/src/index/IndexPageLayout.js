// @flow

import { Heading } from '@adeira/sx-design';
import fbt from 'fbt';
import * as React from 'react';

import Layout from '../Layout';
import LayoutHeading from '../LayoutHeading';
import IndexPage from './IndexPage';

export default function IndexPageLayout(): React.Node {
  return (
    <Layout>
      <LayoutHeading
        heading={
          <Heading>
            <fbt desc="quick analytics (stats) on the Abacus homepage">Quick analytics</fbt>
          </Heading>
        }
        description={<fbt desc="have a great day message">Have a great day!</fbt>}
      />

      <IndexPage />
    </Layout>
  );
}
