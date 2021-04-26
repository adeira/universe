// @flow

import React, { type Node } from 'react';

import POSCheckoutFailurePageLayout from '../../../src/pos/POSCheckoutFailurePageLayout';

export default function POSCheckoutFailurePage(): Node {
  // TODO: make sure that this page is not directly accessible without going through the checkout first

  return <POSCheckoutFailurePageLayout />;
}
