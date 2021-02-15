// @flow strict

import * as React from 'react';

type Props = {|
  +priceUnitAmount: number,
  +priceUnitAmountCurrency: 'MXN', // TODO: expand as needed
  +locale: 'en-US', // TODO: expand as needed
|};

export default function Money(props: Props): React.Node {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat
  return new Intl.NumberFormat(props.locale, {
    style: 'currency',
    currency: props.priceUnitAmountCurrency,
  }).format(props.priceUnitAmount);
}
