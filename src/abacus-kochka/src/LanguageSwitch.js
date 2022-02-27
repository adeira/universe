// @flow

import * as React from 'react';
import sx from '@adeira/sx';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

// eslint-disable-next-line n/file-extension-in-import -- https://github.com/weiran-zsd/eslint-plugin-node/issues/11
import FlagMX from './design/svg/generated/flags/mx';
// eslint-disable-next-line n/file-extension-in-import -- https://github.com/weiran-zsd/eslint-plugin-node/issues/11
import FlagUS from './design/svg/generated/flags/us';
import useViewerContext from './hooks/useViewerContext';

export default function LanguageSwitch(): React.Node {
  const router = useRouter();
  const viewerContext = useViewerContext();

  // eventually we could offer to switch language and region independently
  const languagesMap = {
    // TODO: how to reuse FBT here? (https://github.com/facebook/fbt/discussions/190)
    'en-us': (
      <div className={styles('linkInner')}>
        Switch to English
        <span className={styles('emoji')}>
          <FlagUS size={16} />
        </span>
      </div>
    ),
    'es-mx': (
      <div className={styles('linkInner')}>
        Cambiar a Español
        <span className={styles('emoji')}>
          <FlagMX size={16} />
        </span>
      </div>
    ),
  };

  const languageSwitch = [];
  for (const languageTagURL of Object.keys(languagesMap)) {
    const linkText = languagesMap[languageTagURL];
    if (viewerContext.languageTag.url !== languageTagURL) {
      // do not switch to the current language
      languageSwitch.push(
        // eslint-disable-next-line @next/next/link-passhref -- FIXME
        <NextLink
          prefetch={false}
          href={router.asPath} // "/shop/221836"
          key={languageTagURL}
          locale={languageTagURL}
        >
          <button type="button" className={styles('link')}>
            {linkText}
          </button>
        </NextLink>,
      );
    }
  }
  return languageSwitch;
}

const styles = sx.create({
  emoji: {
    height: '1em',
    width: '1em',
    margin: '0 .05em 0 .5em',
    verticalAlign: '-0.1em',
  },
  link: {
    'border': '1px solid lightgrey',
    'borderRadius': 4,
    'padding': '1rem',
    'backgroundColor': 'transparent',
    'cursor': 'pointer',
    'textDecoration': 'none',
    'color': 'inherit',
    ':hover': {
      textDecoration: 'underline',
    },
  },
  linkInner: {
    display: 'flex',
    flexDirection: 'row',
  },
});
