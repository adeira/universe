// @flow

import { IntlVariations, init as fbtInit } from 'fbt';
import { warning } from '@adeira/js';

import LanguageTag, { type LanguageTagType } from '../src/LanguageTag';

// {locale: {hash: translation}}
type TranslationDict = {
  [locale: string]: {
    [hashKey: string]: string,
  },
};

export default function initTranslations(lang: ?string): LanguageTagType {
  const languageTag = LanguageTag.detectLanguageTag(lang);
  const locale = languageTag.bcp47;

  let translations: TranslationDict = { 'en-US': {} };
  try {
    // Beware! Make sure this is secure when changing these lines.
    translations = require(`../translations/out/${locale}.json`);
  } catch {
    warning(
      locale === 'en-US', // `en-US` is the default so don't want for it
      "Couldn't load translation for language tag: %s",
      locale,
    );
  }

  fbtInit({
    translations,
    hooks: {
      getViewerContext: () => ({
        GENDER: IntlVariations.GENDER_UNKNOWN,
        locale: locale,
      }),
    },
  });

  return languageTag;
}
