// @flow

import { Note } from '@adeira/sx-design';
import * as React from 'react';
import fbt from 'fbt';

import Layout from '../../src/Layout';

export default function LegalPrivacy(): React.Node {
  return (
    <Layout
      title={<fbt desc="privacy policy page title">Privacy Policy</fbt>}
      subtitle={<fbt desc="privacy policy page subtitle">How we handle your data</fbt>}
    >
      <Note tint="warning" notePrefix={<fbt desc="warning note prefix">Warning</fbt>}>
        <fbt desc="stay tuned note">this page is not finished yet, stay tuned</fbt>
      </Note>
    </Layout>
  );
}
