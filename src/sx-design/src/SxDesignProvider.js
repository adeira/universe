// @flow

import React, { useMemo, useEffect, useState, type Node } from 'react';
import { init as FbtInit, IntlVariations as FbtIntlVariations, FbtTranslations } from 'fbt';
import sx from '@adeira/sx';

import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
import FlashMessagesRenderer from './FlashMessage/FlashMessagesRenderer';
import getFbtTranslations from './getFbtTranslations';
import SxDesignContext from './SxDesignContext';
import SxDesignProviderCSSVariables from './SxDesignProviderCSSVariables';
import { MediaQueryColorScheme } from './MediaQueries';
import { SupportedDirections, type SupportedLocales } from './constants';
import { SX_DESIGN_REACT_PORTAL_ID } from './SxDesignPortal';

type Props = {
  +children: Node,
  +locale?: SupportedLocales,
  +theme?: 'light' | 'dark' | 'system',
  +disableErrorBoundary?: boolean,
};

export default function SxDesignProvider(props: Props): Node {
  const [activeFlashMessages, setActiveFlashMessages] = useState(new Map());
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

  let direction = SupportedDirections.LTR;
  if (sxLocale.startsWith('ar-AR')) {
    direction = SupportedDirections.RTL;
  }

  const translations = getFbtTranslations(sxLocale);
  const translationsLocale = Object.keys(translations)[0];
  const allFbtTranslations = FbtTranslations.getRegisteredTranslations();
  if (allFbtTranslations[translationsLocale] != null) {
    // There is already a translation dictionary registered for this locale (probably from the
    // parent application) so we simply extend this dictionary with SX Design specific strings.
    FbtTranslations.mergeTranslations(translations);
  } else {
    // There is no dictionary for this locale yet so we initialize it with SX Design strings.
    FbtInit({
      translations,
      hooks: {
        getViewerContext: () => ({
          GENDER: FbtIntlVariations.GENDER_UNKNOWN,
          regionalLocale: translationsLocale,
          locale: translationsLocale,
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
      activeFlashMessages,
      displayFlashMessage: ({ message, tint }) => {
        const timeoutID = setTimeout(
          () => {
            setActiveFlashMessages((previousFlashMessages) => {
              previousFlashMessages.delete(timeoutID);
              return new Map(previousFlashMessages);
            });
          },
          3000, // aligned with the animation duration (!)
        );

        setActiveFlashMessages(
          (previousFlashMessages) =>
            new Map([...previousFlashMessages, [timeoutID, { message, tint }]]),
        );
      },
    }),
    [actualSystemColor, direction, sxLocale, theme, activeFlashMessages],
  );

  return (
    <div
      className={styles({
        common: true, // always include
        ltr: direction === SupportedDirections.LTR,
        rtl: direction === SupportedDirections.RTL,
        lightTheme: theme === 'light',
        darkTheme: theme === 'dark',
        systemTheme: theme === 'system',
      })}
      // The following node ID is required by `Tooltip` component. Why don't we do it the traditional
      // way of setting up the node somewhere in HTML body manually? It's because here we are setting
      // CSS variables for the SX Design and we could not use them in the `Tooltip` component (they
      // would be out of the "context" of CSS variables).
      id={SX_DESIGN_REACT_PORTAL_ID}
    >
      <SxDesignContext.Provider value={contextValue}>
        {props.disableErrorBoundary === true ? (
          props.children
        ) : (
          <ErrorBoundary>{props.children}</ErrorBoundary>
        )}
        <FlashMessagesRenderer />
      </SxDesignContext.Provider>
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
    [MediaQueryColorScheme.LIGHT]: SxDesignProviderCSSVariables.lightTheme,
    [MediaQueryColorScheme.DARK]: SxDesignProviderCSSVariables.darkTheme,
  },
});
/* eslint-enable sx/valid-usage */
