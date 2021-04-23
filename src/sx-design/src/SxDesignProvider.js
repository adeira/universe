// @flow

import React, { useMemo, type Node } from 'react';
import { init as fbtInit, IntlVariations } from 'fbt';
import sx from '@adeira/sx';

import SxDesignContext from './SxDesignContext';
import SxDesignProviderCSSVariables from './SxDesignProviderCSSVariables';
import type { SupportedLocales, SupportedDirections, SupportedThemes } from './constants';

type Props = {
  +children: Node,
  +locale?: SupportedLocales,
  +direction?: SupportedDirections,
  +theme?: SupportedThemes,
};

export default function SxDesignProvider(props: Props): Node {
  const locale = props.locale ?? 'en-US';
  const theme = props.theme ?? 'light';

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

  let direction = 'ltr';
  if (locale.startsWith('ar-AR')) {
    direction = 'rtl';
  }

  fbtInit({
    translations: supportedLocales[locale],
    hooks: {
      getViewerContext: () => ({
        GENDER: IntlVariations.GENDER_UNKNOWN,
        locale,
      }),
    },
  });

  const contextValue = useMemo(
    () => ({
      locale,
      direction,
      theme,
    }),
    [locale, direction, theme],
  );

  return (
    <div
      className={styles({
        common: true, // always include
        ltr: direction === 'ltr',
        rtl: direction === 'rtl',
        lightTheme: theme === 'light',
        darkTheme: theme === 'dark',
        systemTheme: theme === 'system',
      })}
    >
      <SxDesignContext.Provider value={contextValue}>{props.children}</SxDesignContext.Provider>
    </div>
  );
}

/* eslint-disable sx/valid-usage */
const styles = sx.create({
  common: SxDesignProviderCSSVariables.common,
  ltr: {
    direction: 'ltr',
  },
  rtl: {
    direction: 'rtl',
    // Arabic characters cannot be disconnected from each other. Unlike in English, Arabic letters
    // are supposed to look connected. (https://rtlstyling.com/posts/rtl-styling#1.-letter-spacing)
    letterSpacing: 0,
  },
  lightTheme: SxDesignProviderCSSVariables.lightTheme,
  darkTheme: SxDesignProviderCSSVariables.darkTheme,
  systemTheme: {
    '@media (prefers-color-scheme: light)': SxDesignProviderCSSVariables.lightTheme,
    '@media (prefers-color-scheme: dark)': SxDesignProviderCSSVariables.darkTheme,
  },
});
/* eslint-enable sx/valid-usage */
