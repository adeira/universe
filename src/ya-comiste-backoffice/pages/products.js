// @flow

import * as React from 'react';
import Link from 'next/link';
import fbt from 'fbt';

export default function ProductsPage(): React.Node {
  return (
    <div>
      <Link href="/products/create">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a>
          <fbt desc="link for create a new product">Create a new product</fbt>
        </a>
      </Link>
      <hr />
      TODO (add/edit/delete product + prices, upload photos)
    </div>
  );
}
