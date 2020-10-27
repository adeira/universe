// @flow

import * as React from 'react';
import * as sx from '@adeira/sx';
import fbt from 'fbt';
import NextLink from 'next/link';

import useViewerContext from './hooks/useViewerContext';

export default function LanguageSwitch(): React.Node {
  const viewerContext = useViewerContext();

  // eventually we could offer to switch language and region independently
  const languagesMap = {
    // TODO: How to translate this correctly? We should have it in the language we are switching to. 🤔
    'en-us': <fbt desc="switch to english link">Switch to English</fbt>,
    'es-mx': <fbt desc="switch to spanish link">Switch to Spanish</fbt>,
  };

  const languageSwitch = [];
  for (const languageTagURL of Object.keys(languagesMap)) {
    const linkText = languagesMap[languageTagURL];
    if (viewerContext.languageTag.url !== languageTagURL) {
      // do not switch to the current language
      languageSwitch.push(
        <NextLink href="/[lang]" as={`/${languageTagURL}`} key={languageTagURL}>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className={styles('link')}>{linkText}</a>
        </NextLink>,
      );
    }
  }
  return languageSwitch;
}

const styles = sx.create({
  link: {
    'textDecoration': 'none',
    ':hover': {
      textDecoration: 'underline',
    },
  },
});
