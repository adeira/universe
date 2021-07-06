// @flow

import * as React from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import Icon from '@adeira/icons';

export default function LanguageSwitch(): React.Node {
  const router = useRouter();
  const urlLocale = router.locale;

  // eventually we could offer to switch language and region independently
  const languagesMap = {
    'en-us': (
      <div>
        <Icon name="translate" /> Switch to English
      </div>
    ),
    'es-mx': (
      <div>
        <Icon name="translate" /> Cambiar a Español
      </div>
    ),
  };

  const languageSwitch = [];
  for (const languageTagURL of Object.keys(languagesMap)) {
    const linkText = languagesMap[languageTagURL];
    if (urlLocale !== languageTagURL) {
      // do not switch to the current language
      languageSwitch.push(
        <NextLink href={router.route} key={languageTagURL} locale={languageTagURL}>
          <button type="button">{linkText}</button>
        </NextLink>,
      );
    }
  }
  return languageSwitch;
}
