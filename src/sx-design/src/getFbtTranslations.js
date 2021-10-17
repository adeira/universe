// @flow

import { invariant } from '@adeira/js';

import type { SupportedLocales } from './constants';

type TranslationStr = string;

// {locale: {hash: translation}}
type TranslationDict = {
  [locale: string]: { [hashKey: string]: TranslationStr },
};

export default function getFbtTranslations(locale: SupportedLocales): TranslationDict {
  // TODO: support translations lazy loading
  const supportedLocales = {
    'ar-AR': require('../translations/out/ar_AR.json'),
    'ar-AR-u-nu-arab': require('../translations/out/ar_AR.json'),
    'cs-CZ': require('../translations/out/cs_CZ.json'),
    'en-US': require('../translations/out/en_US.json'), // empty stub
    'es-MX': require('../translations/out/es_MX.json'),
    'no-NO': require('../translations/out/no_NO.json'),
    'ru-RU': require('../translations/out/ru_RU.json'),
    'uk-UA': require('../translations/out/uk_UA.json'),
  };

  invariant(
    supportedLocales[locale] != null,
    'Cannot get FBT translation for locale "%s" because it doesn\'t exist.',
    locale,
  );

  return supportedLocales[locale];
}
