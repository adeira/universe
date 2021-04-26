// @flow strict

import * as React from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

export default function LanguageSwitch(): React.Node {
  const router = useRouter();
  // $FlowIssue[prop-missing] prop missing in flow-typed types
  const urlLocale = router.locale;

  // eventually we could offer to switch language and region independently
  const languagesMap = {
    'en-us': <div>Switch to English</div>,
    'es-mx': <div>Cambiar a Español</div>,
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
