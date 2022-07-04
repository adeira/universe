// @flow

import { NextSeo } from 'next-seo';
import * as React from 'react';

import POSCheckoutPageLayout from '../../src/pos/POSCheckoutPageLayout';

export default function POSCheckoutPage(): React.Node {
  return (
    <>
      <NextSeo title="POS" />
      <POSCheckoutPageLayout />
    </>
  );
}

// TODO: use special empty Layout here (including NextSeo)
