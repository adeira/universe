// @flow

import { IntlVariations, init as fbtInit } from 'fbt';
import { warning } from '@adeira/js';

import LanguageTag, { type LanguageTagType } from '../src/LanguageTag';

// {locale: {hash: translation}}
type TranslationDict = {|
  [locale: string]: {|
    [hashKey: string]: string,
  |},
|};

export default function initTranslations(lang: ?string): LanguageTagType {
  const languageTag = LanguageTag.detectLanguageTag(lang);

  let translations: TranslationDict = { en_US: {} };
  try {
    // Beware! Make sure this is secure when changing these lines.
    translations = require(`../translations/out/${languageTag.fbt}.json`);
  } catch {
    warning(false, "Couldn't load translation for language tag: %s", languageTag.fbt);
  }

  fbtInit({
    translations,
    fbtEnumManifest: require('../translations/enum_manifest.json'),
    hooks: {
      getViewerContext: () => ({
        GENDER: IntlVariations.GENDER_UNKNOWN,
        locale: languageTag.fbt,
      }),
    },
  });

  return languageTag;
}
