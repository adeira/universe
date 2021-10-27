// @flow

import * as React from 'react';
import fbt from 'fbt';
import Head from 'next/head';
import ReactDOM from 'react-dom';
import sx from '@adeira/sx';
import { RecoilRoot } from 'recoil';
import { SkipLink, SxDesignProvider, ErrorBoundary } from '@adeira/sx-design';
import { RelayEnvironmentProvider } from '@adeira/relay';
import { useRouter } from 'next/router';

import './_app.css';
import GlobalAnnouncement from '../src/GlobalAnnouncement';
import RelayEnvironment from '../src/RelayEnvironment';
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

  return (
    <SxDesignProvider locale={languageTag.bcp47} theme="light">
      <ErrorBoundary>
        <RelayEnvironmentProvider environment={RelayEnvironment}>
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
                <GlobalAnnouncement />
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
});
