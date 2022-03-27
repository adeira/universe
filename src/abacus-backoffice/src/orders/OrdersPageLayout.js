// @flow

import { Badge, LayoutBlock, Money, Note, Table, SupportedCurrencies } from '@adeira/sx-design';
import fbt from 'fbt';
import React, { type Node } from 'react';

import LayoutPage from '../LayoutPage';

export default function OrdersPageLayout(): Node {
  const columns = React.useMemo(
    () => [
      {
        Header: <fbt desc="status column title in the orders table">Status</fbt>,
        accessor: 'col1',
      },
      {
        Header: <fbt desc="order date column title in the orders table">Order date</fbt>,
        accessor: 'col2',
      },
      {
        Header: <fbt desc="customer name column title in the orders table">Customer</fbt>,
        accessor: 'col3',
      },
      {
        Header: <fbt desc="total amount column title in the orders table">Total</fbt>,
        accessor: 'col4',
      },
    ],
    [],
  );

  const data = React.useMemo(
    () => [
      {
        col1: (
          <strong>
            <Badge tint="warning">
              <fbt desc="paid status of an order">paid</fbt>
            </Badge>
          </strong>
        ),
        col2: 'TODO',
        col3: 'John Doe',
        col4: <Money priceUnitAmount={100} priceUnitAmountCurrency={SupportedCurrencies.MXN} />,
      },
      {
        col1: (
          <Badge tint="default">
            <fbt desc="awaiting payment status of an order">awaiting payment</fbt>
          </Badge>
        ),
        col2: 'TODO',
        col3: 'John Doe',
        col4: <Money priceUnitAmount={100} priceUnitAmountCurrency={SupportedCurrencies.MXN} />,
      },
      {
        col1: (
          <Badge tint="success">
            <fbt desc="completed status of an order">completed</fbt>
          </Badge>
        ),
        col2: 'TODO',
        col3: 'John Doe',
        col4: <Money priceUnitAmount={100} priceUnitAmountCurrency={SupportedCurrencies.MXN} />,
      },
    ],
    [],
  );

  // TODO: number of orders waiting to be fulfilled (fetch from API)
  const paidOrders = 1;

  return (
    <LayoutPage isBeta={true} heading={<fbt desc="eshop orders page title">Eshop orders</fbt>}>
      <LayoutBlock>
        <Note tint="success" notePrefix={<fbt desc="success note prefix">Success</fbt>}>
          <fbt desc="success message displayed when there are no new orders waiting">
            Every order was fulfilled, good job!
          </fbt>
        </Note>
        <Note tint="warning" notePrefix={<fbt desc="warning note prefix">Warning</fbt>}>
          <fbt desc="warning message displayed when there are new orders waiting">
            There{' '}
            <fbt:plural count={paidOrders} showCount="no" many="are">
              is
            </fbt:plural>{' '}
            <fbt:param name="count">
              <strong>{paidOrders}</strong>
            </fbt:param>{' '}
            <fbt:plural count={paidOrders} showCount="no" many="orders">
              order
            </fbt:plural>{' '}
            which has to be fulfilled. Don&apos;t let the customer waiting!
          </fbt>
        </Note>
        <Table columns={columns} data={data} />
      </LayoutBlock>
    </LayoutPage>
  );
}
