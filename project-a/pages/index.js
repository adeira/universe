// @flow

import * as React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import LanguageTag from '../src/LanguageTag';

export default function Index(): React.Node {
  const router = useRouter();

  // TODO: also validate subpages that we are not accessing something like `kk.com.mx/xx/rules`
  React.useEffect(() => {
    // TODO: detect what users actually want
    const initialLocale = LanguageTag.getDefaultLanguageTag().url;
    router.replace('/[lang]', `/${initialLocale}`);
  });

  return (
    <Head>
      <meta name="robots" content="noindex, nofollow" />
    </Head>
  );
}
