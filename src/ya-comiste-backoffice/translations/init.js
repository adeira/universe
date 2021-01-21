// @flow

import { IntlVariations, init as fbtInit } from 'fbt';

export default function initTranslations(): void {
  fbtInit({
    translations: require('./out/es_MX.json'), // TODO
    hooks: {
      getViewerContext: () => ({
        GENDER: IntlVariations.GENDER_UNKNOWN,
        locale: 'es_MX',
      }),
    },
  });
}
