// @flow

import * as React from 'react';
import { RecoilRoot } from 'recoil';

import '../styles/globals.css';
import initTranslations from '../translations/init';

export default function MyApp({ Component, pageProps }: $FlowFixMe): React.Node {
  initTranslations();

  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}
