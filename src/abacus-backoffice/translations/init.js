// @flow

import { IntlVariations, init as fbtInit } from 'fbt';

export default function initTranslations(nextjsLocale: 'en-us' | 'es-mx'): 'en-US' | 'es-MX' {
  // TODO: do this Next.js -> FBT conversion better once needed
  const locale = nextjsLocale === 'es-mx' ? 'es-MX' : 'en-US';

  const supportedLocales = {
    'en-US': require('./out/en-US.json'),
    'es-MX': require('./out/es-MX.json'),
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

  return locale;
}
