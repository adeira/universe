// @flow

import { Note } from '@adeira/sx-design';
import * as React from 'react';
import fbt from 'fbt';

import Layout from '../../src/Layout';

export default function LegalTerms(): React.Node {
  return (
    <Layout title={<fbt desc="terms of use page title">Terms of use</fbt>}>
      <Note tint="warning">
        <fbt desc="stay tuned note">this page is not finished yet, stay tuned</fbt>
      </Note>
    </Layout>
  );
}
