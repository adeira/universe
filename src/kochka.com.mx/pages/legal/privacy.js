// @flow

import * as React from 'react';
import fbt from 'fbt';

import Layout from '../../src/Layout';

export default function LegalPrivacy(): React.Node {
  return (
    <Layout
      title={<fbt desc="privacy policy page title">Privacy Policy</fbt>}
      subtitle={<fbt desc="privacy policy page subtitle">How we handle your data</fbt>}
    >
      {/* TODO */}
      TODO
    </Layout>
  );
}
