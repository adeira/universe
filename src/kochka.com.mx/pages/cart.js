// @flow

import * as React from 'react';
import fbt from 'fbt';
import sx from '@adeira/sx';

import Link from '../src/Link';
import Layout from '../src/Layout';

export default function CartPage(): React.Node {
  return (
    <Layout
      title={<fbt desc="shop cart page title">Shop Cart</fbt>}
      subtitle={
        <fbt desc="shop cart page subtitle">
          Thank you so much for shopping with us! Let&apos;s finish the order…
        </fbt>
      }
    >
      <div className={styles('body')}>
        <fbt desc="empty shop cart">
          There is nothing in the cart yet. Add something in <Link href="/shop">our shop</Link>.
        </fbt>
      </div>
    </Layout>
  );
}

const styles = sx.create({
  body: {
    textAlign: 'center',
  },
});
