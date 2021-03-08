// @flow

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import * as React from 'react';
import { RecoilRoot } from 'recoil';
import sx from '@adeira/sx';
import { createEnvironment, createNetworkFetcher, RelayEnvironmentProvider } from '@adeira/relay';

import './_app.css';
import '../styles/globals.css';
import { LoginButton } from '../src/AuthButtons';
import constants from '../src/constants';
import ErrorBoundary from '../src/ErrorBoundary';
import { useSessionTokenAPI } from '../src/useSessionTokenAPI';
import initTranslations from '../translations/init';

export default function MyApp({ Component, pageProps }: $FlowFixMe): React.Node {
  const router = useRouter();
  // $FlowIssue[prop-missing] prop missing in flow-typed types
  initTranslations(router.locale);

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
      'X-Client': constants.graphqlClientName,
      ...(sessionToken != null && { Authorization: `Bearer ${sessionToken}` }),
    }),
  });

  return (
    <ErrorBoundary>
      <RelayEnvironmentProvider environment={relayEnvironment}>
        <RecoilRoot>{children}</RecoilRoot>
      </RelayEnvironmentProvider>
    </ErrorBoundary>
  );
}

const styles = sx.create({
  login: {
    display: 'grid',
    placeItems: 'center',
  },
});
