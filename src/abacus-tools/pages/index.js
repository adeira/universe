// @flow

import React, { type Node } from 'react';
import Head from 'next/head';

import Jumbo from '../src/components/Jumbo';

export default function IndexPage(): Node {
  return (
    <>
      <Head>
        <title>Abacus Tools</title>
      </Head>
      <Jumbo>¡Ahoj!</Jumbo>
    </>
  );
}
