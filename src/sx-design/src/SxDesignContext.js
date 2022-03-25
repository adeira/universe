// @flow strict

import React, { type Context } from 'react';

import type { SupportedLocales, SupportedDirections } from './constants';

export type SxDesignContextValue = {
  +locale: SupportedLocales,
  +direction: SupportedDirections,
  +theme: 'light' | 'dark', // no "system" (!)
  +activeFlashMessages: Map<TimeoutID, FbtWithoutString>,
  +displayFlashMessage: (FbtWithoutString) => void,
};

export default (React.createContext(
  // We could make it optional by providing some reasonable default values. However, since
  // localization is one of the core values, it makes sense to require user to setup the context.
  null,
): Context<null | SxDesignContextValue>);
