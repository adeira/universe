// @flow

import * as React from 'react';
import App from 'next/app';
import fbt from 'fbt';
import Head from 'next/head';
import ReactDOM from 'react-dom';
import sx from '@adeira/sx';
import { RecoilRoot } from 'recoil';
import { SkipLink, SxDesignProvider } from '@adeira/sx-design';
import { useRouter } from 'next/router';

import './_app.css';
import Logo from '../src/Logo';
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

type Props = {
  +Component: any,
  +pageProps: any,
};

function MyApp({ Component, pageProps }: Props): React.Node {
  const router = useRouter();
  /* $FlowFixMe[prop-missing] This comment suppresses an error when migrating
   * to adeira/universe. To see the error delete this comment and run Flow. */
  const languageTag = initTranslations(router.locale);

  const isProduction = __DEV__ === false;
  if (isProduction) {
    // not public yet
    return (
      <div className={styles('root', 'rootSoon')}>
        <div className={styles('rootSoonOverlay')}>
          <Logo />
          <div className={styles('form')}>
            <em>
              <fbt desc="coming soon">coming soon</fbt>
            </em>
          </div>
        </div>
      </div>
    );
  }

  return (
    <SxDesignProvider locale={languageTag.bcp47} theme="light">
      <ViewerContextProvider languageTag={languageTag}>
        <RecoilRoot>
          <div className={styles('root')}>
            <Head>
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <SkipLink
              text={
                <fbt desc="hidden 'skip link' title which helps blind people to skip directly the main section and avoid the repetitive menu altogether">
                  Skip to content
                </fbt>
              }
            />
            <Component {...pageProps} />
          </div>
        </RecoilRoot>
      </ViewerContextProvider>
    </SxDesignProvider>
  );
}

const styles = sx.create({
  root: {
    color: 'rgba(var(--font-color-light))',
  },
  rootSoon: {
    backgroundImage: 'url(/coffee-background.jpg)',
    backgroundSize: 'cover',
  },
  rootSoonOverlay: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: 50,
    backgroundColor: 'rgba(var(--main-bg-color), 0.9)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 50,
  },
  formText: {
    maxWidth: 470,
    marginBottom: 20,
    fontStyle: 'italic',
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
