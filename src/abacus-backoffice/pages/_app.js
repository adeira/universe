// @flow

import * as React from 'react';
import { createEnvironment, createNetworkFetcher, RelayEnvironmentProvider } from '@adeira/relay';
import { RecoilRoot } from 'recoil';
import { SxDesignProvider } from '@adeira/sx-design';
import { useEffect, useState } from 'react';
import { useSessionTokenAPI } from '@adeira/hooks';

import './_app.css';
import '../styles/globals.css';
import constants from '../src/constants';
import LoginPage from '../src/LoginPage';
import useApplicationLocale from '../src/useApplicationLocale';
import initTranslations from '../translations/init';

export default function MyApp({ Component, pageProps }: $FlowFixMe): React.Node {
  const getLayout = Component.getLayout || ((page) => page);

  const applicationLocale = useApplicationLocale();
  initTranslations(applicationLocale.bcp47);

  const [hasMounted, setHasMounted] = useState(false);
  const { sessionToken } = useSessionTokenAPI();

  useEffect(() => {
    // The session token API doesn't work server-side so we need to wait otherwise React would
    // render invalid tree, see: https://github.com/vercel/next.js/issues/7417
    setHasMounted(true);
  }, []);

  if (hasMounted === false) {
    return null;
  }

  let children;
  if (sessionToken == null) {
    children = <LoginPage />;
  } else {
    children = getLayout(<Component {...pageProps} />);
  }

  const relayEnvironment = createEnvironment({
    fetchFn: createNetworkFetcher(constants.graphqlServerURL, {
      ...(sessionToken != null && { Authorization: `Bearer ${sessionToken}` }),
    }),
  });

  return (
    <React.StrictMode>
      <SxDesignProvider locale={applicationLocale.bcp47} theme="system">
        <RelayEnvironmentProvider environment={relayEnvironment}>
          <RecoilRoot>{children}</RecoilRoot>
        </RelayEnvironmentProvider>
      </SxDesignProvider>
    </React.StrictMode>
  );
}
