// @flow

import { useEffect, useState } from 'react';
import * as React from 'react';
import { RecoilRoot } from 'recoil';
import sx from '@adeira/sx';
import { ErrorBoundary, LayoutBlock, SxDesignProvider, Text } from '@adeira/sx-design';
import { createEnvironment, createNetworkFetcher, RelayEnvironmentProvider } from '@adeira/relay';

import './_app.css';
import '../styles/globals.css';
import { LoginButton } from '../src/AuthButtons';
import constants from '../src/constants';
import useApplicationLocale from '../src/useApplicationLocale';
import { useSessionTokenAPI } from '../src/useSessionTokenAPI';
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
    children = (
      <div className={styles('loginWrapper')}>
        <LayoutBlock>
          <Text as="h1" size={48} weight={900}>
            Abacus
          </Text>
          <LoginButton />
        </LayoutBlock>
      </div>
    );
  } else {
    children = getLayout(<Component {...pageProps} />);
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
  loginWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    right: 0,
    width: '100%',
    height: '100vh',
    background:
      'linear-gradient(45deg, rgba(var(--sx-success), 0.8), rgba(var(--sx-error), 0.8), rgba(var(--sx-warning), 0.8))',
  },
});
