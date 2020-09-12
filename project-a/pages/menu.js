// @flow

import * as React from 'react';
import Head from 'next/head';
import fbt from 'fbt';

import Subpage from '../src/Subpage';

export default function MenuPage(): React.Node {
  return (
    <>
      <Head>
        <title>
          {/* TODO: translations, reuse main title */}
          KOCHKA café · Menu
        </title>
      </Head>

      <Subpage heading={<fbt desc="Manu page heading">Menu</fbt>}>
        <div>TODO</div>
      </Subpage>
    </>
  );
}
