// @flow

import { IntlVariations, init as fbtInit } from 'fbt';

export default function initTranslations(applicationLocale: 'en-US' | 'es-MX'): void {
  const supportedLocales = {
    'en-US': require('./out/en_US.json'),
    'es-MX': require('./out/es_MX.json'),
  };

  const translations = supportedLocales[applicationLocale];
  const translationsLocale = Object.keys(translations)[0];

  fbtInit({
    translations,
    hooks: {
      getViewerContext: () => ({
        GENDER: IntlVariations.GENDER_UNKNOWN,
        locale: translationsLocale,
      }),
    },
  });
}
