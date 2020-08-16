// @flow

import * as React from 'react';
import fbt, { IntlVariations, init } from 'fbt';

import './_app.css';

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
    return null;
  }

  return (
    <React.Fragment key={locale}>
      <div>
        <button type="button" onClick={() => handleLanguageSwitch(nextLocale)}>
          <fbt desc="the main language toggle">
            Switch to <fbt:param name="language name">{locales[nextLocale]}</fbt:param>
          </fbt>
        </button>
      </div>
      <Component {...pageProps} />
    </React.Fragment>
  );
}
