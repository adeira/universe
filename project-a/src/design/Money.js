// @flow strict

import * as React from 'react';

import useViewerContext from '../hooks/useViewerContext';

type Props = {|
  +amount: number,
|};

export default function Money(props: Props): React.Node {
  const viewerContext = useViewerContext();

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat
  return new Intl.NumberFormat(viewerContext.languageTag.bcp47, {
    style: 'currency',
    currency: 'MXN', // prices are currently always in Mexican Pesos
  }).format(props.amount);
}
