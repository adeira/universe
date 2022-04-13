// @flow

import { type Element } from 'react';
import { init as FbtInit, IntlVariations as FbtIntlVariations } from 'fbt';
// eslint-disable-next-line import/no-extraneous-dependencies,no-restricted-imports
import userEvent from '@testing-library/user-event';
// eslint-disable-next-line import/no-extraneous-dependencies,no-restricted-imports
import {
  render as renderWithoutProviders,
  type RenderOptionsWithoutCustomQueries,
} from '@testing-library/react';

import getFbtTranslations from './getFbtTranslations';
import type { SupportedLocales } from './constants';

const initFbt = () => {
  FbtInit({
    translations: getFbtTranslations('en-US'),
    hooks: {
      getViewerContext: () => ({
        GENDER: FbtIntlVariations.GENDER_UNKNOWN,
        regionalLocale: 'en_US',
        locale: 'en_US',
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
      return (
        <SxDesignProvider
          locale={locale}
          disableErrorBoundary={true} // we want all errors in our tests to bubble up (so we can test for them)
        >
          {children}
        </SxDesignProvider>
      );
    },
    ...renderOptions,
  });
};

// export custom render method(s) and other helpers:
export { initFbt, renderWithProviders as render, renderWithoutProviders, userEvent };
