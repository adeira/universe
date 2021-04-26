// @flow

import React, { type Node } from 'react';

import POSCheckoutSuccessPageLayout from '../../../src/pos/POSCheckoutSuccessPageLayout';

export default function POSCheckoutSuccessPage(): Node {
  // TODO: make sure that this page is not directly accessible without going through the checkout first

  return <POSCheckoutSuccessPageLayout />;
}
