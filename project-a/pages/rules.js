// @flow

import * as React from 'react';
import fbt from 'fbt';
import Head from 'next/head';

import Rules from '../src/Rules';
import Layout from '../src/Layout';

export default function RulesPage(): React.Node {
  return (
    <>
      <Head>
        <title>
          {/* TODO: translations, reuse main title */}
          KOCHKA café · Our rules
        </title>
      </Head>

      <Layout
        title={<fbt desc="our rules page title">Our rules</fbt>}
        subtitle={<fbt desc="our rules page subtitle">How to be friends with our cats</fbt>}
      >
        <Rules />
      </Layout>
    </>
  );
}
