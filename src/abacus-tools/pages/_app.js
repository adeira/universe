// @flow

import * as React from 'react';

import './_app.css';

export default function MyApp({ Component, pageProps }: $FlowFixMe): React.Node {
  return <Component {...pageProps} />;
}
