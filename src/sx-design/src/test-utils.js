// @flow

import { init as FbtInit, IntlVariations as FbtIntlVariations } from 'fbt';

import getFbtTranslationsForLocale from './getFbtTranslationsForLocale';

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

// re-export everything
// eslint-disable-next-line import/no-extraneous-dependencies
export * from '@testing-library/react';

// override render method
export {
  // TODO: override render method with custom providers (see: https://testing-library.com/docs/react-testing-library/setup#custom-render)
  initFbt,
};
