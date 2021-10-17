// @flow

import { IntlVariations, init as fbtInit } from 'fbt';

import LanguageTag, { type LanguageTagType } from '../src/LanguageTag';

export default function initFbtTranslations(lang: ?string): LanguageTagType {
  const languageTag = LanguageTag.detectLanguageTag(lang);
  const locale = languageTag.bcp47;

  // TODO: support translations lazy loading
  const supportedLocales = {
    'en-US': require('./out/en_US.json'), // empty stub
    'es-MX': require('./out/es_MX.json'),
  };

  const translations = supportedLocales[locale];
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

  return languageTag;
}
