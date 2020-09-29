// @flow strict

import * as React from 'react';

type Props = {|
  +amount: number,
|};

export default function Money(props: Props): React.Node {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat
  // TODO: create an application context and change the price locale accordingly (same with _app)
  return new Intl.NumberFormat(
    'es-MX', // en-US
    {
      style: 'currency',
      currency: 'MXN',
    },
  ).format(props.amount);
}
