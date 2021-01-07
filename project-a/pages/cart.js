// @flow

import * as React from 'react';
import fbt from 'fbt';
import Head from 'next/head';

import Link from '../src/Link';
import Layout from '../src/Layout';

export default function CartPage(): React.Node {
  return (
    <>
      <Head>
        <title>
          {/* TODO: translations, reuse main title */}
          KOCHKA café · Shop Cart
        </title>
      </Head>

      <Layout
        title={<fbt desc="shop cart page title">Shop Cart</fbt>}
        subtitle={
          <fbt desc="shop cart page subtitle">
            Thank you so much for shopping with us! Let&apos;s finish the order…
          </fbt>
        }
      >
        <fbt desc="empty shop cart">
          There is nothing in the cart yet. Add something in <Link href="/shop">our shop</Link>.
        </fbt>
      </Layout>
    </>
  );
}
