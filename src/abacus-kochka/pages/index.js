// @flow

import * as React from 'react';
import { NextSeo } from 'next-seo';

import Homepage from '../src/Homepage';

export default function IndexPage(): React.Node {
  return (
    <>
      <NextSeo
        title="KOCHKA Café"
        description="The newest and biggest cat café in Mexico City - with actually good coffee. 😻🤤🚀"
      />

      <Homepage />
    </>
  );
}
