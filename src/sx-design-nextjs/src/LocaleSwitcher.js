// @flow

import React, { type Node } from 'react';
import { useRouter } from 'next/router';

import Link from './Link';

export default function LocaleSwitcher(): Node {
  const router = useRouter();
  const { locales, locale: activeLocale } = router;
  const otherLocales = locales.filter((locale) => locale !== activeLocale);

  const translationMap = {
    'en-us': 'English',
    'es-mx': 'Español',
    'uk-ua': 'Українська',
    // expand as needed
  };

  let separator = '';
  return otherLocales.map((locale) => {
    const { pathname, query, asPath } = router;
    const localeLink = (
      <React.Fragment key={locale}>
        {separator}
        <Link href={{ pathname, query }} as={asPath} locale={locale}>
          {translationMap[locale] ?? locale}
        </Link>
      </React.Fragment>
    );
    separator = ' · ';
    return localeLink;
  });
}
