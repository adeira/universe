// @flow

import { Note } from '@adeira/sx-design';
import * as React from 'react';
import fbt from 'fbt';

import Layout from '../../src/Layout';

export default function LegalShipping(): React.Node {
  return (
    <Layout title={<fbt desc="shipping and returns page title">Shipping & Returns</fbt>}>
      <Note tint="warning">
        <fbt desc="stay tuned note">this page is not finished yet, stay tuned</fbt>
      </Note>
    </Layout>
  );
}
