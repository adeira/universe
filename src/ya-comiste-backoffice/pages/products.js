// @flow

import * as React from 'react';
import Link from 'next/link';

export default function ProductsPage(): React.Node {
  return (
    <div>
      <Link href="/products/create">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a>Create a new product</a>
      </Link>
      <hr />
      TODO (add/edit/delete product + prices, upload photos)
    </div>
  );
}
