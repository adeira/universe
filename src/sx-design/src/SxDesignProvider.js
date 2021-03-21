// @flow

import React, { useMemo, type Node } from 'react';
import { init as fbtInit, IntlVariations } from 'fbt';
import sx from '@adeira/sx';

import SxDesignContext from './SxDesignContext';
import SxDesignProviderCSSVariables from './SxDesignProviderCSSVariables';
import type { SupportedLocales } from './constants';

type Props = {|
  +children: Node,
  +locale: SupportedLocales,
  +darkMode?: boolean,
|};

export default function SxDesignProvider(props: Props): Node {
  const locale = props.locale;
  const darkMode = props.darkMode ?? false;

  const supportedLocales = {
    // TODO: support translations lazy loading
    'en-US': require('../translations/out/en-US.json'),
    'es-MX': require('../translations/out/es-MX.json'),
  };

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
      darkMode,
    }),
    [locale, darkMode],
  );

  return (
    <div
      className={styles({
        common: true,
        lightTheme: darkMode === false,
        darkTheme: darkMode === true,
      })}
    >
      <SxDesignContext.Provider value={contextValue}>{props.children}</SxDesignContext.Provider>
    </div>
  );
}

/* eslint-disable sx/valid-usage */
const styles = sx.create({
  common: SxDesignProviderCSSVariables.common,
  lightTheme: SxDesignProviderCSSVariables.lightTheme,
  darkTheme: SxDesignProviderCSSVariables.darkTheme,
});
/* eslint-enable sx/valid-usage */
