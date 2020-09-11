// @flow

import * as React from 'react';
import ReactDOM from 'react-dom';
import fbt, { IntlVariations, init } from 'fbt';
import * as sx from '@adeira/sx';
import { useRouter } from 'next/router';

import './_app.css';
import SkipLink from '../src/design/SkipLink';

type SupportedLocales = 'en_US' | 'es_MX';
function initTranslations(locale: SupportedLocales) {
  init({
    translations: require('../translatedFbts.json'),
    // $FlowIssue[cannot-resolve-module] https://github.com/facebook/flow/issues/7673
    fbtEnumManifest: require('../.enum_manifest.json'),
    hooks: {
      getViewerContext: () => ({
        GENDER: IntlVariations.GENDER_UNKNOWN,
        locale,
      }),
    },
  });
}

if (
  __DEV__ &&
  typeof window !== 'undefined' // process.browser should work as well (https://github.com/vercel/next.js/issues/2473#issuecomment-362119102)
) {
  // eslint-disable-next-line import/no-extraneous-dependencies
  const axe = require('react-axe');
  axe(React, ReactDOM, 1000);
}

type Props = {|
  +Component: any,
  +pageProps: any,
|};

export default function MyApp({ Component, pageProps }: Props): React.Node {
  const router = useRouter();
  // TODO: useLocalStorage()
  // TODO: fix this
  const lang = router.query.lang; // TODO: wrap it and properly validate it!

  initTranslations(lang === 'en' ? 'en_US' : 'es_MX'); // TODO: DRY (URL => FBT)

  const [locale] = React.useState<SupportedLocales>(
    lang === 'en' ? 'en_US' : 'es_MX', // TODO: DRY (URL => FBT)
  );

  if (!__DEV__) {
    // not public yet
    return (
      <div className={styles('root', 'soon')}>
        <fbt desc="soon">soon</fbt>
      </div>
    );
  }

  return (
    <div key={locale} className={styles('root')}>
      <SkipLink />
      <Component {...pageProps} />
    </div>
  );
}

const styles = sx.create({
  root: {
    backgroundColor: 'var(--main-bg-color)',
    color: 'var(--font-color)',
  },
  soon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
});
