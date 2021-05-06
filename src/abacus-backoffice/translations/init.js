// @flow

import { IntlVariations, init as fbtInit } from 'fbt';

export default function initTranslations(applicationLocale: 'en-US' | 'es-MX'): void {
  const supportedLocales = {
    'en-US': require('./out/en-US.json'),
    'es-MX': require('./out/es-MX.json'),
  };

  fbtInit({
    translations: supportedLocales[applicationLocale],
    hooks: {
      getViewerContext: () => ({
        GENDER: IntlVariations.GENDER_UNKNOWN,
        locale: applicationLocale,
      }),
    },
  });
}
