// @flow

import * as React from 'react';
import Head from 'next/head';

import Homepage from '../src/Homepage';

export default function IndexPage(): React.Node {
  return (
    <>
      <Head>
        <title>KOCHKA Café</title>
      </Head>

      <Homepage />
    </>
  );
}
