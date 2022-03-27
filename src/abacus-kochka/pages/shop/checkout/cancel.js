// @flow

import { Note } from '@adeira/sx-design';
import fbt from 'fbt';
import React, { type Node } from 'react';

import Layout from '../../../src/Layout';

export default function ShopCheckoutCancelPage(): Node {
  // TODO: this page should probably not be accessible directly

  return (
    <Layout title={<fbt desc="canceled checkout page title">Order canceled</fbt>}>
      <Note tint="warning" notePrefix={<fbt desc="warning note prefix">Warning</fbt>}>
        <fbt desc="canceled checkout message">
          Your order has been canceled and no money was charged. We are sorry to see you go. Feel
          free to get in touch with us and tell us what can we improve!
        </fbt>
      </Note>
    </Layout>
  );
}
