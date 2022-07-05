// @flow

import * as React from 'react';
import { createEnvironment, createNetworkFetcher, RelayEnvironmentProvider } from '@adeira/relay';
import { RecoilRoot } from 'recoil';
import { RecoilURLSyncJSON } from 'recoil-sync';
import { SxDesignProvider } from '@adeira/sx-design';
import { useEffect, useState } from 'react';
import { useSessionTokenAPI } from '@adeira/hooks';
import { DefaultSeo } from 'next-seo';

import './_app.css';
import constants from '../src/constants';
import LoginPage from '../src/LoginPage';
import useApplicationLocale from '../src/useApplicationLocale';
import initTranslations from '../translations/init';

export default function MyApp({ Component, pageProps }: $FlowFixMe): React.Node {
  const getLayout = Component.getLayout ?? ((page) => page);

  const applicationLocale = useApplicationLocale();
  initTranslations(applicationLocale.bcp47);

  const [hasMounted, setHasMounted] = useState(false);
  const { sessionToken } = useSessionTokenAPI();

  useEffect(() => {
    // The session token API doesn't work server-side so we need to wait otherwise React would
    // render invalid tree, see: https://github.com/vercel/next.js/issues/7417
    setHasMounted(true);
  }, []);

  const relayEnvironment = React.useMemo(() => {
    return createEnvironment({
      fetchFn: createNetworkFetcher(constants.graphqlServerURL, {
        ...(sessionToken != null && { Authorization: `Bearer ${sessionToken}` }),
      }),
    });
  }, [sessionToken]);

  if (hasMounted === false) {
    // We do not render the admin on server because `sessionToken` token is not available there.
    return null;
  }

  return (
    <>
      <DefaultSeo defaultTitle="Abacus" titleTemplate="%s · Abacus" />
      <SxDesignProvider locale={applicationLocale.bcp47} theme="system">
        <RelayEnvironmentProvider environment={relayEnvironment}>
          <RecoilRoot>
            <RecoilURLSyncJSON storeKey="json-url" location={{ part: 'queryParams' }}>
              {sessionToken == null ? <LoginPage /> : getLayout(<Component {...pageProps} />)}
            </RecoilURLSyncJSON>
          </RecoilRoot>
        </RelayEnvironmentProvider>
      </SxDesignProvider>
    </>
  );
}
