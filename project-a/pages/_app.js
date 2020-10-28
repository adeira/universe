// @flow

import * as React from 'react';
import ReactDOM from 'react-dom';
import fbt from 'fbt';
import * as sx from '@adeira/sx';
import { useRouter } from 'next/router';
import Head from 'next/head';
import App from 'next/app';

import './_app.css';
import Logo from '../src/Logo';
import SkipLink from '../src/design/SkipLink';
import ViewerContextProvider from '../src/ViewerContextProvider';
import initTranslations from '../translations/init';

if (
  __DEV__ &&
  typeof window !== 'undefined' // process.browser should work as well (https://github.com/vercel/next.js/issues/2473#issuecomment-362119102)
) {
  // eslint-disable-next-line import/no-extraneous-dependencies
  const axe = require('@axe-core/react');
  axe(React, ReactDOM, 1000);
}

type Props = {|
  +Component: any,
  +pageProps: any,
|};

function MyApp({ Component, pageProps }: Props): React.Node {
  const router = useRouter();
  const languageTag = initTranslations(router.locale);

  if (!__DEV__) {
    // not public yet
    return (
      <div className={styles('root', 'soon')}>
        <Logo />
        <em>
          <fbt desc="coming soon">coming soon</fbt>
        </em>
      </div>
    );
  }

  return (
    <ViewerContextProvider languageTag={languageTag}>
      <div className={styles('root')}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <SkipLink />
        <Component {...pageProps} />
      </div>
    </ViewerContextProvider>
  );
}

const styles = sx.create({
  root: {
    color: 'var(--font-color-light)',
  },
  soon: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: 'var(--main-bg-color)',
  },
});

// This disables the ability to perform automatic static optimization, causing every page in
// the app to be server-side rendered (needed for the translations to be properly loaded).
//
MyApp.getInitialProps = async (appContext: $FlowFixMe): $FlowFixMe => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default MyApp;
