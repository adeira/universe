// @flow

import { IntlVariations, init as fbtInit } from 'fbt';

import LanguageTag, { type LanguageTagType } from '../src/LanguageTag';

export default function initFbtTranslations(lang: ?string): LanguageTagType {
  const languageTag = LanguageTag.detectLanguageTag(lang);
  const locale = languageTag.bcp47;

  // TODO: support translations lazy loading
  const supportedLocales = {
    'en-US': require('./out/en-US.json'), // empty stub
    'es-MX': require('./out/es-MX.json'),
  };

  fbtInit({
    translations: supportedLocales[locale],
    hooks: {
      getViewerContext: () => ({
        GENDER: IntlVariations.GENDER_UNKNOWN,
        locale: locale,
      }),
    },
  });

  return languageTag;
}
