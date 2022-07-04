// @flow

import { NextSeo } from 'next-seo';
import * as React from 'react';

import POSActiveSessionPageLayout from '../../src/pos/POSActiveSessionPageLayout';

export default function POSSessionPage(): React.Node {
  return (
    <>
      <NextSeo title="POS" />
      <POSActiveSessionPageLayout />
    </>
  );
}

// TODO: use special empty Layout here (including NextSeo)
