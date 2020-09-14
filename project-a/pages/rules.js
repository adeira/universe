// @flow

import * as React from 'react';
import fbt from 'fbt';
import Head from 'next/head';

import Rules from '../src/Rules';
import Subpage from '../src/Subpage';

export default function RulesPage(): React.Node {
  return (
    <>
      <Head>
        <title>
          {/* TODO: translations, reuse main title */}
          KOCHKA café · Our rules
        </title>
      </Head>

      <Subpage title={<fbt desc="our rules page title">Our rules</fbt>}>
        <Rules />
      </Subpage>
    </>
  );
}
