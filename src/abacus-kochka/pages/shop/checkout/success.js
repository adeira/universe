// @flow

import { Note } from '@adeira/sx-design';
import fbt from 'fbt';
import React, { type Node } from 'react';

import Layout from '../../../src/Layout';

export default function ShopCheckoutSuccessPage(): Node {
  // TODO: this page should probably not be accessible directly

  return (
    <Layout
      title={<fbt desc="successful checkout page title">Order success 👍</fbt>}
      subtitle={<fbt desc="successful checkout page description">Thank you so much!</fbt>}
    >
      <Note tint="success" notePrefix={<fbt desc="success note prefix">Success</fbt>}>
        <fbt desc="successful checkout message">
          Please, check your email for the confirmation. Will keep you updated on the progress via
          email. Feel free to get in touch with us in case of any troubles!
        </fbt>
      </Note>
    </Layout>
  );
}
