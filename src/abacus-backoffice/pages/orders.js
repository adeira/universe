// @flow

import React, { type Element, type Node } from 'react';

import LayoutApp from '../src/LayoutApp';
import OrdersPageLayout from '../src/orders/OrdersPageLayout';

export default function OrdersPage(): Node {
  return <OrdersPageLayout />;
}

OrdersPage.getLayout = (page: Element<typeof OrdersPage>): Element<typeof LayoutApp> => (
  <LayoutApp>{page}</LayoutApp>
);
