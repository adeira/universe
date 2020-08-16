// @flow

import React, { useState } from 'react';
import fbt, { IntlVariations, init } from 'fbt';

import './_app.css';

type SupportedLocales = 'en_US' | 'es_LA';
function initTranslations(locale: SupportedLocales) {
  init({
    translations: require('../translatedFbts.json'),
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

export default function App({ Component, pageProps }) {
  const [locale, setLocale] = useState<SupportedLocales>('en_US');

  const handleLanguageSwitch = (locale) => {
    // alternatively, register the translations lazily via `FbtTranslations.registerTranslations`
    initTranslations(locale);
    setLocale(locale);
  };

  const locales: {| +[SupportedLocales]: string |} = {
    en_US: <fbt desc="en_US locale name">English</fbt>,
    es_LA: <fbt desc="es_LA locale name">Spanish</fbt>,
  };

  const nextLocale: SupportedLocales = locale === 'en_US' ? 'es_LA' : 'en_US';

  return (
    <React.Fragment key={locale}>
      <div>
        <button type="button" onClick={() => handleLanguageSwitch(nextLocale)}>
          <fbt desc="the main language toggle">
            Switch to <FbtParam name="language name">{locales[nextLocale]}</FbtParam>
          </fbt>
        </button>
      </div>
      <Component {...pageProps} />
    </React.Fragment>
  );
}
