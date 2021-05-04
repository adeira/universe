// @flow

import { invariant } from '@adeira/js';

import type { SupportedLocales } from './constants';

type TranslationStr = string;

// {locale: {hash: translation}}
type TranslationDict = {
  [locale: string]: { [hashKey: string]: TranslationStr },
};

export default function getFbtTranslationsForLocale(locale: SupportedLocales): TranslationDict {
  // TODO: support translations lazy loading
  const supportedLocales = {
    'ar-AR': require('../translations/out/ar-AR.json'),
    'ar-AR-u-nu-arab': require('../translations/out/ar-AR.json'),
    'cs-CZ': require('../translations/out/cs-CZ.json'),
    'en-US': require('../translations/out/en-US.json'),
    'es-MX': require('../translations/out/es-MX.json'),
    'no-NO': require('../translations/out/no-NO.json'),
    'ru-RU': require('../translations/out/ru-RU.json'),
    'uk-UA': require('../translations/out/uk-UA.json'),
  };

  invariant(
    supportedLocales[locale] != null,
    'Cannot get FBT translation for locale "%s" because it doesn\'t exist.',
    locale,
  );

  return supportedLocales[locale];
}
