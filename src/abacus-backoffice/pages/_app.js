// @flow

import { useEffect, useState } from 'react';
import * as React from 'react';
import { RecoilRoot } from 'recoil';
import sx from '@adeira/sx';
import { ErrorBoundary, SxDesignProvider } from '@adeira/sx-design';
import { createEnvironment, createNetworkFetcher, RelayEnvironmentProvider } from '@adeira/relay';

import './_app.css';
import '../styles/globals.css';
import { LoginButton } from '../src/AuthButtons';
import constants from '../src/constants';
import useApplicationLocale from '../src/useApplicationLocale';
import { useSessionTokenAPI } from '../src/useSessionTokenAPI';
import initTranslations from '../translations/init';

export default function MyApp({ Component, pageProps }: $FlowFixMe): React.Node {
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
    children = (
      <div className={styles('login')}>
        <LoginButton />
      </div>
    );
  } else {
    children = <Component {...pageProps} />;
  }

  const relayEnvironment = createEnvironment({
    fetchFn: createNetworkFetcher(constants.graphqlServerURL, {
      ...(sessionToken != null && { Authorization: `Bearer ${sessionToken}` }),
    }),
  });

  return (
    <SxDesignProvider locale={applicationLocale.bcp47} theme="system">
      <ErrorBoundary>
        <RelayEnvironmentProvider environment={relayEnvironment}>
          <RecoilRoot>{children}</RecoilRoot>
        </RelayEnvironmentProvider>
      </ErrorBoundary>
    </SxDesignProvider>
  );
}

const styles = sx.create({
  login: {
    display: 'grid',
    placeItems: 'center',
  },
});
