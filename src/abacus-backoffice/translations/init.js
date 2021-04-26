// @flow

import { IntlVariations, init as fbtInit } from 'fbt';

export default function initTranslations(locale: 'en-us' | 'es-mx'): void {
  const supportedLocales = {
    'en-us': require('./out/en-US.json'),
    'es-mx': require('./out/es-MX.json'),
  };

  fbtInit({
    translations: supportedLocales[locale],
    hooks: {
      getViewerContext: () => ({
        GENDER: IntlVariations.GENDER_UNKNOWN,
        locale,
      }),
    },
  });
}
