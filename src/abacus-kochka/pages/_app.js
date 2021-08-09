// @flow

import * as React from 'react';
import fbt from 'fbt';
import Head from 'next/head';
import ReactDOM from 'react-dom';
import sx from '@adeira/sx';
import { RecoilRoot } from 'recoil';
import { SkipLink, SxDesignProvider, ErrorBoundary } from '@adeira/sx-design';
import { createEnvironment, createNetworkFetcher, RelayEnvironmentProvider } from '@adeira/relay';
import { useRouter } from 'next/router';

import './_app.css';
import Logo from '../src/Logo';
import ViewerContextProvider from '../src/ViewerContextProvider';
import initFbtTranslations from '../translations/initFbtTranslations';

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

export default function MyApp({ Component, pageProps }: Props): React.Node {
  const router = useRouter();
  const languageTag = initFbtTranslations(router.locale);

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

  const Environment = createEnvironment({
    fetchFn: createNetworkFetcher(
      'http://localhost:5000/graphql', // TODO: HTTPS, better "abacus" domain
    ),
  });

  return (
    <SxDesignProvider locale={languageTag.bcp47} theme="light">
      <ErrorBoundary>
        <RelayEnvironmentProvider environment={Environment}>
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
        </RelayEnvironmentProvider>
      </ErrorBoundary>
    </SxDesignProvider>
  );
}

const styles = sx.create({
  root: {
    color: 'rgba(var(--sx-background))',
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
    marginBlockStart: 50,
  },
  formText: {
    maxWidth: 470,
    marginBlockEnd: 20,
    fontStyle: 'italic',
  },
});
