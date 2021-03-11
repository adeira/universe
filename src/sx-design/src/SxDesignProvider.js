// @flow

import React, { useMemo, type Node, type Context } from 'react';
import { init as fbtInit, IntlVariations } from 'fbt';

import type { SupportedLocales } from './constants';

export type SxDesignContextValue = {|
  +locale: SupportedLocales,
|};

export const SxDesignContext = (React.createContext(
  // We could make it optional by providing some reasonable default values. However, since
  // localization is one of the core values, it makes sense to require user to setup the context.
  null,
): Context<null | SxDesignContextValue>);

type Props = {|
  +children: Node,
  +locale: SupportedLocales,
|};

export default function SxDesignProvider(props: Props): Node {
  const locale = props.locale;
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

  const contextValue = useMemo(() => ({ locale }), [locale]);

  return <SxDesignContext.Provider value={contextValue}>{props.children}</SxDesignContext.Provider>;
}
