// @flow

import React, { useMemo, type Node } from 'react';
import { init as fbtInit, IntlVariations } from 'fbt';
import sx from '@adeira/sx';

import SxDesignContext from './SxDesignContext';
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

/**
 * Check and update README.md as well (TODO: make it automatic or remove from readme)
 *
 * Note: all colors are written using RGB triplet. Why? It's because it allows us to optionally
 * apply alpha channel when needed (https://stackoverflow.com/a/41265350). Usage:
 *
 * ```js
 * { color: 'rgb(var(--sx-text-color))' }
 * ```
 *
 * With optional alpha channel:
 *
 * ```js
 * { color: 'rgb(var(--sx-text-color), 0.5)' }
 * ```
 *
 * TODO: fix $FlowFixMe[incompatible-call] - CSS variables are tricky to typecheck in SX
 */
const styles = sx.create({
  common: {
    // component specific vars:
    // $FlowFixMe[incompatible-call]
    '--sx-kbd-border': '1px solid #b4b4b4',
    // $FlowFixMe[incompatible-call]
    '--sx-skipLink-background-color': '28, 30, 33', // #1c1e21
    // $FlowFixMe[incompatible-call]
    '--sx-skipLink-text-color': '255, 255, 255', // #ffffff
  },
  lightTheme: {
    // global vars:
    // $FlowFixMe[incompatible-call]
    '--sx-background-color': '255, 255, 255', // #ffffff
    // $FlowFixMe[incompatible-call]
    '--sx-text-color': '28, 30, 33', // #1c1e21
  },
  darkTheme: {
    // global vars:
    // $FlowFixMe[incompatible-call]
    '--sx-background-color': '51, 51, 51', // #333333
    // $FlowFixMe[incompatible-call]
    '--sx-text-color': '255, 255, 255', // #ffffff
  },
});
