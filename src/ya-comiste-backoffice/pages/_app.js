// @flow

import * as React from 'react';

import '../styles/globals.css';
import initTranslations from '../translations/init';

export default function MyApp({ Component, pageProps }: $FlowFixMe): React.Node {
  initTranslations();

  return <Component {...pageProps} />;
}
