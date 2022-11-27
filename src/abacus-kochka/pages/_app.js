// @flow

import * as React from 'react';
import * as Sentry from '@sentry/nextjs';
import fbt from 'fbt';
import Head from 'next/head';
import sx from '@adeira/sx';
import { DefaultSeo } from 'next-seo';
import { RecoilRoot } from 'recoil';
import { RelayEnvironmentProvider, RelayRehydratePreloadedQueries } from '@adeira/relay';
import { SkipLink, SxDesignProvider } from '@adeira/sx-design';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import './_app.css';
import recordPageVisit from '../src/analytics/recordPageVisit';
import RelayEnvironment from '../src/RelayEnvironment';
import ViewerContextProvider from '../src/ViewerContextProvider';
import initFbtTranslations from '../translations/initFbtTranslations';

type Props = {
  +Component: $FlowFixMe,
  +pageProps: $FlowFixMe,
};

export default function MyApp({ Component, pageProps }: Props): React.Node {
  const router = useRouter();
  const languageTag = initFbtTranslations(router.locale);

  useEffect(() => {
    recordPageVisit(RelayEnvironment);
    const handleRouteChange = () => {
      recordPageVisit(RelayEnvironment);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      // If the component is unmounted, unsubscribe from the event with the `off` method:
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <React.StrictMode>
      <DefaultSeo
        defaultTitle="KOCHKA Café"
        description={
          <fbt desc="page description">
            The newest and biggest cat café in Mexico City - with actually good coffee. 😻🤤🚀
          </fbt>
        }
        titleTemplate="%s · KOCHKA Café"
      />
      <SxDesignProvider
        locale={languageTag.bcp47}
        theme="light"
        onErrorBoundaryCatch={(error, errorInfo) => {
          Sentry.captureException(error, { extra: { errorInfo } });
        }}
      >
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
                <RelayRehydratePreloadedQueries Component={Component} pageProps={pageProps} />
              </div>
            </RecoilRoot>
          </ViewerContextProvider>
        </RelayEnvironmentProvider>
      </SxDesignProvider>
    </React.StrictMode>
  );
}

const styles = sx.create({
  root: {
    color: 'rgba(var(--sx-background))',
  },
});
