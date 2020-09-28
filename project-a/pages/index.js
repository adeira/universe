// @flow

import * as React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Index(): React.Node {
  const router = useRouter();

  // TODO: also validate subpages that we are not accessing something like `kk.com.mx/xx/rules`
  React.useEffect(() => {
    const initialLocale = 'es'; // TODO: detect what users actually want
    router.replace('/[lang]', `/${initialLocale}`);
  });

  return (
    <Head>
      <meta name="robots" content="noindex, nofollow" />
    </Head>
  );
}
