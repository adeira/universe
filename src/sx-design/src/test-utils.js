// @flow

import { type Element } from 'react';
import { init as FbtInit, IntlVariations as FbtIntlVariations } from 'fbt';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  render as renderWithoutProviders,
  type RenderOptionsWithoutCustomQueries,
} from '@testing-library/react';

import getFbtTranslationsForLocale from './getFbtTranslationsForLocale';
import type { SupportedLocales } from './constants';

const initFbt = () => {
  FbtInit({
    translations: getFbtTranslationsForLocale('en-US'),
    hooks: {
      getViewerContext: () => ({
        GENDER: FbtIntlVariations.GENDER_UNKNOWN,
        locale: 'en-US',
      }),
    },
  });
};

const renderWithProviders = (
  ui: Element<any>,
  {
    locale = 'en-US',
    ...renderOptions
  }: { +locale: SupportedLocales, ...RenderOptionsWithoutCustomQueries } = {},
): $FlowFixMe => {
  return renderWithoutProviders(ui, {
    wrapper: ({ children }) => {
      const SxDesignProvider = require('./SxDesignProvider').default;
      return <SxDesignProvider locale={locale}>{children}</SxDesignProvider>;
    },
    ...renderOptions,
  });
};

// re-export everything
// eslint-disable-next-line import/no-extraneous-dependencies
export * from '@testing-library/react';

// override render method
export { initFbt, renderWithProviders as render, renderWithoutProviders };
