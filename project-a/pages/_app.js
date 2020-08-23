// @flow

import * as React from 'react';
import ReactDOM from 'react-dom';
import fbt, { IntlVariations, init } from 'fbt';
import * as sx from '@adeira/sx';

import './_app.css';
import Navigation from '../src/Navigation';

type SupportedLocales = 'en_US' | 'es_LA';
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

initTranslations('en_US');

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

export default function App({ Component, pageProps }: Props): React.Node {
  const [locale, setLocale] = React.useState<SupportedLocales>('en_US');

  const handleLanguageSwitch = (locale) => {
    // alternatively, register the translations lazily via `FbtTranslations.registerTranslations`
    initTranslations(locale);
    setLocale(locale);
  };

  const locales: {| +[SupportedLocales]: React.Node |} = {
    en_US: <fbt desc="en_US locale name">English</fbt>,
    es_LA: <fbt desc="es_LA locale name">Spanish</fbt>,
  };

  const nextLocale: SupportedLocales = locale === 'en_US' ? 'es_LA' : 'en_US';

  if (!__DEV__) {
    // not public yet
    return <div>TKTK</div>;
  }

  return (
    <div key={locale} className={styles('root')}>
      <Navigation />
      <Component {...pageProps} />
      <div className={styles('footer')}>
        <button type="button" onClick={() => handleLanguageSwitch(nextLocale)}>
          {locales[nextLocale]}
        </button>
      </div>
    </div>
  );
}

const styles = sx.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    color: 'var(--font-color)',
    backgroundColor: 'var(--main-bg-color)',
  },
  footer: {
    margin: 10,
  },
});
