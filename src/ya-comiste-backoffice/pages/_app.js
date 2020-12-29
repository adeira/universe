// @flow

import * as React from 'react';

import '../styles/globals.css';

export default function MyApp({ Component, pageProps }: $FlowFixMe): React.Node {
  return <Component {...pageProps} />;
}
