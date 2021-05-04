// @flow

import React, { useMemo, useEffect, useState, type Node } from 'react';
import { init as FbtInit, IntlVariations as FbtIntlVariations, FbtTranslations } from 'fbt';
import sx from '@adeira/sx';

import getFbtTranslationsForLocale from './getFbtTranslationsForLocale';
import SxDesignContext from './SxDesignContext';
import SxDesignProviderCSSVariables from './SxDesignProviderCSSVariables';
import type { SupportedLocales } from './constants';

type Props = {
  +children: Node,
  +locale?: SupportedLocales,
  +theme?: 'light' | 'dark' | 'system',
};

export default function SxDesignProvider(props: Props): Node {
  const [actualSystemColor, setActualSystemColor] = useState(() => {
    return typeof window === 'object' &&
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  const sxLocale = props.locale ?? 'en-US';
  const theme = props.theme ?? 'light';

  useEffect(() => {
    if (typeof window === 'object' && window.matchMedia) {
      const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
      const eventListener = (event) => setActualSystemColor(event.matches ? 'dark' : 'light');
      mediaQueryList.addEventListener('change', eventListener);
      return () => mediaQueryList.removeEventListener('change', eventListener);
    }
    return () => {};
  }, []);

  let direction = 'ltr';
  if (sxLocale.startsWith('ar-AR')) {
    direction = 'rtl';
  }

  const allFbtTranslations = FbtTranslations.getRegisteredTranslations();
  if (allFbtTranslations[sxLocale] != null) {
    // There is already a translation dictionary registered for this locale (probably from the
    // parent application) so we simply extend this disctionary with SX Design specific strings.
    FbtTranslations.mergeTranslations(
      getFbtTranslationsForLocale(
        ((sxLocale: any): SupportedLocales), // see the `invariant` above
      ),
    );
  } else {
    // There is no dictionary for this locale yet so we initialize it with SX Design strings.
    FbtInit({
      translations: getFbtTranslationsForLocale(sxLocale),
      hooks: {
        getViewerContext: () => ({
          GENDER: FbtIntlVariations.GENDER_UNKNOWN,
          locale: sxLocale,
        }),
      },
    });
  }

  const contextValue = useMemo(
    () => ({
      locale: sxLocale,
      direction,
      // Here we exchange "system" value for the actual theme because underlying components need to
      // know only whether we are rendering "light" or "dark".
      theme: theme === 'system' ? actualSystemColor : theme,
    }),
    [actualSystemColor, direction, sxLocale, theme],
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
