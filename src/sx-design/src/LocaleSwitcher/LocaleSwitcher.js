// @flow

import React, { type ElementType, type Node } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useRouter } from 'next/router'; // TODO: remove dependency on Next.js

import Link from '../Link/Link';

type Props = {
  +as?: ElementType,
};

export default function LocaleSwitcher(props: Props): Node {
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
        <Link href={{ pathname, query }} asPath={asPath} locale={locale} as={props.as}>
          {translationMap[locale] ?? locale}
        </Link>
      </React.Fragment>
    );
    separator = ' · ';
    return localeLink;
  });
}
